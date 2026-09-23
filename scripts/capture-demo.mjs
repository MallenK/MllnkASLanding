// Regenera public/screens/*.png desde la demo (rol admin, datos ficticios).
// Uso: npm i --no-save playwright && node scripts/capture-demo.mjs
import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const css = "#debug-icon,#debug-bar,.debug-bar,#toolbarContainer,.debug-bar-wrapper,#jp-tutorial-overlay{display:none!important}";
await p.goto("https://plataforma-jp-1.onrender.com/login", { waitUntil: "networkidle", timeout: 90000 });
await p.click('button:has-text("DIRECCIÓN / ADMIN")');
await p.waitForURL("**/dashboard");
for (const [name, path] of [["dashboard","/dashboard"],["alumnos","/alumnos"],["clases","/clases"],["bonos","/bonos"],["mensajes","/mensajes"]]) {
  if (!p.url().endsWith(path)) await p.goto("https://plataforma-jp-1.onrender.com"+path, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: css });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `public/screens/${name}.png` });
}
await b.close();
