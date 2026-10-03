#!/usr/bin/env node
/**
 * Exporta fotogramas PNG de una composición hf-* en instantes concretos (p.ej. un carrusel de Instagram hecho con hf-ig-*).
 * Oculta la barra de progreso (.track) para que quede como una imagen estática.
 * Uso: node studio/qa/exportar-paneles.mjs <hf-carpeta> <carpeta-salida> <t1> <t2> …   (nombres 01.png, 02.png…)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [name, out, ...ts] = process.argv.slice(2);
const find = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { const r = find(p); if (r) return r; } else if (/chrome-headless-shell\.exe$/.test(e.name)) return p; } };
const exe = find(path.join(process.env.USERPROFILE, ".cache/hyperframes/chrome"));
const html = path.join(STUDIO, name, "index.html");
const root = fs.readFileSync(html, "utf8").match(/id="root"[^>]*>/)[0];
const W = +root.match(/data-width="(\d+)"/)[1], H = +root.match(/data-height="(\d+)"/)[1];
const b = await chromium.launch({ executablePath: exe, headless: true });
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.addInitScript(() => { window.__timelines = window.__timelines || {}; });
await p.goto(pathToFileURL(html).href);
await Promise.race([p.addStyleTag({ url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" }), new Promise((r) => setTimeout(r, 8000))]).catch(() => {});
await p.evaluate(() => document.fonts.load("800 40px Montserrat").then(() => document.fonts.ready));
await p.addStyleTag({ content: ".track{display:none!important}" });
fs.mkdirSync(out, { recursive: true });
let i = 1;
for (const t of ts) { await p.evaluate((x) => { window.__timelines.main.pause(); window.__timelines.main.seek(+x, false); }, t); await p.screenshot({ path: path.join(out, String(i++).padStart(2, "0") + ".png") }); }
await b.close();
console.log("OK", ts.length, "paneles →", out);
