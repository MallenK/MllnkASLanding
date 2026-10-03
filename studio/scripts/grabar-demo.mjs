#!/usr/bin/env node
/**
 * Graba flujos del demo público de URPA con Playwright (webm 1440x900, cursor visible).
 * Requiere sesiones guardadas en studio/_rec/{admin,coach}.json (tutorial ya cerrado).
 * Uso: node studio/scripts/grabar-demo.mjs [flujo ...]   (sin argumentos: todos)
 * Salida: studio/_rec/<flujo>.webm y studio/_rec/<flujo>.json.log con el instante (s) en que empieza la acción.
 */
import { chromium } from "file:///C:/Users/Mallen/AppData/Roaming/npm/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const REC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../_rec");
const U = "https://plataforma-jp-1.onrender.com";
const CURSOR = `(()=>{const c=document.createElement('div');c.style.cssText='position:fixed;z-index:2147483647;width:26px;height:26px;border-radius:50%;background:rgba(255,210,31,.85);border:3px solid #111;pointer-events:none;left:-50px;top:-50px;transform:translate(-50%,-50%);transition:transform .12s';
document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(c));
document.addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'},true);
document.addEventListener('mousedown',()=>c.style.transform='translate(-50%,-50%) scale(.7)',true);
document.addEventListener('mouseup',()=>c.style.transform='translate(-50%,-50%) scale(1)',true);})();`;
let T0 = 0; let MARKS = {}; const mk = (n) => { MARKS[n] = +((Date.now() - T0) / 1000).toFixed(2); };
const wait = (p, ms) => p.waitForTimeout(ms);
async function go(p, loc) {
  const l = typeof loc === "string" ? p.locator(loc).first() : loc.first();
  await l.scrollIntoViewIfNeeded().catch(() => {});
  const b = await l.boundingBox();
  if (!b) throw new Error("sin caja: " + loc);
  await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 28 });
  await wait(p, 350);
  return l;
}
async function tap(p, loc) { const l = await go(p, loc); await l.click(); await wait(p, 300); }

const FLOWS = {
  async asistencia(p) { // coach
    await p.goto(U + "/clases/238"); await p.waitForLoadState("networkidle"); await wait(p, 600);
    return async () => {
      mk("inicio"); await p.mouse.move(700, 300, { steps: 20 }); await wait(p, 1500);
      await p.evaluate(() => window.scrollTo({ top: 700, behavior: "smooth" })); await wait(p, 1500);
      mk("gestionar"); await tap(p, p.getByRole("link", { name: /Gestionar asistencia/ }).or(p.getByText("Gestionar asistencia")));
      await p.waitForLoadState("networkidle"); await wait(p, 1800); mk("tabla");
      const sel = p.locator("select").filter({ hasText: "Pendiente" });
      for (let i = 0; i < 3; i++) {
        if (i === 0) mk("marcar"); const l = await go(p, sel.nth(i)); await l.selectOption({ label: i === 2 ? "Ausente" : "Presente" }); await wait(p, 1300);
      }
      mk("nota"); await go(p, p.locator("input[placeholder^='Nota']").nth(2)); await p.keyboard.type("Avisó por lesión", { delay: 70 }); await wait(p, 1200);
      mk("guardar"); await go(p, p.getByRole("button", { name: /Guardar asistencia/ })); await wait(p, 1800);
    };
  },
  async crearclase(p) { // admin
    await p.goto(U + "/dashboard"); await p.waitForLoadState("networkidle"); await wait(p, 600);
    return async () => {
      mk("inicio"); await wait(p, 1500);
      mk("nueva"); await tap(p, p.getByRole("button", { name: /Nueva clase/ }).first());
      await wait(p, 1200);
      mk("titulo"); await tap(p, p.getByPlaceholder(/Entrenamiento individual/)); await p.keyboard.type("Tecnificación Sub-12 · Martes", { delay: 65 }); await wait(p, 900);
      mk("recurrente"); await tap(p, p.getByText("Recurrente", { exact: true })); await wait(p, 2600); await p.screenshot({ path: REC + "/_crearclase-2.png" });
      mk("fin"); await tap(p, p.getByRole("button", { name: "Cancelar" })); await wait(p, 1200);
    };
  },
  async bonos(p) { // admin
    await p.goto(U + "/bonos"); await p.waitForLoadState("networkidle"); await wait(p, 600);
    return async () => {
      mk("inicio"); await wait(p, 1800);
      mk("lista"); await p.mouse.move(720, 450, { steps: 20 }); await p.evaluate(() => window.scrollBy({ top: 260, behavior: "smooth" })); await wait(p, 2200);
      await p.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" })); await wait(p, 1200);
      mk("agotados"); await tap(p, p.getByText("Agotados").first()); await wait(p, 2200);
      mk("ultima"); await tap(p, p.getByText("Última sesión").first()); await wait(p, 2200);
      mk("activos"); await tap(p, p.getByText("Activos").first()); await wait(p, 1500);
    };
  },
  async dashboard(p) { // admin
    await p.goto(U + "/dashboard"); await p.waitForLoadState("networkidle"); await wait(p, 600);
    return async () => {
      mk("inicio"); await p.mouse.move(400, 180, { steps: 20 }); await wait(p, 1800);
      mk("semana"); await tap(p, p.getByText("Semana", { exact: true }).first()); await wait(p, 2200);
      mk("dia"); await tap(p, p.getByText("Día", { exact: true }).first()); await wait(p, 2200);
      mk("mes"); await tap(p, p.getByText("Mes", { exact: true }).first()); await wait(p, 2000);
    };
  },
  async alertas(p) { // admin
    await p.goto(U + "/dashboard"); await p.waitForLoadState("networkidle"); await wait(p, 600);
    return async () => {
      mk("inicio"); await wait(p, 1200);
      mk("alerta"); await tap(p, p.getByText("ALERTAS DE BONOS", { exact: false }).first());
      await p.waitForLoadState("networkidle"); await wait(p, 2200);
      mk("ultima"); await tap(p, p.getByText("Última sesión").first()); await wait(p, 2200);
      mk("agotados"); await tap(p, p.getByText("Agotados").first()); await wait(p, 2000);
    };
  },
  async alumnos(p) { // admin
    await p.goto(U + "/alumnos"); await p.waitForLoadState("networkidle"); await wait(p, 600);
    return async () => {
      mk("inicio"); await wait(p, 1800);
      mk("lista"); await p.mouse.move(720, 450, { steps: 20 }); await p.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" })); await wait(p, 2000);
      await p.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" })); await wait(p, 1200);
      const first = p.locator("table tbody tr a, table tbody tr").first();
      mk("ficha"); await tap(p, first); await p.waitForLoadState("networkidle"); await wait(p, 2500); await p.screenshot({ path: REC + "/_alumnos-2.png" });
      await p.evaluate(() => window.scrollBy({ top: 400, behavior: "smooth" })); await wait(p, 2200);
    };
  },
};
const ROLE = { asistencia: "coach", crearclase: "admin", bonos: "admin", dashboard: "admin", alertas: "admin", alumnos: "admin" };
const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(FLOWS);
const browser = await chromium.launch();
// Sesión fresca por rol (las sesiones del demo caducan): login rápido, cierra el tutorial y guarda el estado.
async function prepare(role) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(U + "/", { timeout: 120000 });
  await p.waitForFunction(() => !document.title.startsWith("Render"), null, { timeout: 240000 });
  await p.getByRole("button", { name: role === "admin" ? /DIRECCI/i : /ENTRENADOR/i }).click();
  await p.waitForLoadState("networkidle"); await p.waitForTimeout(1500);
  await p.mouse.click(952, 328); await p.waitForTimeout(600);
  await ctx.storageState({ path: path.join(REC, role + ".json") });
  await ctx.close();
}
for (const role of new Set(want.map((n) => ROLE[n]))) await prepare(role);
for (const name of want) {
  T0 = Date.now(); MARKS = {}; const t0 = T0;
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: path.join(REC, ROLE[name] + ".json"), recordVideo: { dir: path.join(REC, "_v_" + name), size: { width: 1440, height: 900 } } });
  await ctx.addInitScript(CURSOR);
  const p = await ctx.newPage();
  let ok = true, start = 0, end = 0;
  try {
    const action = await FLOWS[name](p);
    start = (Date.now() - t0) / 1000;
    await action();
    end = (Date.now() - t0) / 1000;
  } catch (e) { ok = false; console.error("FALLO", name, e.message.split("\n")[0]); await p.screenshot({ path: REC + "/_fallo-" + name + ".png" }).catch(() => {}); }
  const v = p.video();
  await ctx.close();
  const src = await v.path();
  fs.copyFileSync(src, path.join(REC, name + ".webm"));
  fs.writeFileSync(path.join(REC, name + ".log.json"), JSON.stringify({ ok, start, end, marks: MARKS }));
  console.log(name, ok ? "OK" : "FALLO", "accion", start.toFixed(1), "->", end.toFixed(1));
}
await browser.close();
