---
name: revisar-pieza
description: >
  Revisión de diseño obligatoria de una pieza visual de URPA (reel, vídeo 4:5, carrusel, stories) DESPUÉS de
  renderizarla y ANTES de ordenarla en studio/publicaciones o darla por lista. Úsala siempre que se cree,
  edite o re-renderice un proyecto studio/hf-*, o cuando el usuario pida "revisar", "QA", "buscar
  incoherencias/duplicados" en un vídeo o post. Detecta logos/textos duplicados, elementos que se pisan,
  desbordes, zona segura y elementos de la misma familia con tamaño/color distinto (p.ej. una insignia
  numerada más grande que las demás), y los corrige.
---

# Revisar pieza (QA de diseño)

Ejecutar **cada vez que se renderiza una pieza** y antes de `node studio/scripts/ordenar-publicaciones.mjs`.
Auditor: `studio/qa/auditar.mjs` (Playwright; mueve el timeline GSAP y mide el DOM real). Si falta
`studio/qa/node_modules`, `cd studio/qa && npm i`.

## Procedimiento

1. **Auditar** (desde la raíz del repo):
   `node studio/qa/auditar.mjs hf-<pieza> --sheet`   (o `--all`).
   Genera `studio/qa/informes/<pieza>.json` y la hoja de contactos `<pieza>_hoja.png`.
2. **Mirar la hoja de contactos** con Read (la herramienta no ve lo que el DOM no revela: jerarquía rara,
   contraste, huecos, un elemento "casi igual" pero distinto). Mirar especialmente **las últimas pantallas**.
   Para tarjetas/carruseles PNG exportados, abrir también los PNG finales.
3. **Corregir en la fuente** (`index.html` y, si existe, `build.cjs` del proyecto; no en el mp4):
   - `DUP_IMG` / `DUP_TEXT` / contenido repetido en pantallas finales → **regla del usuario: se elimina el
     elemento que estaba antes y se conserva el que aparece de nuevo.** Ej.: el `#logo` fijo de arriba se
     desvanece (`tl.to("#logo", {opacity:0…})`) cuando entra la firma `#sign` del cierre.
   - `INCONSISTENT` → igualar al patrón mayoritario (tamaño y color de insignias, etiquetas, puntos…). Si la
     variación es intencionada (p.ej. diapositiva "acento" a número gigante), dejarlo y decirlo en el informe.
   - `OVERLAP` / `OUT_OF_BOUNDS` / `OVERFLOW` / `OUT_OF_SAFE` → reajustar posición o tamaño.
   - Un aviso `REPEAT_SCENES` solo es problema si el contenido es realmente redundante.
4. **Repetir el paso 1** hasta 0 errores.
5. **Regenerar los entregables** y revisar el fotograma final:
   - Vídeo: `node studio/qa/rerender-conservando-audio.mjs hf-<pieza>` (re-renderiza y conserva el audio
     aprobado de cada entregable; deja `.prev.mp4`). Si es una pieza nueva sin entregables, renderiza con
     `npx hyperframes render` desde su carpeta.
   - Carrusel/PNG: `node studio/qa/exportar-paneles.mjs hf-<pieza> <carpeta> <t1> <t2> …`
     (o `studio/scripts/carrusel.mjs` si nace de un JSON). Copiar solo los PNG que cambian.
   - Extraer el último fotograma (`ffmpeg -sseof -0.3 -i x.mp4 -frames:v 1 f.png`) y mirarlo.
6. **Informe**: 3-6 líneas: qué se encontró, dónde (escena/segundo), qué se cambió, qué se dejó por ser
   intencionado. Sin informe limpio y fresco, `ordenar-publicaciones.mjs` se niega a copiar los vídeos hf-*.

## Qué NO hace el auditor
No valora el copy ni la marca, ni el audio. Para textos de la publicación usar las skills de copy; aquí solo
diseño y coherencia visual.
