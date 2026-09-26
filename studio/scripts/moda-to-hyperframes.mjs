#!/usr/bin/env node
/**
 * Convierte una canvas de Moda (carrusel, stories...) en un proyecto de Hyperframes:
 * una escena por página, ritmo sobre rejilla de compases, música de fondo y efectos.
 *
 * Uso:
 *   node studio/scripts/moda-to-hyperframes.mjs <canvas_ref> --out studio/hf-mi-pieza [opciones]
 *
 * Opciones:
 *   --out <dir>            carpeta del proyecto (obligatorio)
 *   --bpm <n>              tempo de la música (128)
 *   --music <mp3>          pista (studio/shared/music/mixkit-162-minimal-techno-01.mp3)
 *   --music-offset <s>     segundos hasta el primer pulso de la pista (0.43)
 *   --no-music             no incrusta música ni efectos
 *   --beats <n>            fuerza los tiempos de cada página (por defecto se calculan por nº de palabras)
 *   --music-vol <0-1>      volumen de la música (0.4; los efectos no cambian)
 *   --copy <json>          sustituye líneas de texto: {"línea original":"línea nueva"} (no toca la canvas de Moda)
 *   --no-logo              sin logo URPA fijo (arriba a la izquierda, todo el vídeo)
 *   --dump                 imprime las líneas exactas de cada página (para preparar --copy)
 *   --dry                  solo muestra las páginas interpretadas
 *
 * Lee `moda canvas show` (solo lectura). El diseño de Moda no incluye posiciones, así que el
 * layout se deduce con reglas (ver LAYOUT RULES) y se revisa con `hyperframes check` y snapshots.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const STUDIO = path.resolve(HERE, "..");

// ---------- args ----------
const argv = process.argv.slice(2);
const ref = argv.find((a) => !a.startsWith("--"));
const opt = (name, dflt) => {
  const i = argv.indexOf("--" + name);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : dflt;
};
const flag = (name) => argv.includes("--" + name);
if (!ref || !opt("out") && !flag("dry") && !flag("dump")) {
  console.error("Uso: node moda-to-hyperframes.mjs <canvas_ref> --out <dir> [--bpm 128] [--music file] [--no-music] [--dry]");
  process.exit(1);
}
const BPM = Number(opt("bpm", 128));
const B = 60 / BPM;
const MUSIC = path.resolve(opt("music", path.join(STUDIO, "shared/music/mixkit-162-minimal-techno-01.mp3")));
const MUSIC_OFFSET = Number(opt("music-offset", 0.43));
const WITH_AUDIO = !flag("no-music");
const MUSIC_VOL = Number(opt("music-vol", 0.4));
const WITH_LOGO = !flag("no-logo");
const COPY = opt("copy") ? JSON.parse(fs.readFileSync(path.resolve(opt("copy")), "utf8")) : {};
const LOGO_GOLD = path.join(STUDIO, "brand/assets/urpa-logo-gold.png"); // sobre fondos oscuros
const LOGO_BLACK = path.join(STUDIO, "brand/assets/urpa-logo-black.png"); // sobre fondos claros
const FORCE_BEATS = opt("beats") ? Number(opt("beats")) : null;

// ---------- lectura de Moda ----------
function readCanvas(canvasRef) {
  if (!/^[\w-]+$/.test(canvasRef)) throw new Error("Referencia de canvas no válida: " + canvasRef);
  const r = spawnSync(`moda canvas show ${canvasRef} --json`, { encoding: "utf8", shell: true, maxBuffer: 1 << 26 });
  if (r.status !== 0) throw new Error("moda canvas show falló: " + (r.stderr || r.stdout).slice(0, 400));
  const j = JSON.parse(r.stdout);
  if (!j.ok || !j.canvas?.design) throw new Error("La canvas no devolvió 'design'");
  return { design: j.canvas.design, id: j.canvas.canvas_id };
}

// ---------- parser del DSL de Moda ----------
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const attrsOf = (s) => Object.fromEntries([...s.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const px = (v, d = 0) => (v ? parseFloat(v) : d);
const textOf = (inner) => decode(inner.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);

function parseDesign(design) {
  const title = (design.match(/^# Moda Design Export — (.*)$/m) || [])[1] || "canvas";
  const heads = [...design.matchAll(/^## Page: (.*?) \((\d+)x(\d+)\)(?: \[page (\d+)\])?\s*$/gm)];
  const endIdx = design.indexOf("\n## Design Tokens");
  const pages = heads.map((h, i) => {
    const start = h.index + h[0].length;
    const stop = i + 1 < heads.length ? heads[i + 1].index : endIdx > 0 ? endIdx : design.length;
    const body = design.slice(start, stop);
    const sec = body.match(/<Section\b([^>]*)>/);
    const secAttrs = sec ? attrsOf(sec[1]) : {};
    const inner = sec ? body.slice(sec.index + sec[0].length, body.lastIndexOf("</Section>")) : body;
    const items = [];
    for (const m of inner.matchAll(/<(Heading|Text|Paragraph|Button|Box|Image)\b([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/g)) {
      const a = attrsOf(m[2]);
      items.push({ tag: m[1], a, lines: m[3] ? textOf(m[3]) : [] });
    }
    return { w: +h[2], h: +h[3], bg: secAttrs.background || "#111111", center: secAttrs["justify-content"] === "center" || secAttrs["align-items"] === "center", items };
  });
  return { title, pages };
}

// ---------- utilidades de color ----------
const lum = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const isDark = (hex) => lum(hex) < 0.35;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- LAYOUT RULES ----------
// 1. Box con texto  -> si es cuadrada: insignia circular numerada, fija arriba a la izquierda;
//                      si no (botón/píldora, p. ej. "ESCRÍBENOS →"): botón dentro del bloque apilado.
// 1b. Lienzos altos (>=1900px, stories 9:16): tipografía x1.35 para que se lea en el móvil.
// 2. Último Heading pequeño (<=30px, 1 línea, no es el primero) -> firma fija abajo a la izquierda.
//    Solo en lienzos de feed (<1900px): en stories 9:16 el cuerpo del mensaje ya viene a ~30px y NO es una firma.
// 3. Heading con varias líneas y tamaño <=34px -> lista con viñetas (una animación por línea).
// 4. Resto -> bloque apilado y centrado verticalmente (debajo de la insignia si la hay).
// 5. Tamaños: títulos x1.25, texto de apoyo mínimo 42px, listas 40px, firma 34px (legibilidad en móvil).
function classify(page) {
  const badges = [], blocks = [], ctas = [];
  let footer = null;
  page.items.forEach((it, idx) => {
    if (it.tag === "Box" && it.lines.length) return Math.abs(px(it.a.width, 160) - px(it.a.height, 160)) <= 10 ? badges.push(it) : ctas.push(it);
    if (!it.lines.length) return;
    blocks.push({ ...it, idx });
  });
  const last = blocks[blocks.length - 1];
  if (last && page.h < 1900 && blocks.length > 1 && px(last.a["font-size"]) <= 30 && last.lines.length === 1) footer = blocks.pop();
  return { badges, blocks, ctas, footer };
}
const wordsOf = (page) => page.items.reduce((n, it) => n + it.lines.join(" ").split(/\s+/).filter(Boolean).length, 0);

function renderPage(page, i, N) {
  const { badges, blocks, ctas, footer } = classify(page);
  const dark = isDark(page.bg);
  const TALL = page.h >= 1900 ? 1.35 : 1;
  const fg = dark ? "#ffd21f" : "#111111";
  const track = dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.14)";
  const words = (t) => t.split(" ").map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
  const badgeHtml = badges.map((b) => {
    const s = px(b.a.width, 160);
    const bd = b.a.background || "#ffd21f";
    return `<div class="badge" style="width:${s}px;height:${s}px;background:${bd};color:${isDark(bd) ? "#ffd21f" : "#111111"}">${esc(b.lines.join(" "))}</div>`;
  }).join("");
  const blocksHtml = blocks.map((b) => {
    const orig = px(b.a["font-size"], 48);
    const list = b.lines.length > 1 && orig <= 34;
    const size = Math.round((list ? 40 : orig >= 44 ? Math.round(orig * 1.25) : Math.max(42, Math.round(orig * 1.25))) * TALL);
    const weight = b.a["font-weight"] || "800";
    const color = b.a.color || "#ffffff";
    const width = Math.min(px(b.a.width, 900), page.w - 180);
    const inner = list
      ? b.lines.map((l) => `<span class="w ln"><i class="dot" style="background:${fg}"></i>${esc(l)}</span>`).join("")
      : b.lines.map((l) => `<span class="row">${words(l)}</span>`).join("");
    return `<div class="blk${list ? " list" : ""}" style="width:${width}px;font-size:${size}px;font-weight:${weight};color:${color}">${inner}</div>`;
  }).join("\n            ");
  const ctaHtml = ctas.map((b) => {
    const bd = b.a.background || "#ffd21f";
    const w = Math.round(px(b.a.width, 420) * TALL), h = Math.round(px(b.a.height, 96) * TALL);
    return `<div class="w cta" style="width:${w}px;height:${h}px;border-radius:${px(b.a["border-radius"], h / 2) * TALL}px;background:${bd};color:${isDark(bd) ? "#ffffff" : "#111111"};font-size:${Math.round(38 * TALL)}px">${esc(b.lines.join(" "))}</div>`;
  }).join("");
  const footerHtml = footer ? `<div class="foot" style="color:${footer.a.color || "#fff"}">${esc(footer.lines.join(" "))}</div>` : "";
  return `
        <div id="p${i}" class="panel" style="background:${page.bg}">
          ${dark ? `<svg id="pitch${i}" class="pitchsvg" viewBox="0 0 ${page.w} ${page.h}" fill="none" stroke="#f7f3e8" stroke-width="6" stroke-opacity="0.07"><line x1="0" y1="${page.h * 0.52}" x2="${page.w}" y2="${page.h * 0.52}"/><circle cx="${page.w / 2}" cy="${page.h * 0.52}" r="${page.w * 0.23}"/><rect x="${page.w * 0.17}" y="-6" width="${page.w * 0.66}" height="${page.h * 0.115}"/><rect x="${page.w * 0.17}" y="${page.h * 0.89}" width="${page.w * 0.66}" height="${page.h * 0.115}"/></svg>` : ""}
          ${badgeHtml}
          <div class="stack"${badges.length ? ` style="justify-content:flex-start;padding-top:${WITH_LOGO ? 370 : 330}px"` : ""}>
            ${blocksHtml}
            ${ctaHtml}
          </div>
          ${footerHtml}
          <div class="track" style="background:${track}"><div id="bar${i}" class="fill" style="background:${fg}"></div></div>
        </div>`;
}

// ---------- construcción ----------
const { design, id: canvasId } = readCanvas(ref);
const parsed = parseDesign(design);
if (flag("dump")) {
  parsed.pages.forEach((p, i) => console.log("p" + (i + 1), JSON.stringify(p.items.filter((it) => it.lines.length).map((it) => it.lines))));
  process.exit(0);
}
const used = new Set();
parsed.pages.forEach((p) => p.items.forEach((it) => { it.lines = it.lines.map((l) => (l in COPY ? (used.add(l), COPY[l]) : l)); }));
const unused = Object.keys(COPY).filter((k) => !used.has(k));
if (unused.length) console.warn("AVISO: líneas de --copy que no coinciden con ninguna:\n  " + unused.join("\n  "));
if (!parsed.pages.length) throw new Error("No se encontraron páginas en la canvas");

const W = parsed.pages[0].w, H = parsed.pages[0].h;
const beatsFor = (page) => FORCE_BEATS ?? Math.min(12, Math.max(5, Math.round((0.8 + 0.16 * wordsOf(page)) / B)));
let acc = 0;
const timing = parsed.pages.map((p) => {
  const beats = beatsFor(p), t0 = +acc.toFixed(3);
  acc += beats * B;
  const c = classify(p);
  return { beats, t0, t1: +acc.toFixed(3), badge: c.badges.length > 0, foot: !!c.footer, light: !isDark(p.bg) };
});
const TOTAL = +acc.toFixed(3);

if (flag("dry")) {
  parsed.pages.forEach((p, i) => {
    const c = classify(p);
    console.log(`p${i + 1} ${p.w}x${p.h} bg=${p.bg} beats=${timing[i].beats} t=${timing[i].t0}-${timing[i].t1} badges=${c.badges.length} blocks=${c.blocks.length} footer=${!!c.footer}`);
  });
  console.log("TOTAL", TOTAL, "s");
  process.exit(0);
}

// SFX
const sfx = [];
const addSfx = (file, at, dur, vol) => { const a = Math.max(0, at); sfx.push({ file, at: +a.toFixed(3), dur: +Math.min(dur, TOTAL - a).toFixed(3), vol }); };
timing.forEach((t, i) => {
  if (i > 0) addSfx("whoosh-short", t.t0 - 0.22, 0.575, 0.55);
  if (classify(parsed.pages[i]).badges.length) addSfx("pop", t.t0 + 0.08, 0.72, 0.45);
});
addSfx("chime", timing[timing.length - 1].t0 + 0.8, 2.0, 0.4);

const CSS = `
      :root { --sans: "Montserrat", ui-sans-serif, system-ui, sans-serif; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; background: #111111; }
      #root { width: 100%; height: 100%; position: relative; overflow: hidden; background: #111111; font-family: var(--sans); }
      #content { position: absolute; inset: 0; overflow: hidden; }
      .panel { position: absolute; inset: 0; overflow: hidden; }
      .badge { position: absolute; left: 90px; top: ${WITH_LOGO ? 150 : 110}px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 78px; }
      .stack { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 70px; padding-left: 90px; padding-bottom: 190px; }
      .blk { line-height: 1.14; letter-spacing: -0.015em; }
      .row { display: block; }
      .w.cta { display: flex; align-items: center; justify-content: center; font-weight: 800; letter-spacing: 0.02em; margin-top: 30px; }
      .w { display: inline-block; }
      .list .ln { display: block; position: relative; padding-left: 46px; margin-bottom: 26px; line-height: 1.25; }
      .dot { position: absolute; left: 0; top: 0.55em; width: 14px; height: 14px; border-radius: 50%; }
      .foot { position: absolute; left: 90px; bottom: 150px; font-weight: 700; font-size: 34px; letter-spacing: 0.02em; }
      #logo, #logob { position: absolute; left: 90px; top: ${H >= 1900 ? 250 : 64}px; width: 170px; }
      #pitch { position: absolute; inset: 0; }
      .pitchsvg { position: absolute; inset: 0; width: 100%; height: 100%; }
      .track { position: absolute; left: 90px; right: 90px; bottom: 70px; height: 6px; border-radius: 3px; overflow: hidden; }
      .fill { width: 100%; height: 100%; transform-origin: left center; }`;

const panels = parsed.pages.map((p, i) => renderPage(p, i, parsed.pages.length)).join("\n");
const audioHtml = WITH_AUDIO
  ? [`      <audio id="bgm" src="assets/music/bgm.mp3" data-start="0" data-duration="${TOTAL}" data-track-index="10" data-volume="${MUSIC_VOL}"></audio>`]
      .concat(sfx.map((e, i) => `      <audio id="sfx${i + 1}" src="assets/sfx/${e.file}.mp3" data-start="${e.at}" data-duration="${e.dur}" data-track-index="${11 + i}" data-volume="${e.vol}"></audio>`))
      .join("\n")
  : "";

const SCRIPT = `
      const tl = gsap.timeline({ paused: true });
      const T = ${JSON.stringify(timing)};
      const N = T.length;
      T.forEach((t, i) => {
        const id = "#p" + i;
        if (i > 0) {
          tl.fromTo(id, { x: ${W} }, { x: 0, duration: 0.34, ease: "power3.inOut" }, t.t0 - 0.17);
          tl.set("#p" + (i - 1), { opacity: 0 }, t.t0 + 0.18); // la página anterior ya está tapada: se oculta
        }
        const nw = document.querySelectorAll(id + " .w").length || 1;
        tl.fromTo(id + " .w", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.38, ease: "power3.out", stagger: Math.min(0.045, 1.6 / nw) }, t.t0 + 0.12);
        if (t.badge) tl.fromTo(id + " .badge", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" }, t.t0 + 0.06);
        if (t.foot) tl.fromTo(id + " .foot", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, t.t0 + 0.5);
        if (${WITH_LOGO}) { tl.set("#logo", { opacity: t.light ? 0 : 1 }, t.t0); tl.set("#logob", { opacity: t.light ? 1 : 0 }, t.t0); }
        tl.fromTo("#bar" + i, { scaleX: i / N }, { scaleX: (i + 1) / N, duration: t.t1 - t.t0, ease: "none" }, t.t0);
      });
      window.__timelines["main"] = tl;
      tl.seek(0);`;

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=${W}, height=${H}">
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>${CSS}
    </style>
  </head>
  <body>
    <!-- Generado por studio/scripts/moda-to-hyperframes.mjs desde la canvas ${canvasId} ("${esc(parsed.title)}") -->
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="${W}" data-height="${H}">
      <div id="content" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="0">
${panels}
      </div>
${WITH_LOGO ? `      <div id="logowrap" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="2"><img id="logo" src="assets/brand/urpa-logo-gold.png" alt="URPA"><img id="logob" src="assets/brand/urpa-logo-black.png" alt="" style="opacity:0"></div>` : ""}
${audioHtml}
    </div>

    <script>${SCRIPT}
    </script>
  </body>
</html>
`;

// ---------- escritura del proyecto ----------
const OUT = path.resolve(opt("out"));
fs.mkdirSync(OUT, { recursive: true });
const tmpl = path.join(STUDIO, "hf-reel-3-senales");
const name = path.basename(OUT);
for (const f of ["AGENTS.md", "CLAUDE.md", "hyperframes.json", "package.json", "meta.json"]) {
  if (fs.existsSync(path.join(OUT, f))) continue;
  fs.writeFileSync(path.join(OUT, f), fs.readFileSync(path.join(tmpl, f), "utf8").replaceAll("hf-reel-3-senales", name));
}
fs.writeFileSync(path.join(OUT, "index.html"), html);

if (WITH_LOGO) {
  fs.mkdirSync(path.join(OUT, "assets/brand"), { recursive: true });
  fs.copyFileSync(LOGO_GOLD, path.join(OUT, "assets/brand/urpa-logo-gold.png"));
  fs.copyFileSync(LOGO_BLACK, path.join(OUT, "assets/brand/urpa-logo-black.png"));
}
if (WITH_AUDIO) {
  fs.mkdirSync(path.join(OUT, "assets/music"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "assets/sfx"), { recursive: true });
  for (const e of new Set(sfx.map((s) => s.file))) fs.copyFileSync(path.join(STUDIO, "shared/sfx", e + ".mp3"), path.join(OUT, "assets/sfx", e + ".mp3"));
  const fade = Math.max(0, TOTAL - 1.2).toFixed(2);
  const r = spawnSync("ffmpeg", ["-y", "-v", "error", "-ss", String(MUSIC_OFFSET), "-t", String(TOTAL + 0.02), "-i", MUSIC,
    "-af", `loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=out:st=${fade}:d=1.2`, "-ar", "44100", "-b:a", "192k", path.join(OUT, "assets/music/bgm.mp3")], { encoding: "utf8" });
  if (r.status !== 0) throw new Error("ffmpeg falló: " + r.stderr);
  fs.copyFileSync(path.join(STUDIO, "shared/music/CREDITS.md"), path.join(OUT, "assets/music/CREDITS.md"));
}

console.log(`OK ${OUT}\n  ${parsed.pages.length} páginas · ${W}x${H} · ${TOTAL}s @ ${BPM} BPM · audio: ${WITH_AUDIO ? "sí (" + sfx.length + " efectos)" : "no"}`);
