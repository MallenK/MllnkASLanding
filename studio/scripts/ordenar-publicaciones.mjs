#!/usr/bin/env node
/**
 * Ordena por FECHA DE PUBLICACIÓN los archivos de cada pieza en studio/publicaciones/.
 * Una carpeta por pieza: AAAA-MM-DD_canal_pieza/  (archivos + caption.txt). Genera INDEX.md.
 *
 * Fuente de verdad: studio/publicaciones/manifest.json  (una entrada por pieza del calendario).
 * Uso:  node studio/scripts/ordenar-publicaciones.mjs
 * Solo COPIA (los proyectos hf-* y exports/ no se tocan) y no borra nada: avisa de carpetas huérfanas.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(STUDIO, "publicaciones");
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "manifest.json"), "utf8"));
const DOW = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const CANAL = { linkedin: "LinkedIn", instagram: "Instagram" };

const pieces = [...manifest].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.canal.localeCompare(b.canal));
const wanted = new Set();
const rows = [];
let copied = 0, kept = 0;

for (const p of pieces) {
  const folder = `${p.fecha}_${p.canal}_${p.slug}`;
  wanted.add(folder);
  const out = path.join(DIR, folder);
  fs.mkdirSync(out, { recursive: true });
  for (const f of p.archivos || []) {
    const src = path.join(STUDIO, f.origen);
    if (!fs.existsSync(src)) { console.warn(`AVISO: no existe ${f.origen} (${folder})`); continue; }
    const dest = path.join(out, f.nombre);
    if (fs.existsSync(dest) && fs.statSync(dest).size === fs.statSync(src).size) { kept++; continue; }
    fs.copyFileSync(src, dest); copied++;
  }
  if (p.caption) fs.writeFileSync(path.join(out, "caption.txt"), p.caption + "\n", "utf8");
  if (p.nota) fs.writeFileSync(path.join(out, "LEEME.txt"), p.nota + "\n", "utf8");
  const d = new Date(p.fecha + "T00:00:00Z");
  rows.push(`| ${p.fecha} | ${DOW[d.getUTCDay()]} | ${CANAL[p.canal]} | ${p.titulo} | ${p.estado} | \`${folder}/\` |`);
}

const index = `# Publicaciones ordenadas por fecha

Generado por \`node studio/scripts/ordenar-publicaciones.mjs\` desde \`manifest.json\`. No edites las carpetas a mano: se regeneran.
Cada carpeta = una pieza lista para subir (archivos + \`caption.txt\`). Las piezas sin archivos aún (solo texto) llevan el borrador en \`caption.txt\`.

| Fecha | Día | Canal | Pieza | Estado | Carpeta |
|---|---|---|---|---|---|
${rows.join("\n")}
`;
fs.writeFileSync(path.join(DIR, "INDEX.md"), index, "utf8");

const orphans = fs.readdirSync(DIR, { withFileTypes: true }).filter((e) => e.isDirectory() && !wanted.has(e.name)).map((e) => e.name);
console.log(`OK ${pieces.length} piezas · ${copied} archivos copiados · ${kept} ya estaban`);
if (orphans.length) console.warn("AVISO carpetas que ya no están en el manifest (no se borran):\n  " + orphans.join("\n  "));
