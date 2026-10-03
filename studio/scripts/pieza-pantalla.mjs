#!/usr/bin/env node
/**
 * Genera un proyecto Hyperframes (studio/hf-<slug>/) para una pieza URPA con grabación de pantalla del demo
 * (o solo texto) y, opcionalmente, lo renderiza.
 *
 * Uso: node studio/scripts/pieza-pantalla.mjs <spec.json> [--render]
 *
 * spec.json
 *  slug, formato ("reel" 1080x1920 | "post" 1080x1350), tag, hook,
 *  clip: nombre en studio/_rec (sin extensión) | null (pieza solo texto),
 *  desde / hasta: marca de inicio y segundo final del clip (marca por nombre o número), rate (velocidad constante),
 *  foco: {x,y,s} zoom estático sobre el origen 1440x900 (focos adicionales: zooms:[{marca,x,y,s}]),
 *  pasos: [{marca, texto}] subtítulo que cambia en cada marca,
 *  escenas: [{texto, dur, acento}] (solo texto), cta, firma.
 * Requiere studio/_rec/<clip>.mp4 y .log.json (los crea scripts/grabar-demo.mjs + ffmpeg).
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(path.resolve(argv[0]), "utf8"));
const REEL = spec.formato !== "post";
const W = 1080, H = REEL ? 1920 : 1350;
const FW = 1000, FH = REEL ? 780 : 740;
const FX = 40;
const L = REEL
  ? { logoTop: 296, capTop: 400, capH: 180, frameTop: 610, noteTop: 1420, hookTop: 560, ctaTop: 640 }
  : { logoTop: 56, capTop: 168, capH: 170, frameTop: 360, noteTop: 1130, hookTop: 380, ctaTop: 430 };
const DIR = path.join(STUDIO, "hf-" + spec.slug.replace(/^hf-/, ""));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const words = (t, cls = "") => esc(t).split(" ").map((w) => `<span class="w${cls ? " " + cls : ""}">${w}</span>`).join(" ");
const r3 = (n) => +n.toFixed(3);

// ---- timeline
const HOOK = spec.hookDur ?? 2.8, CTA = spec.ctaDur ?? 3.2;
let log = null, rate = spec.rate ?? 1, m0 = 0, m1 = 0, footDur = 0, marks = {}, texto = !spec.clip;
if (!texto) {
  log = JSON.parse(fs.readFileSync(path.join(STUDIO, "_rec", spec.clip + ".log.json"), "utf8"));
  marks = log.marks;
  const at = (v) => (typeof v === "number" ? v : marks[v]);
  m0 = Math.max(0, at(spec.desde) - 0.5);
  m1 = Math.min(at(spec.hasta ?? log.end) + 0.6, log.end + 0.6);
  footDur = r3((m1 - m0) / rate);
} else {
  footDur = r3(spec.escenas.reduce((a, e) => a + e.dur, 0));
}
const TOTAL = r3(HOOK + footDur + CTA);
const outT = (mark) => r3(HOOK + (((typeof mark === "number" ? mark : marks[mark]) - m0) / rate));

// ---- subtítulos
const caps = [];
if (!texto) {
  const ps = spec.pasos;
  ps.forEach((p, i) => {
    const t0 = i === 0 ? HOOK + 0.1 : outT(p.marca) - 0.15;
    const t1 = i === ps.length - 1 ? HOOK + footDur - 0.1 : outT(ps[i + 1].marca) - 0.2;
    if (t1 - t0 < 0.9) { console.warn("AVISO: subtítulo omitido por durar menos de 0.9 s:", p.texto); return; }
    caps.push({ id: "cap" + i, texto: p.texto, t0: r3(t0), t1: r3(t1) });
  });
}
const sceneTexts = [];
if (texto) { let acc = HOOK; spec.escenas.forEach((e, i) => { sceneTexts.push({ id: "tx" + i, ...e, t0: r3(acc), t1: r3(acc + e.dur) }); acc += e.dur; }); }

// ---- zoom del cromo (foco sobre origen 1440x900)
const K = FW / 1440;
const zt = (f) => ({ scale: r3(K * f.s), x: r3(FW / 2 - f.x * K * f.s), y: r3(FH / 2 - f.y * K * f.s) });
const zooms = (spec.zooms || []).map((z) => ({ t: outT(z.marca), ...zt(z) }));
const z0 = zt(spec.foco || { x: 840, y: 450, s: 1.2 });

// ---- sfx
const sfx = [];
const addSfx = (file, at, dur, vol) => sfx.push({ file, at: r3(Math.max(0, at)), dur: r3(Math.min(dur, TOTAL - Math.max(0, at))), vol });
addSfx("whoosh-short", HOOK - 0.2, 0.575, 0.5);
caps.forEach((c) => addSfx("pop", c.t0 + 0.05, 0.72, 0.35));
sceneTexts.forEach((s, i) => { if (i > 0) addSfx("whoosh-short", s.t0 - 0.2, 0.575, 0.45); });
addSfx("whoosh-short", HOOK + footDur - 0.2, 0.575, 0.5);
addSfx("chime", HOOK + footDur + 0.8, 2.0, 0.4);
const SFX_HTML = sfx.map((e, i) => `      <audio id="sfx${i + 1}" src="assets/sfx/${e.file}.mp3" data-start="${e.at}" data-duration="${e.dur}" data-track-index="${20 + i}" data-volume="${e.vol}"></audio>`).join("\n");

// ---- html
const capHtml = caps.map((c) => `<p class="cap" id="${c.id}"><span>${words(c.texto)}</span></p>`).join("\n        ");
const textHtml = sceneTexts.map((s) => `<div class="scene" id="${s.id}"><p class="big${s.acento ? " gold" : ""}">${words(s.texto)}</p></div>`).join("\n        ");
const footageHtml = texto ? "" : `
      <div id="frame">
        <div id="zoom">
          <video id="clip" src="assets/clip.mp4" muted playsinline data-start="${HOOK}" data-duration="${footDur}" data-media-start="${r3(m0)}" data-playback-rate="${rate}" data-track-index="3"></video>
        </div>
      </div>
      <p id="note">Demo en vivo con datos ficticios</p>`;

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=${W}, height=${H}">
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      :root { --bg:#111111; --white:#ffffff; --cream:#f7f3e8; --gold:#ffd21f; --sans:"Montserrat", ui-sans-serif, system-ui, sans-serif; }
      * { margin:0; padding:0; box-sizing:border-box; }
      html, body { margin:0; width:${W}px; height:${H}px; overflow:hidden; background:var(--bg); }
      #root { width:100%; height:100%; position:relative; overflow:hidden; background:var(--bg); font-family:var(--sans); }
      #bg { position:absolute; inset:0; overflow:hidden; }
      .glow { position:absolute; border-radius:50%; }
      #g1 { width:1400px; height:1400px; left:-700px; top:${H - 700}px; background:radial-gradient(circle, rgba(255,210,31,0.20) 0%, rgba(255,210,31,0) 65%); }
      #g2 { width:1100px; height:1100px; left:500px; top:-520px; background:radial-gradient(circle, rgba(247,243,232,0.07) 0%, rgba(247,243,232,0) 65%); }
      #logo { position:absolute; left:100px; top:${L.logoTop}px; width:190px; }
      .scene { position:absolute; inset:0; opacity:0; }
      .block { position:absolute; left:100px; width:840px; font-weight:800; letter-spacing:-0.02em; }
      .hook { top:${L.hookTop}px; font-size:${REEL ? 88 : 80}px; line-height:1.1; color:var(--white); }
      .cta { top:${L.ctaTop}px; font-size:${REEL ? 84 : 76}px; line-height:1.12; color:var(--gold); }
      .big { position:absolute; left:100px; width:840px; top:${REEL ? 640 : 380}px; font-weight:800; font-size:${REEL ? 84 : 76}px; line-height:1.12; letter-spacing:-0.02em; color:var(--white); }
      .big.gold { color:var(--gold); }
      .tag { position:absolute; left:100px; top:${L.hookTop - 90}px; padding:14px 30px; border-radius:999px; background:var(--gold); color:#000; font-weight:800; font-size:32px; letter-spacing:0.18em; text-transform:uppercase; }
      .w { display:inline-block; }
      .accent { color:var(--gold); }
      .cap { position:absolute; left:${FX + 20}px; width:${FW - 40}px; top:${L.capTop}px; height:${L.capH}px; display:flex; align-items:center; font-weight:800; font-size:${REEL ? 60 : 54}px; line-height:1.12; letter-spacing:-0.02em; color:var(--gold); opacity:0; }
      #frame { position:absolute; left:${FX}px; top:${L.frameTop}px; width:${FW}px; height:${FH}px; overflow:hidden; border-radius:28px; border:4px solid rgba(255,210,31,0.9); box-shadow:0 30px 90px rgba(0,0,0,0.55); background:#fff; opacity:0; }
      #zoom { position:absolute; left:0; top:0; width:1440px; height:900px; transform-origin:0 0; }
      #clip { position:absolute; left:0; top:0; width:1440px; height:900px; object-fit:cover; }
      #note { position:absolute; left:${FX}px; width:${FW}px; top:${L.noteTop}px; text-align:center; font-weight:700; font-size:28px; letter-spacing:0.06em; color:rgba(247,243,232,0.6); opacity:0; }
      #sign { position:absolute; left:100px; top:${REEL ? 1260 : 960}px; width:420px; }
      
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="${W}" data-height="${H}">
      <div id="bg" class="clip" data-layout-allow-overflow data-start="0" data-duration="${TOTAL}" data-track-index="0">
        <div id="g1" class="glow"></div>
        <div id="g2" class="glow"></div>
      </div>
      <div id="logowrap" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="2"><img id="logo" src="assets/brand/urpa-logo.png" alt="URPA"></div>
      <div id="content" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="1">
        <div id="hook" class="scene">
          <div class="tag">${esc(spec.tag || "Escuelas de fútbol")}</div>
          <h1 class="block hook">${words(spec.hook)}</h1>
        </div>
        ${textHtml}
        <div id="cta" class="scene">
          <p class="block cta">${words(spec.cta)}</p>
          <img id="sign" src="assets/brand/urpa-logo.png" alt="URPA">
        </div>
      </div>
      ${footageHtml}
      <div id="caps">
        ${capHtml}
      </div>
${SFX_HTML}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      const HOOK = ${HOOK}, FOOT_END = ${r3(HOOK + footDur)}, TOTAL = ${TOTAL};
      const show = (sel, t0, t1) => { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" }, t0); tl.to(sel, { opacity: 0, duration: 0.18, ease: "power1.in" }, t1 - 0.18); };
      const words = (sel, t0) => tl.fromTo(sel + " .w", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.36, ease: "power3.out", stagger: 0.04 }, t0 + 0.05);

      show("#hook", 0, HOOK); words("#hook", 0);
      tl.fromTo("#hook .tag", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0.05);
      ${texto ? "" : `
      // Grabación: marco que entra tras el gancho y zoom sobre la zona útil
      tl.set("#zoom", { scale: ${z0.scale}, x: ${z0.x}, y: ${z0.y} }, 0);
      tl.fromTo("#frame", { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, HOOK - 0.1);
      tl.fromTo("#note", { opacity: 0 }, { opacity: 1, duration: 0.4 }, HOOK + 0.3);
      ${zooms.map((z) => `tl.to("#zoom", { scale: ${z.scale}, x: ${z.x}, y: ${z.y}, duration: 0.9, ease: "power2.inOut" }, ${z.t});`).join("\n      ")}
      tl.to("#frame", { opacity: 0, y: -40, duration: 0.25, ease: "power1.in" }, FOOT_END - 0.25);
      tl.to("#note", { opacity: 0, duration: 0.2 }, FOOT_END - 0.25);
      ${caps.map((c) => `show("#${c.id}", ${c.t0}, ${c.t1}); words("#${c.id}", ${c.t0});`).join("\n      ")}
      `}
      ${sceneTexts.map((s) => `show("#${s.id}", ${s.t0}, ${s.t1}); words("#${s.id}", ${s.t0});`).join("\n      ")}

      // Cierre
      tl.fromTo("#cta", { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" }, FOOT_END);
      words("#cta", FOOT_END);
      tl.fromTo("#sign", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, FOOT_END + 0.5);

      tl.fromTo("#logo", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.05);
      tl.fromTo("#g1", { scale: 1, x: 0 }, { scale: 1.25, x: 80, duration: TOTAL, ease: "none" }, 0);
      tl.fromTo("#g2", { scale: 1, y: 0 }, { scale: 1.15, y: 90, duration: TOTAL, ease: "none" }, 0);

      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;

// ---- proyecto
fs.mkdirSync(path.join(DIR, "assets/brand"), { recursive: true });
fs.mkdirSync(path.join(DIR, "assets/sfx"), { recursive: true });
fs.mkdirSync(path.join(DIR, "renders"), { recursive: true });
const TPL = path.join(STUDIO, "hf-reel-cuantas-apps");
for (const f of ["hyperframes.json", "AGENTS.md", "CLAUDE.md"]) fs.copyFileSync(path.join(TPL, f), path.join(DIR, f));
const pkg = JSON.parse(fs.readFileSync(path.join(TPL, "package.json"), "utf8")); pkg.name = "hf-" + spec.slug.replace(/^hf-/, "");
fs.writeFileSync(path.join(DIR, "package.json"), JSON.stringify(pkg, null, 2));
fs.writeFileSync(path.join(DIR, "meta.json"), JSON.stringify({ id: pkg.name, name: pkg.name, createdAt: new Date().toISOString() }, null, 2));
fs.copyFileSync(path.join(TPL, "assets/brand/urpa-logo.png"), path.join(DIR, "assets/brand/urpa-logo.png"));
for (const e of new Set(sfx.map((x) => x.file))) fs.copyFileSync(path.join(STUDIO, "shared/sfx", e + ".mp3"), path.join(DIR, "assets/sfx", e + ".mp3"));
if (!texto) fs.copyFileSync(path.join(STUDIO, "_rec", spec.clip + ".mp4"), path.join(DIR, "assets/clip.mp4"));
fs.writeFileSync(path.join(DIR, "index.html"), html);
console.log("proyecto", path.relative(process.cwd(), DIR), "duración", TOTAL, "s");

if (argv.includes("--render")) {
  const out = path.join("renders", pkg.name + "-sin-musica.mp4");
  const run = (args) => spawnSync("npx", ["--yes", "hyperframes@0.8.72", ...args], { cwd: DIR, stdio: "inherit", shell: true });
  const c = run(["check"]);
  if (c.status !== 0) console.warn("check devolvió", c.status);
  const r = run(["render", "--video-frame-format", "png", "-o", out]);
  process.exit(r.status ?? 0);
}
