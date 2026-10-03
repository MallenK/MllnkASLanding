#!/usr/bin/env node
/**
 * Auditor de diseño para composiciones Hyperframes (studio/hf-*) con Playwright.
 * Se ejecuta DESPUÉS de renderizar y ANTES de publicar/ordenar la pieza.
 *
 * Uso (desde la raíz del repo):
 *   node studio/qa/auditar.mjs hf-reel-cuantas-apps hf-ig-5-cosas-futbol
 *   node studio/qa/auditar.mjs --all
 *   node studio/qa/auditar.mjs hf-reel-alertas --sheet      (además guarda hoja de contactos PNG)
 *
 * Mueve el timeline GSAP (window.__timelines.main) a muchos instantes y mide el DOM real:
 *   DUP_IMG        misma imagen (p.ej. logo) visible 2+ veces a la vez
 *   DUP_TEXT       mismo texto visible 2+ veces a la vez
 *   OVERLAP        textos/imágenes que se pisan
 *   OUT_OF_BOUNDS  elemento fuera del lienzo o de la zona segura (9:16)
 *   OVERFLOW       texto que desborda su caja
 *   INCONSISTENT   elementos de la misma clase (badge, tag, dot…) con tamaño/fuente/color distinto
 * Salida: informe en consola + studio/qa/informes/<pieza>.json. Código de salida 1 si hay ERRORES.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright-core";

const QA = path.dirname(fileURLToPath(import.meta.url));
const STUDIO = path.resolve(QA, "..");
// Chrome headless-shell que ya descarga Hyperframes (mismo motor que el render); si no está, Chrome del sistema
const HF_CHROME = path.join(process.env.USERPROFILE || process.env.HOME || "", ".cache/hyperframes/chrome");
const findShell = (d) => { try { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { const r = findShell(p); if (r) return r; } else if (/chrome-headless-shell(\.exe)?$/.test(e.name)) return p; } } catch {} return null; };
const CHROME = findShell(HF_CHROME) || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const STEP = 0.2;          // segundos entre muestras
const PERSIST = 3;         // una incidencia debe durar >= 3 muestras seguidas (0.6 s) para contar (filtra animaciones en curso)
const REPEATED = ["badge", "tag", "num", "dot", "chip", "pill", "icon", "card", "kpi", "btn", "cta-btn"]; // clases que deben verse idénticas entre escenas

const args = process.argv.slice(2);
const wantSheet = args.includes("--sheet");
let targets = args.filter((a) => !a.startsWith("--"));
if (args.includes("--all")) targets = fs.readdirSync(STUDIO).filter((d) => d.startsWith("hf-") && fs.existsSync(path.join(STUDIO, d, "index.html")) && !d.startsWith("hf-test"));
if (!targets.length) { console.error("Uso: node studio/qa/auditar.mjs <hf-carpeta…> | --all [--sheet]"); process.exit(2); }

/* ---------- análisis dentro de la página ---------- */
function pageAnalyze(REP_SEL) {
  const W = innerWidth, H = innerHeight;
  const eff = (el) => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const s = getComputedStyle(e); if (s.display === "none" || s.visibility === "hidden") return 0; o *= parseFloat(s.opacity); } return o; };
  const label = (el) => (el.id ? "#" + el.id : "") + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : "") || el.tagName.toLowerCase();
  const scene = (el) => { const s = el.closest(".scene,.panel,[id^=scene],[id^=p]"); return s ? "#" + s.id : "-"; };
  const isInline = (e) => ["inline", "inline-block"].includes(getComputedStyle(e).display);
  const items = [];
  for (const el of document.querySelectorAll("#root *")) {
    if (el.closest("svg,audio,video,script,style")) continue;
    let kind = null;
    if (el.tagName === "IMG") kind = "img";
    else if (isInline(el)) continue; // palabras (.w), acentos y flechas se miden con su bloque
    else if (el.textContent.trim() && [...el.children].every(isInline)) kind = "text";
    else if (el.textContent.trim() === "" && el.matches(REP_SEL)) kind = "shape";
    if (!kind) continue;
    const o = eff(el); if (o < 0.6) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (r.right <= 0 || r.bottom <= 0 || r.left >= W || r.top >= H) continue; // panel aún fuera del lienzo
    const cs = getComputedStyle(el);
    // rect real del texto (los bloques pueden ser más anchos que su contenido)
    let tr = { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
    if (kind === "text") { const rg = document.createRange(); rg.selectNodeContents(el); const b = rg.getBoundingClientRect(); if (b.width) tr = { left: b.left, top: b.top, right: b.right, bottom: b.bottom }; }
    items.push({
      kind, label: scene(el) + " " + label(el), scene: scene(el), o,
      text: kind === "text" ? el.textContent.replace(/\s+/g, " ").trim() : "",
      src: kind === "img" ? (el.getAttribute("src") || "").split("/").pop() : "",
      rect: tr, fs: parseFloat(cs.fontSize), decor: parseFloat(cs.opacity) < 0.3 || eff(el) < 0.3,
      overflow: kind === "text" && (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) && cs.overflow !== "visible",
    });
  }
  return { W, H, items };
}

/* ---------- inspección global de consistencia (independiente del tiempo) ---------- */
function pageConsistency(REP) {
  const groups = {};
  const add = (key, el) => {
    const cs = getComputedStyle(el);
    (groups[key] ||= []).push({
      label: (el.id ? "#" + el.id : el.className ? "." + String(el.className).trim().split(/\s+/).join(".") : el.tagName.toLowerCase()),
      scene: (el.closest(".scene,.panel,[id^=p],[id^=s]") || {}).id || "-",
      text: el.textContent.trim().slice(0, 20),
      w: el.offsetWidth, h: el.offsetHeight, fs: parseFloat(cs.fontSize), bg: cs.backgroundColor, color: cs.color, left: el.offsetLeft, top: el.offsetTop,
    });
  };
  for (const c of REP) document.querySelectorAll("." + c).forEach((el) => add("." + c, el));
  document.querySelectorAll(".dots").forEach((d) => d.querySelectorAll("i").forEach((i) => add(".dots i", i)));
  return groups;
}

/* ---------- reglas ---------- */
const inter = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
const area = (r) => (r.right - r.left) * (r.bottom - r.top);

function judge(frame, t) {
  const out = [];
  const { W, H, items } = frame;
  const portrait = H / W > 1.5;
  const SAFE = portrait ? { top: 250, bottom: H - 250, side: 60 } : { top: 0, bottom: H, side: 0 };
  const vis = items.filter((i) => !i.decor);
  // duplicados
  const bySrc = {}; vis.filter((i) => i.kind === "img").forEach((i) => (bySrc[i.src] ||= []).push(i));
  for (const [src, l] of Object.entries(bySrc)) if (l.length > 1) out.push({ code: "DUP_IMG", sev: "error", key: "DUP_IMG|" + src, msg: `«${src}» aparece ${l.length} veces a la vez (${l.map((i) => i.label).join(" + ")})`, t });
  const txt = vis.filter((i) => i.kind === "text" && i.text.length > 3);
  for (let a = 0; a < txt.length; a++) for (let b = a + 1; b < txt.length; b++) {
    const A = txt[a].text.toLowerCase(), B = txt[b].text.toLowerCase();
    if (A === B || (Math.min(A.length, B.length) > 14 && Math.min(A.length, B.length) / Math.max(A.length, B.length) >= 0.6 && (A.includes(B) || B.includes(A)))) out.push({ code: "DUP_TEXT", sev: "error", key: "DUP_TEXT|" + [A, B].sort().join("|"), msg: `Texto repetido en pantalla: «${txt[a].text.slice(0, 50)}» (${txt[a].label}) y «${txt[b].text.slice(0, 50)}» (${txt[b].label})`, t });
  }
  // solapes
  for (let a = 0; a < vis.length; a++) for (let b = a + 1; b < vis.length; b++) {
    const A = vis[a], B = vis[b]; if (A.kind === "shape" || B.kind === "shape") continue;
    const ov = inter(A.rect, B.rect), m = Math.min(area(A.rect), area(B.rect));
    if (m > 0 && ov / m > 0.12) out.push({ code: "OVERLAP", sev: "error", key: `OVERLAP|${A.label}|${B.label}`, msg: `${A.label} («${(A.text || A.src).slice(0, 30)}») pisa a ${B.label} («${(B.text || B.src).slice(0, 30)}») ${(100 * ov / m) | 0}%`, t });
  }
  // límites
  for (const i of vis) {
    const r = i.rect;
    if (r.left < -2 || r.top < -2 || r.right > W + 2 || r.bottom > H + 2) out.push({ code: "OUT_OF_BOUNDS", sev: "error", key: "OOB|" + i.label, msg: `${i.label} sale del lienzo (${Math.round(r.left)},${Math.round(r.top)} → ${Math.round(r.right)},${Math.round(r.bottom)})`, t });
    else if (i.kind === "text" && (r.top < SAFE.top - 2 || r.bottom > SAFE.bottom + 2 || r.left < SAFE.side - 2 || r.right > W - SAFE.side + 2)) out.push({ code: "OUT_OF_SAFE", sev: "warn", key: "SAFE|" + i.label, msg: `${i.label} («${i.text.slice(0, 30)}») fuera de la zona segura de la plataforma (y ${Math.round(r.top)}–${Math.round(r.bottom)}, x ${Math.round(r.left)}–${Math.round(r.right)})`, t });
    if (i.overflow) out.push({ code: "OVERFLOW", sev: "error", key: "OVF|" + i.label, msg: `${i.label} desborda su caja («${i.text.slice(0, 30)}»)`, t });
  }
  return out;
}

function judgeConsistency(groups) {
  const out = [];
  for (const [g, els] of Object.entries(groups)) {
    if (els.length < 3) continue;
    const mode = (vals) => { const c = {}; vals.forEach((v) => (c[v] = (c[v] || 0) + 1)); return Object.entries(c).sort((a, b) => b[1] - a[1])[0]; };
    const fixedSize = [".badge", ".dot", ".chip", ".icon", ".dots i", ".btn"].includes(g); // el ancho solo es comparable si no depende del texto
    const colorByState = g === ".dots i" || g === ".num"; // activo/inactivo y fondos decorativos cambian por diseño
    for (const [prop, sev, tol] of [["w", "error", 1], ["h", "error", 1], ["fs", "error", 0.5], ["bg", "warn", 0], ["color", "warn", 0]]) {
      if (prop === "w" && !fixedSize) continue;
      if ((prop === "bg" || prop === "color") && colorByState) continue;
      if (prop === "h" && ![".badge", ".dot", ".chip", ".icon", ".dots i"].includes(g) && els.some((e) => e.text.length > 24)) continue;
      const [m, n] = mode(els.map((e) => e[prop]));
      if (n === els.length) continue;
      // para color/fondo solo se avisa si es una minoría clara (<=1/3): las variantes alternas por diseño no molestan
      const odd = els.filter((e) => (typeof e[prop] === "number" ? Math.abs(e[prop] - Number(m)) > tol : e[prop] !== m));
      if (!odd.length) continue;
      if (sev === "warn" && (els.length < 4 || odd.length > 1)) continue;
      out.push({ code: "INCONSISTENT", sev, key: `INC|${g}|${prop}`, msg: `${g}: «${odd.map((e) => e.scene + ":" + e.text).join(", ")}» tiene ${prop}=${odd[0][prop]} pero lo normal es ${m} (${n}/${els.length})`, t: null });
    }
  }
  return out;
}

/* ---------- ejecución ---------- */
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
let totalErrors = 0;
fs.mkdirSync(path.join(QA, "informes"), { recursive: true });

for (const name of targets) {
  const dir = path.join(STUDIO, name);
  const html = path.join(dir, "index.html");
  if (!fs.existsSync(html)) { console.error(`✗ ${name}: no existe index.html`); totalErrors++; continue; }
  const root = fs.readFileSync(html, "utf8").match(/id="root"[^>]*>/)?.[0] || "";
  const vw = +(root.match(/data-width="(\d+)"/)?.[1] || 1080), vh = +(root.match(/data-height="(\d+)"/)?.[1] || 1920);
  const dur = +(root.match(/data-duration="([\d.]+)"/)?.[1] || 10);
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: wantSheet ? 0.4 : 1 });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(String(e)));
  await page.addInitScript(() => { window.__timelines = window.__timelines || {}; });
  await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
  const within = (p, ms) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]).catch(() => {});
  await within(page.addStyleTag({ url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" }), 8000);
  await within(page.evaluate(() => document.fonts.load("800 40px Montserrat").then(() => document.fonts.ready)), 8000);
  const hasTl = await page.evaluate(() => !!(window.__timelines && window.__timelines.main));
  if (!hasTl) { console.error(`✗ ${name}: no hay window.__timelines.main (¿falló GSAP/CDN?) ${consoleErrors.join(" | ")}`); totalErrors++; await ctx.close(); continue; }

  const textScenes = new Map(); // texto -> escenas donde aparece
  const issues = new Map(); // key -> {…, count, first, last, streak}
  const prevKeys = new Set();
  const shotsDir = path.join(QA, "informes", name + "_frames");
  if (wantSheet) fs.mkdirSync(shotsDir, { recursive: true });
  await page.evaluate(() => { const t = window.__timelines.main; t.pause(); });
  const times = []; for (let t = 0.1; t < dur; t += STEP) times.push(+t.toFixed(3)); times.push(+(dur - 0.04).toFixed(3));
  let k = 0; if (process.env.QA_DEBUG) console.error("muestras", times.length);
  for (const t of times) {
    await page.evaluate((tt) => { window.__timelines.main.seek(tt, false); }, t);
    if (process.env.QA_DEBUG) console.error("t", t);
    const frame = await page.evaluate(pageAnalyze, REPEATED.map((c) => "." + c).join(","));
    for (const i of frame.items) if (i.kind === "text" && i.text.length >= 12 && i.scene !== "-") { const k2 = i.text.toLowerCase(); (textScenes.get(k2) || textScenes.set(k2, new Map()).get(k2)).set(i.scene, Math.min(t, (textScenes.get(k2).get(i.scene) ?? 1e9))); }
    const cur = new Set();
    for (const f of judge(frame, t)) {
      cur.add(f.key);
      const e = issues.get(f.key) || { ...f, first: t, streak: 0, best: 0 };
      e.streak = prevKeys.has(f.key) ? e.streak + 1 : 1; e.best = Math.max(e.best, e.streak); e.last = t; issues.set(f.key, e);
    }
    prevKeys.clear(); cur.forEach((x) => prevKeys.add(x));
    if (wantSheet && k++ % 7 === 0) await page.screenshot({ path: path.join(shotsDir, `t${String(t.toFixed(1)).padStart(5, "0")}.png`) });
  }
  const repeated = [...textScenes].filter(([, sc]) => sc.size > 1).map(([txt, sc]) => ({ code: "REPEAT_SCENES", sev: "warn", msg: `El texto «${txt.slice(0, 60)}» sale en varias escenas (${[...sc.keys()].join(", ")}). Si es una repetición, borra la anterior y deja la última.` }));
  const consist = judgeConsistency(await page.evaluate(pageConsistency, REPEATED));
  const final = [...issues.values()].filter((e) => e.best >= PERSIST).map((e) => ({ code: e.code, sev: e.sev, msg: e.msg, desde: e.first, hasta: e.last }))
    .concat(repeated).concat(consist.map((e) => ({ code: e.code, sev: e.sev, msg: e.msg })));
  const errs = final.filter((f) => f.sev === "error");
  totalErrors += errs.length;
  fs.writeFileSync(path.join(QA, "informes", name + ".json"), JSON.stringify({ pieza: name, fecha: new Date().toISOString(), problemas: final }, null, 2));

  console.log(`\n${errs.length ? "✗" : final.length ? "!" : "✓"} ${name}  (${vw}x${vh}, ${dur}s)  errores=${errs.length} avisos=${final.length - errs.length}`);
  for (const f of final) console.log(`   [${f.sev === "error" ? "ERROR" : "aviso"}] ${f.code}: ${f.msg}${f.desde != null ? `  (t=${f.desde}s–${f.hasta}s)` : ""}`);
  if (wantSheet) {
    const files = fs.readdirSync(shotsDir).filter((f) => f.endsWith(".png")).sort();
    const list = files.map((f) => `file '${path.join(shotsDir, f).replace(/\\/g, "/")}'\nduration 1`).join("\n");
    fs.writeFileSync(path.join(shotsDir, "list.txt"), list);
    spawnSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", path.join(shotsDir, "list.txt"), "-vf", `tile=${Math.min(files.length, 8)}x${Math.ceil(files.length / 8)}`, "-frames:v", "1", path.join(QA, "informes", name + "_hoja.png")]);
    console.log(`   hoja de contactos: studio/qa/informes/${name}_hoja.png`);
  }
  await ctx.close();
}
await browser.close();
console.log(totalErrors ? `\n✗ ${totalErrors} error(es): corrige antes de publicar.` : "\n✓ Sin errores de diseño.");
process.exit(totalErrors ? 1 : 0);
