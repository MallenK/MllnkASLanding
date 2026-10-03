// Genera index.html a partir del guion de la canvas de Moda "Instagram Pilar-A Reel — 3 señales"
const fs = require("fs");
// Ritmo: rejilla de compases. Cambia BPM/BEATS para acelerar o frenar todo el vídeo.
const BPM = 128;
const B = 60 / BPM;
const BEATS = { hook: 6, s1: 5, s2: 5, s3: 5, remate: 7, cta: 6 };
const ids = Object.keys(BEATS);
let acc = 0;
const SCENES = ids.map((id) => { const t0 = +acc.toFixed(3); acc += BEATS[id] * B; return ["#" + id, t0, +acc.toFixed(3)]; });
const TOTAL = +acc.toFixed(3);
const CTA0 = SCENES[SCENES.length - 1][1];
// Efectos de sonido (libreria incluida de media-use, Pixabay Content License) colocados sobre la rejilla
const SFX = [];
const sfx = (file, at, dur, vol) => SFX.push({ file, at: +Math.max(0, at).toFixed(3), dur: +Math.min(dur, TOTAL - Math.max(0, at)).toFixed(3), vol });
SCENES.forEach(([id, t0], i) => { if (i > 0) sfx("whoosh-short", t0 - 0.22, 0.575, 0.55); });
["s1", "s2", "s3"].forEach((k) => { const sc = SCENES.find((x) => x[0] === "#" + k); sfx("pop", sc[1] + 0.03, 0.72, 0.45); });
sfx("impact-bass-1", SCENES.find((x) => x[0] === "#remate")[1] + 0.5, 2.1, 0.5);
sfx("chime", CTA0 + 0.8, 2.0, 0.4);
const SFX_HTML = SFX.map((e, i) => `      <audio id="sfx${i + 1}" src="assets/sfx/${e.file}.mp3" data-start="${e.at}" data-duration="${e.dur}" data-track-index="${11 + i}" data-volume="${e.vol}"></audio>`).join("\n");
const words = (t, cls = "") =>
  t.split(" ").map((w) => `<span class="w${cls ? " " + cls : ""}">${w}</span>`).join(" ");
const dots = (n) => `<div class="dots">${[1, 2, 3].map((i) => `<i class="${i === n ? "on" : ""}"></i>`).join("")}</div>`;
const senal = (n, body) => `
        <div id="s${n}" class="scene">
          <div class="num">${n}</div>
          ${dots(n)}
          <div class="tag">Señal ${n}</div>
          <p class="body gold-text">${words(body)}</p>
        </div>`;

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      /* Fuente del guion: canvas Moda "2026-09-24 Instagram Pilar-A Reel — 3 señales" (brand kit Mallen'k / URPA) */
      :root {
        --bg: #111111;
        --white: #ffffff;
        --cream: #f7f3e8;
        --gold: #ffd21f;
        --sans: "Montserrat", ui-sans-serif, system-ui, sans-serif;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: var(--bg); }
      #root { width: 100%; height: 100%; position: relative; overflow: hidden; background: var(--bg); font-family: var(--sans); }

      #bg { position: absolute; inset: 0; overflow: hidden; }
      .glow { position: absolute; border-radius: 50%; }
      #g1 { width: 1400px; height: 1400px; left: -700px; top: 1200px; background: radial-gradient(circle, rgba(255, 210, 31, 0.20) 0%, rgba(255, 210, 31, 0) 65%); }
      #g2 { width: 1100px; height: 1100px; left: 500px; top: -520px; background: radial-gradient(circle, rgba(247, 243, 232, 0.07) 0%, rgba(247, 243, 232, 0) 65%); }

      #content { position: absolute; inset: 0; }
      .scene { position: absolute; inset: 0; opacity: 0; }

      /* Zonas seguras Reels: texto entre y 300 y 1560, x 100 a 940 */
      .block { position: absolute; left: 100px; width: 840px; font-weight: 800; letter-spacing: -0.02em; }
      .hook { top: 560px; font-size: 92px; line-height: 1.1; color: var(--white); }
      .body { position: absolute; left: 100px; width: 840px; top: 640px; font-weight: 800; font-size: 82px; line-height: 1.12; letter-spacing: -0.02em; }
      .gold-text { color: var(--gold); }
      .remate { top: 560px; font-size: 80px; line-height: 1.12; color: var(--cream); }
      .cta { top: 640px; font-size: 96px; line-height: 1.1; color: var(--gold); }
      .w { display: inline-block; }
      .accent { color: var(--gold); }

      .tag { position: absolute; left: 100px; top: 470px; padding: 14px 30px; border-radius: 999px; background: var(--gold); color: #000; font-weight: 800; font-size: 34px; letter-spacing: 0.18em; text-transform: uppercase; }
      .num { position: absolute; right: 60px; top: 300px; font-weight: 800; font-size: 820px; line-height: 1; color: var(--gold); opacity: 0.08; }
      .dots { position: absolute; left: 100px; top: 380px; display: flex; gap: 18px; }
      .dots i { display: block; width: 22px; height: 22px; border-radius: 50%; border: 3px solid rgba(255, 210, 31, 0.55); }
      .dots i.on { background: var(--gold); border-color: var(--gold); }

      #sign { position: absolute; left: 100px; top: 1290px; width: 420px; }
      #sign2 { position: absolute; left: 100px; top: 1440px; font-weight: 700; font-size: 34px; letter-spacing: 0.04em; color: var(--white); opacity: 0; }
      #logo { position: absolute; left: 100px; top: 296px; width: 190px; }
      #pitch { position: absolute; inset: 0; }
      #arrow { display: inline-block; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1080" data-height="1920">
      <div id="bg" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="0">
        <div id="g1" class="glow"></div>
        <div id="g2" class="glow"></div>
        <svg id="pitch" viewBox="0 0 1080 1920" fill="none" stroke="#f7f3e8" stroke-width="6" stroke-opacity="0.07">
          <line x1="0" y1="1000" x2="1080" y2="1000"/>
          <circle cx="540" cy="1000" r="250"/>
          <circle cx="540" cy="1000" r="10" fill="#f7f3e8" fill-opacity="0.07"/>
          <rect x="190" y="1700" width="700" height="360"/>
          <rect x="190" y="-140" width="700" height="360"/>
        </svg>
      </div>

      <div id="logowrap" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="2">
        <img id="logo" src="assets/brand/urpa-logo.png" alt="URPA">
      </div>

      <div id="content" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="1">
        <div id="hook" class="scene">
          <div class="tag">Escuelas de fútbol</div>
          <h1 class="block hook">${words("¿Gestionas tu escuela de fútbol con más de")} <span class="w accent">3</span> ${words("herramientas?")}</h1>
        </div>
${senal(1, "Tienes un Excel Y varios grupos de WhatsApp para convocatorias y pagos")}
${senal(2, "Cuando falta un entrenador, nadie tiene la vista completa")}
${senal(3, "Cobrar la cuota del mes implica perseguir a las familias por mensaje")}
        <div id="remate" class="scene">
          <p class="block remate">${words("Si te ha pasado, no es un problema tuyo.")} ${words("Es un", "")} <span class="w accent">problema</span> <span class="w accent">de</span> <span class="w accent">sistema.</span></p>
        </div>
        <div id="cta" class="scene">
          <p class="block cta">${words("Te enseño cómo lo resuelvo")} <span class="w" id="arrow">→</span> ${words("sígueme")}</p>
          <img id="sign" src="assets/brand/urpa-logo.png" alt="URPA">
          <div id="sign2">Gestión para escuelas de fútbol</div>
        </div>
      </div>

      <audio id="bgm" src="assets/music/bgm.mp3" data-start="0" data-duration="${TOTAL}" data-track-index="10" data-volume="0.4"></audio>
${SFX_HTML}
    </div>

    <script>
      const tl = gsap.timeline({ paused: true });
      const scenes = ${JSON.stringify(SCENES)};
      const last = scenes.length - 1;

      scenes.forEach(([id, t0, t1], i) => {
        tl.fromTo(id, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "power1.out" }, t0);
        tl.fromTo(id + " .w", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.38, ease: "power3.out", stagger: 0.045 }, t0 + 0.06);
        if (i !== last) tl.to(id, { opacity: 0, duration: 0.16, ease: "power1.in" }, t1 - 0.16);
      });

      // Escenas de señal: etiqueta, numero de fondo y puntos de progreso
      [1, 2, 3].forEach((n, k) => {
        const t0 = scenes[k + 1][1];
        tl.fromTo("#s" + n + " .tag", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, t0 + 0.03);
        tl.fromTo("#s" + n + " .num", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 0.08, duration: 0.9, ease: "power2.out" }, t0);
        tl.fromTo("#s" + n + " .dots", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0 + 0.05);
      });

      // Cierre: firma y flecha
      tl.fromTo("#sign2", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, ${(CTA0 + 1.1).toFixed(2)});
      tl.fromTo("#sign", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, ${(CTA0 + 0.8).toFixed(2)});
      // Revisión QA: el logo fijo de arriba se retira cuando entra la firma de cierre (sin logo duplicado)
      tl.to("#logo", { opacity: 0, duration: 0.3, ease: "power1.in" }, ${(CTA0 + 0.7).toFixed(2)});
      tl.fromTo("#arrow", { x: 0 }, { x: 22, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 3 }, ${(CTA0 + 0.7).toFixed(2)});

      // Logo fijo: entra al inicio y se queda todo el vídeo
      tl.fromTo("#logo", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.05);

      // Fondo: brillo dorado que respira durante todo el vídeo
      tl.fromTo("#g1", { scale: 1, x: 0 }, { scale: 1.25, x: 80, duration: ${TOTAL}, ease: "none" }, 0);
      tl.fromTo("#g2", { scale: 1, y: 0 }, { scale: 1.15, y: 90, duration: ${TOTAL}, ease: "none" }, 0);

      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;
fs.writeFileSync("index.html", html);
console.log("index.html", html.length);
