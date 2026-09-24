# Plan: Hyperframes para campañas publicitarias con agentes de diseño

Estado: propuesta · 2026-09-24

## 1. Qué es y por qué encaja

[Hyperframes](https://github.com/heygen-com/hyperframes) (HeyGen, Apache 2.0, sin coste por render) convierte una composición HTML/CSS/JS con timeline GSAP en MP4 determinista (Chromium headless + FFmpeg). Está pensado para que agentes escriban el HTML. Requisitos: Node 22+ y FFmpeg.

Comprobado en esta máquina: Node 24.19 y FFmpeg 9.0.1 ya instalados.

Reparto de herramientas:

| Herramienta | Uso |
|---|---|
| Moda.app | Canvas estáticos, carruseles, posts, brand kit visual (lo que ya hacemos) |
| Hyperframes | Vídeo/motion **programático y en serie**: variantes de hook × idioma × formato salidas de un brief |

Ventaja clave: una campaña = datos (`brief.json`) + plantillas HTML; el agente cambia datos, no rehace diseño.

## 2. Decisión de arquitectura (importante)

Este repo es una landing Next.js estática; **no tiene backend propio**. El backend real del producto (Plataforma JP) está en Render. Regla del plan:

- **No renderizar dentro de Next ni en serverless de Vercel.** Chromium + FFmpeg exceden límites de tamaño/tiempo.
- Hyperframes vive en un workspace Node **aislado** (`studio/`), fuera del bundle de la landing.
- El "backend" es un **worker de render Node** (fase 3), desplegable en un contenedor (Render, donde ya estamos). Next, si hace falta, solo lo llama por HTTP.

> Supuesto a confirmar: "el backend que tenemos" = servicio Node en Render de Plataforma JP. Si prefieres reutilizarlo tal cual, el worker se monta como servicio aparte en la misma cuenta (no mezclar con el de producción).

## 3. Estructura propuesta

```
studio/                       # package.json propio, no toca el de la landing
  brand/
    tokens.json               # colores/tipografías extraídos de globals.css
    logo/, fonts/             # desde brand-assets/
  templates/                  # composiciones HTML parametrizables
    ad-9x16.html  ad-4x5.html  ad-1x1.html  ad-16x9.html
    _shared/                  # componentes: hook, prueba social, CTA, endcard
  campaigns/<slug>/
    brief.json                # objetivo, ICP, hooks, claims, CTA, idiomas, formatos
    variants/                 # HTML generado por agentes
    out/                      # MP4/PNG (gitignored)
  scripts/render-matrix.mjs   # @hyperframes/producer: itera hook×idioma×formato
  agents/                     # definiciones de los agentes (ver §4)
```

Copy en es/en/ca reutilizando la terminología de `messages/*.json` para no divergir del sitio.

## 4. Agentes de diseño (equipo)

Se implementan como subagentes/skills de Claude Code, reutilizando las skills ya presentes en `agent/skills` (`ad-creative`, `ads`, `copywriting`, `social`) más las skills de Hyperframes (`npx skills add heygen-com/hyperframes`).

| Agente | Entrada → Salida | Apoyo |
|---|---|---|
| Estratega | objetivo + ICP → `brief.json` (3–5 ángulos, hooks) | `ad-creative` (hook-system), estrategia de marketing 0€ |
| Copy | brief → textos por idioma y formato, límites de caracteres | `copywriting` |
| Dirección de arte | brief + tokens → layout y jerarquía por formato | `impeccable`, `brand-style` |
| Motion | layout → composición HTML + timeline GSAP | skills `hyperframes-core/animation` |
| QA | variantes → informe pass/fail | `hyperframes lint`, `check`, `snapshot` + revisión visual de frames |
| Producción | variantes aprobadas → matriz de renders + nombres | `render-matrix.mjs` |

Flujo: Estratega → Copy → Arte → Motion (en paralelo por variante) → QA → **aprobación humana** → Producción.

## 5. Fases

**Fase 0 — Spike (½–1 día)**
- `npx hyperframes init` dentro de `studio/`; render de un anuncio 4:5 de 6 s con logo y colores de marca.
- Validar: fuentes, calidad del texto, tiempo de render, resultado idéntico en repetición.
- Criterio de salida: MP4 usable en Instagram/LinkedIn sin retoques.

**Fase 1 — Sistema de marca y plantillas (2–3 días)**
- Extraer `tokens.json` de `globals.css` y `brand-assets/`.
- 2 plantillas base (problema→solución, demo de producto con las capturas de `public/`) × 4 formatos.
- Componentes compartidos y safe areas por plataforma.

**Fase 2 — Equipo de agentes (3–4 días)**
- Definir los 6 agentes, contrato de `brief.json` (esquema validado) y checklist de QA.
- Primera campaña real de extremo a extremo: 3 hooks × 2 idiomas × 2 formatos = 12 vídeos, con el calendario de 30 días como fuente.

**Fase 3 — Worker de render (3–5 días, solo si Fase 2 lo justifica)**
- Servicio Node (Fastify) con cola simple: `POST /renders {campaign, variant}` → estado → URL del MP4.
- Contenedor con Chromium + FFmpeg, salida a almacenamiento de objetos; jobs de 1 en 1 al inicio.
- Alternativa: `hyperframes lambda` si el volumen crece.

**Fase 4 — Bucle de mejora (continuo)**
- Registrar métricas por variante (hook, formato, idioma) y devolverlas al Estratega. Encaja con la skill `ab-testing`.

## 6. Guardarraíles

- Aprobación humana antes de cualquier publicación; **los agentes nunca publican**.
- Claims solo desde una lista aprobada (`brief.json → claims`): producto en beta (ver aviso en términos), sin métricas ni testimonios inventados.
- Nada de datos reales de alumnos/menores en demos: usar datos ficticios.
- `out/` en `.gitignore`; MP4 pesados fuera del repo.
- Fuentes y música con licencia comprobada.

## 7. Riesgos

| Riesgo | Mitigación |
|---|---|
| Diferencias de render Windows vs. Linux (fuentes, Chromium) | Fase 0 en ambos; el worker Docker es la referencia final |
| Proyecto joven (lanzado abril 2026), API puede cambiar | Fijar versión exacta, wrapper propio en `render-matrix.mjs` |
| Consumo de CPU/RAM del render | Cola de 1 job, resolución 1080p, límites de duración |
| Calidad "genérica" de anuncios generados | QA visual obligatorio + plantillas con dirección de arte propia |

## 8. Decisiones abiertas

1. ¿Confirmas que "backend" = servicio Node en Render (o prefieres arrancar solo local/CLI hasta la Fase 3)?
2. ¿Plataformas prioritarias: LinkedIn, Instagram/Reels, ambas?
3. ¿Presupuesto de música/voz? (Runwat/Higgsfield disponibles como generadores, con coste por crédito).

## Siguiente paso recomendado

Ejecutar la Fase 0 hoy: es reversible, no toca la landing y responde a las dos dudas técnicas grandes (calidad y determinismo).
