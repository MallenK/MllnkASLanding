// Carrusel LinkedIn "5 señales" (fútbol) -> PDF propio (HTML + Chrome), sin marca de agua de Moda.
// Uso: node studio/pdf-li-5-senales-futbol/build.mjs   (genera index.html y ../exports/li-5-senales-futbol-sin-marca.pdf)
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const STUDIO = path.resolve(HERE, "..");
const b64 = (f) => "data:image/png;base64," + fs.readFileSync(path.join(STUDIO, "brand/assets", f)).toString("base64");
const GOLD = b64("urpa-logo-gold.png"), BLACK = b64("urpa-logo-black.png");
const copy = JSON.parse(fs.readFileSync(path.join(STUDIO, "copy-futbol/li-5-senales.json"), "utf8"));
const C = (k) => copy[k] ?? k; // mismas líneas de fútbol que el vídeo

const pages = [
  `<section class="pg dark"><img class="logo" src="${GOLD}">
     <p class="t cover">${C("5 señales de que tu academia ha crecido más rápido que tu sistema de gestión")}</p>
     <i class="bar" style="top:1140px"></i><p class="foot" style="top:1180px;color:#cfcfcf;font-weight:600">${C("Academia Software")}</p></section>`,
  ...[
    ["1", "Ya no sabes cuántos alumnos activos tienes sin preguntarle a alguien."],
    ["2", "Cada profesor lleva la asistencia a su manera (o no la lleva)."],
    ["3", "Los cobros se persiguen por WhatsApp en vez de controlarse solos."],
    ["4", "Dar de alta un grupo nuevo implica avisar a 4 personas por separado."],
  ].map(([n, t]) => `<section class="pg cream"><img class="logo" src="${BLACK}"><b class="badge">${n}</b><p class="t body">${C(t)}</p></section>`),
  `<section class="pg dark"><img class="logo" src="${GOLD}"><b class="badge">5</b>
     <p class="t close">${C("Nadie —ni tú— tiene una vista completa de toda la academia.")}</p>
     <i class="bar" style="top:910px"></i><p class="foot" style="top:950px;font-size:34px;color:#cfcfcf;font-weight:600">${C("¿Cuántas de las 5 te suenan?")}</p>
     <p class="foot" style="top:1200px;color:#fff;font-weight:700">${C("Academia Software — el software de gestión para academias.")}</p></section>`,
];

const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>5 señales — URPA</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
<style>
@page { size: 1080px 1350px; margin: 0 }
* { margin: 0; padding: 0; box-sizing: border-box }
html, body { background: #111; font-family: "Montserrat", sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.pg { position: relative; width: 1080px; height: 1350px; overflow: hidden; break-after: page; page-break-after: always }
.dark { background: #111111 } .cream { background: #f7f3e8 }
.logo { position: absolute; left: 90px; top: 64px; width: 200px }
.badge { position: absolute; left: 90px; top: 170px; width: 160px; height: 160px; border-radius: 50%; background: #ffd21f; color: #111; font-size: 72px; font-weight: 800; display: flex; align-items: center; justify-content: center }
.t { position: absolute; left: 90px; font-weight: 800 }
.cover { top: 460px; width: 900px; font-size: 72px; line-height: 1.08; color: #ffd21f }
.body { top: 400px; width: 880px; font-size: 58px; line-height: 1.15; color: #353535 }
.close { top: 400px; width: 880px; font-size: 52px; line-height: 1.15; color: #ffd21f }
.bar { position: absolute; left: 90px; width: 90px; height: 8px; background: #ffd21f }
.foot { position: absolute; left: 90px; width: 900px; font-size: 30px; line-height: 1.3 }
</style></head><body>
${pages.join("\n")}
</body></html>`;
fs.writeFileSync(path.join(HERE, "index.html"), html);

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const out = path.join(STUDIO, "exports/li-5-senales-futbol-sin-marca.pdf");
fs.mkdirSync(path.dirname(out), { recursive: true });
const r = spawnSync(chrome, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=15000", `--print-to-pdf=${out}`, "file:///" + path.join(HERE, "index.html").replaceAll("\\", "/")], { encoding: "utf8" });
if (r.status !== 0) throw new Error("Chrome falló: " + (r.stderr || "").slice(0, 400));
console.log("OK", out, fs.statSync(out).size, "bytes");
