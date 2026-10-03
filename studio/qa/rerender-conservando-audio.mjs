#!/usr/bin/env node
/**
 * Tras corregir una composición hf-*: re-renderiza el vídeo y lo mezcla con el audio YA aprobado
 * de cada entregable (sin música / con música) para no tener que rehacer ni mezclar de nuevo el sonido.
 * Los originales se guardan como <nombre>.prev.mp4.
 *
 * Uso: node studio/qa/rerender-conservando-audio.mjs hf-reel-bonos hf-post-dashboard …
 * Qué entregables hay por proyecto: lo lee de studio/publicaciones/manifest.json (campo archivos[].origen).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(STUDIO, "publicaciones/manifest.json"), "utf8"));
const projects = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const CONC = 2;
const run = (cmd, args, cwd) => new Promise((res) => { const c = spawn(cmd, args, { cwd, shell: true, stdio: "ignore" }); c.on("exit", res); });
const dur = (f) => parseFloat(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], { encoding: "utf8" }).stdout);

async function one(name) {
  const dir = path.join(STUDIO, name);
  const fresh = path.join(dir, "renders", "_qa.mp4");
  console.log(`▶ ${name}: renderizando…`);
  await run("npx", ["--yes", "hyperframes@0.8.72", "render", "--quiet", "-o", `"${fresh}"`], dir);
  if (!fs.existsSync(fresh)) return console.error(`✗ ${name}: el render no generó ${fresh}`);
  const targets = manifest.flatMap((p) => p.archivos || []).map((a) => a.origen).filter((o) => o.startsWith(name + "/") && o.endsWith(".mp4"));
  for (const rel of targets) {
    const old = path.join(STUDIO, rel);
    if (!fs.existsSync(old)) { console.warn(`  aviso: no existe ${rel}`); continue; }
    const tmp = old.replace(/\.mp4$/, ".qa-tmp.mp4");
    const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-i", fresh, "-i", old, "-map", "0:v:0", "-map", "1:a:0", "-c", "copy", "-shortest", tmp], { encoding: "utf8" });
    if (r.status || !fs.existsSync(tmp)) { console.error(`  ✗ remux ${rel}: ${r.stderr}`); continue; }
    if (Math.abs(dur(tmp) - dur(old)) > 0.2) { console.error(`  ✗ ${rel}: duración distinta (${dur(tmp)} vs ${dur(old)}); no se reemplaza`); fs.unlinkSync(tmp); continue; }
    fs.renameSync(old, old.replace(/\.mp4$/, ".prev.mp4"));
    fs.renameSync(tmp, old);
    console.log(`  ✓ ${rel} actualizado (original: .prev.mp4)`);
  }
  fs.unlinkSync(fresh);
}

const queue = [...projects];
await Promise.all(Array.from({ length: CONC }, async () => { while (queue.length) await one(queue.shift()); }));
console.log("Hecho. Vuelve a pasar el auditor y revisa los fotogramas finales antes de ordenar-publicaciones.");
