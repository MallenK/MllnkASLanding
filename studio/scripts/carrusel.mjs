#!/usr/bin/env node
/**
 * Genera un carrusel URPA (1080x1350) desde un JSON, sin Moda y sin marca de agua:
 * HTML propio -> Chrome headless -> PDF vectorial (LinkedIn) y/o PNG por página (Instagram).
 *
 * Uso:
 *   node studio/scripts/carrusel.mjs <spec.json> [--pdf <ruta.pdf>] [--png <carpeta>]
 *
 * spec.json: { "pages": [ { "tipo": "cover|punto|acento|cierre", "n": "1", "texto": "...", "sub": "...", "pie": "..." } ] }
 *   cover  = portada oscura (titular dorado + pie)        punto  = fondo crema con insignia numerada
 *   acento = fondo dorado con número grande               cierre = oscura con pregunta final, sub y pie
 * Logo URPA arriba a la izquierda en todas (dorado sobre oscuro, negro sobre claro).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const specFile = argv.find((a) => !a.startsWith("--"));
const opt = (n) => { const i = argv.indexOf("--" + n); return i >= 0 ? argv[i + 1] : null; };
if (!specFile || (!opt("pdf") && !opt("png"))) { console.error("Uso: node carrusel.mjs <spec.json> [--pdf out.pdf] [--png carpeta]"); process.exit(1); }

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const spec = JSON.parse(fs.readFileSync(path.resolve(specFile), "utf8"));
const b64 = (f) => "data:image/png;base64," + fs.readFileSync(path.join(STUDIO, "brand/assets", f)).toString("base64");
const GOLD = b64("urpa-logo-gold.png"), BLACK = b64("urpa-logo-black.png");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const PITCH = `<svg class="pitch" viewBox="0 0 1080 1350" fill="none" stroke="#f7f3e8" stroke-width="6" stroke-opacity="0.07"><line x1="0" y1="702" x2="1080" y2="702"/><circle cx="540" cy="702" r="248"/><rect x="184" y="-6" width="712" height="155"/><rect x="184" y="1200" width="712" height="155"/></svg>`;

function page(p, i) {
  const id = "p" + (i + 1);
  const sub = p.sub ? `<p class="sub">${esc(p.sub)}</p>` : "";
  const pie = (top, extra = "") => (p.pie ? `<p class="foot" style="top:${top}px;${extra}">${esc(p.pie)}</p>` : "");
  switch (p.tipo) {
    case "cover":
      return `<section class="pg dark" id="${id}">${PITCH}<img class="logo" src="${GOLD}"><div class="col" style="top:440px"><p class="t cover">${esc(p.texto)}</p></div><i class="bar" style="top:1140px"></i>${pie(1180, "color:#cfcfcf;font-weight:600")}</section>`;
    case "acento":
      return `<section class="pg gold" id="${id}"><img class="logo" src="${BLACK}"><b class="big">${esc(p.n)}</b><div class="col" style="top:560px"><p class="t body" style="color:#111">${esc(p.texto)}</p>${p.sub ? `<p class="sub" style="color:#2b2b2b">${esc(p.sub)}</p>` : ""}</div></section>`;
    case "cierre":
      return `<section class="pg dark" id="${id}">${PITCH}<img class="logo" src="${GOLD}"><div class="col" style="top:400px"><p class="t close">${esc(p.texto)}</p>${sub}</div><i class="bar" style="top:1110px"></i>${pie(1150, "color:#fff;font-weight:700")}</section>`;
    default:
      return `<section class="pg cream" id="${id}"><img class="logo" src="${BLACK}"><b class="badge">${esc(p.n)}</b><div class="col" style="top:400px"><p class="t body">${esc(p.texto)}</p>${sub}</div></section>`;
  }
}

const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Carrusel URPA</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
<style>
@page { size: 1080px 1350px; margin: 0 }
* { margin: 0; padding: 0; box-sizing: border-box }
html, body { width: 1080px; background: #111; font-family: "Montserrat", sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.pg { display: none; position: relative; width: 1080px; height: 1350px; overflow: hidden }
.pg:target { display: block }
@media print { .pg { display: block; break-after: page; page-break-after: always } }
.dark { background: #111111 } .cream { background: #f7f3e8 } .gold { background: #ffd21f }
.pitch { position: absolute; inset: 0; width: 100%; height: 100% }
.logo { position: absolute; left: 90px; top: 64px; width: 200px }
.badge { position: absolute; left: 90px; top: 170px; width: 160px; height: 160px; border-radius: 50%; background: #ffd21f; color: #111; font-size: 72px; font-weight: 800; display: flex; align-items: center; justify-content: center }
.big { position: absolute; left: 86px; top: 210px; font-size: 300px; line-height: 1; font-weight: 800; color: #111 }
.col { position: absolute; left: 90px; width: 880px; display: grid; gap: 30px }
.t { font-weight: 800 }
.cover { font-size: 72px; line-height: 1.08; color: #ffd21f; width: 900px }
.body { font-size: 62px; line-height: 1.12; color: #353535 }
.close { font-size: 56px; line-height: 1.12; color: #ffd21f }
.sub { font-size: 38px; line-height: 1.3; font-weight: 600; color: #5b5646 }
.dark .sub { color: #cfcfcf }
.bar { position: absolute; left: 90px; width: 90px; height: 8px; background: #ffd21f }
.foot { position: absolute; left: 90px; width: 900px; font-size: 30px; line-height: 1.3 }
</style></head><body>
${spec.pages.map(page).join("\n")}
</body></html>`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "carrusel-"));
const htmlFile = path.join(tmp, "index.html");
fs.writeFileSync(htmlFile, html);
const url = (hash = "") => "file:///" + htmlFile.replaceAll("\\", "/") + hash;
const run = (args) => { const r = spawnSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=15000", ...args], { encoding: "utf8" }); if (r.status !== 0) throw new Error("Chrome falló: " + (r.stderr || "").slice(0, 300)); };

if (opt("pdf")) {
  const out = path.resolve(opt("pdf")); fs.mkdirSync(path.dirname(out), { recursive: true });
  run(["--no-pdf-header-footer", `--print-to-pdf=${out}`, url()]);
  console.log("PDF", out, fs.statSync(out).size, "bytes");
}
if (opt("png")) {
  const dir = path.resolve(opt("png")); fs.mkdirSync(dir, { recursive: true });
  spec.pages.forEach((_, i) => {
    const out = path.join(dir, String(i + 1).padStart(2, "0") + ".png");
    run(["--window-size=1080,1350", `--screenshot=${out}`, url("#p" + (i + 1))]);
  });
  console.log("PNG", spec.pages.length, "en", dir);
}
fs.rmSync(tmp, { recursive: true, force: true });
