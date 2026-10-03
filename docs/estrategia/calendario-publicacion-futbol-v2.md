# URPA — Calendario de publicación (enfoque fútbol) · 28 sept – 20 oct 2026

> Versión visual interactiva: https://claude.ai/artifact/GHMZFtsda2ZBKRXeWeRGiD (privada; se actualiza con este documento cuando lo pidas).

Generado: sáb 26 sept 2026. Continúa `academia_software_plan_contenido_30dias_y_prospeccion.md` (no lo sustituye) con el giro a **escuelas de fútbol** y las piezas que ya están producidas. Canales: LinkedIn (perfil personal del fundador, 3–4/semana) e Instagram (faceless, 3 piezas/semana + stories).

## Estado y supuestos

1. **Confirmado (27 sept): solo hay UN post publicado en cada red, el de presentación** ("Creamos tu sistema de gestión de academias", cuenta @urpaacademysoftware; en LinkedIn es el mismo). Ninguna pieza de la semana 1 del plan original salió; todo lo de este calendario está por publicar.
2. **Se reanuda el ciclo el lunes 28 sept** con la misma cadencia y los mismos pilares (A problema · B educativo · C producto · D construir en público · E casos reales sigue reservado: no hay pilotos cerrados).
3. **CTA**: el perfil ya tiene enlace en la bio y demo en vivo (el post de presentación lo usa: "escríbenos por DM o entra en el enlace de nuestro perfil"). CTA estándar = DM + enlace del perfil. En LinkedIn el enlace va en el primer comentario, no en el cuerpo.
4. **Marca**: la cuenta pública ya es URPA (@urpaacademysoftware); los captions usan URPA. Sigue pendiente confirmar la URL definitiva.
5. **Posicionamiento**: el post de presentación habla de "academias" en general; este calendario se centra en escuelas de fútbol (prioridad 1 del ICP). Conviene que la bio de ambos perfiles lo refleje (p. ej. "Software de gestión para escuelas de fútbol y academias").

## Bloqueos antes de publicar

| Bloqueo | Afecta a | Cómo se desbloquea |
|---|---|---|
| Licencia de la pista Mixkit sin verificar | Solo las versiones **con música** de los reels (29 sept, 8 y 17 oct) | Leer y confirmar la licencia, o subir la **versión sin música** y elegir música en Instagram (las cuentas de empresa tienen restricciones con la biblioteca). El PDF y las imágenes no llevan música. |
| Faltan grabaciones reales de pantalla del producto | 4 piezas de pilar C (mar 6, mié 7, mar 13, dom 18 oct) | Una sola sesión de grabación de 30–45 min (crear equipo, asistencia desde el móvil, cobro de cuota, calendario de sesiones). |
| URL definitiva sin confirmar | Enlace en comentarios/bio | Confirmar la URL (hoy el perfil ya tiene enlace y demo). |

## Dónde están los archivos de cada publicación

Todo lo listo está ordenado por fecha de publicación en `studio/publicaciones/` (una carpeta por pieza: `AAAA-MM-DD_canal_pieza/` con los archivos y su `caption.txt`; índice en `studio/publicaciones/INDEX.md`). Se regenera con `node studio/scripts/ordenar-publicaciones.mjs`. Las rutas de la tabla de abajo son los archivos originales de cada proyecto.

## Lo que ya tenemos (versión fútbol, logo URPA fijo)

| Pieza | Archivo | Formato | Estado |
|---|---|---|---|
| Reel "3 señales" (sin música) | `studio/hf-reel-3-senales/renders/reel-3-senales-v2-sin-musica.mp4` | 1080×1920, 16 s | **Listo para publicar** (generado el 27 sept, -15,4 LUFS solo efectos) |
| Reel "3 señales" (con música) | `studio/hf-reel-3-senales/renders/reel-3-senales-v2-musica-baja.mp4` | 1080×1920, 16 s | Aprobado; bloqueado por licencia música |
| Reel "¿Cómo convocas a tu equipo?" | `studio/hf-reel-convocatorias/renders/hf-reel-convocatorias-sin-musica.mp4` (y `hf-reel-convocatorias.mp4` con música, -18,2 LUFS) | 1080×1920, 16 s | **Listo** sin música; con música bloqueado |
| Reel "¿Cuántas apps usas?" | `studio/hf-reel-cuantas-apps/renders/hf-reel-cuantas-apps-sin-musica.mp4` (y `hf-reel-cuantas-apps.mp4` con música, -18,2 LUFS) | 1080×1920, 16 s | **Listo** sin música; con música bloqueado |
| Carrusel IG "5 cosas" (7 imágenes) | `studio/exports/ig-carrusel-5-cosas/01.png … 07.png` | 1080×1350 | **Listas para publicar** (generadas el 27 sept, sin música ni marca de agua) |
| Carrusel IG "5 cosas" (vídeo, opcional) | `studio/hf-ig-5-cosas-futbol/renders/ig-5-cosas-futbol-v2.mp4` | 1080×1350, 19 s | Bloqueado por licencia música; no hace falta |
| Carrusel LinkedIn "5 señales" (PDF) | `studio/exports/li-5-senales-futbol-sin-marca.pdf` | 6 páginas | **Listo para publicar** |
| Carrusel LinkedIn "5 señales" (vídeo) | `studio/hf-li-5-senales-futbol/renders/li-5-senales-futbol-v2.mp4` | 1080×1350, 21,6 s | Secundario (reutilizar en IG o como recordatorio) |
| Carrusel LinkedIn "Organizar los equipos" (PDF) | `studio/exports/li-organizar-equipos.pdf` | 6 páginas | **Listo** (generado el 27 sept con `studio/scripts/carrusel.mjs`, sin marca de agua) |
| Carrusel IG "4 tipos de sesiones" (6 imágenes) | `studio/exports/ig-4-tipos-sesiones/01.png … 06.png` | 1080×1350 | **Listas** |
| Serie de 14 stories "Sobre URPA" (imágenes) | `studio/exports/stories-urpa/01.png … 14.png` | 1080×1920 | **Listas para publicar**, una por tarjeta y en orden |
| Serie de 14 stories (vídeo, opcional) | `studio/hf-stories-urpa-futbol/renders/stories-urpa-futbol-v3.mp4` | 1080×1920, 48 s | Bloqueado por licencia música; no hace falta |

**Nota stories:** las 14 tarjetas ya están exportadas por separado. En la última, sticker de mensaje con «Pídenos una demo».

## Calendario

Estados: 🟢 lista para publicar · 🟡 lista, bloqueada · ✍️ texto por escribir (borrador abajo) · 🎬 necesita grabación de pantalla · 🛠️ por producir con el conversor.

### Semana 2 (28 sept – 4 oct)

| Día | Canal | Pilar | Pieza | Estado |
|---|---|---|---|---|
| Lun 28 | LinkedIn | D | Texto "Por qué empecé por las escuelas de fútbol" (continúa el post de presentación) | ✍️ Borrador A |
| Mar 29 | Instagram | A | **Reel "3 señales"** | 🟢 Versión sin música · Caption abajo |
| Mié 30 | LinkedIn | A | Texto "¿Cuántas herramientas usas para gestionar 150 jugadores?" | ✍️ Borrador B |
| Jue 1 oct | Instagram | B | **Carrusel "5 cosas"** (imágenes) | 🟢 Caption abajo |
| Vie 2 | LinkedIn | B | **Carrusel PDF "5 señales"** | 🟢 Caption abajo |
| Sáb 3 | Instagram | — | **Stories "Sobre URPA"** (14 tarjetas) | 🟢 |
| Dom 4 | LinkedIn | B | **Carrusel PDF** "Los 3 indicadores que debería mirar cada semana el responsable de una escuela de fútbol" | 🟢 Listo (2 oct) |

### Semana 3 (5 – 11 oct)

| Día | Canal | Pilar | Pieza | Estado |
|---|---|---|---|---|
| Lun 5 | LinkedIn | A | Texto "Qué pasa cuando falta un entrenador y nadie tiene la vista completa de los equipos" | 🟢 Texto listo (2 oct) |
| Mar 6 | Instagram | C | **Reel "Así pasa lista un entrenador en URPA"** (grabado del demo en escritorio; no se dice "desde el móvil") | 🟢 Sin música (2 oct) |
| Mié 7 | LinkedIn | C | **Vídeo 4:5** "Crear una clase recurrente, en segundos" | 🟢 Sin música (2 oct) |
| Jue 8 | Instagram | A | Reel "¿Cómo convocas a tu equipo para el sábado?" (convocatorias por WhatsApp) | 🟢 Versión sin música · Caption abajo |
| Vie 9 | LinkedIn | D | Texto "Por qué decidí no construir un 'ERP' para escuelas (y qué construyo en su lugar)" | 🟢 Texto listo (revisar: es tu opinión) |
| Sáb 10 | Instagram | D | **Carrusel** "Estamos construyendo URPA para escuelas de fútbol. Así va." (7 imágenes) | 🟢 Listo (2 oct) |

### Semana 4 (12 – 18 oct)

| Día | Canal | Pilar | Pieza | Estado |
|---|---|---|---|---|
| Lun 12 | LinkedIn | B | Carrusel PDF "Cómo organizar los equipos de tu escuela sin que dependa de una sola persona" | 🟢 Lista · Caption abajo |
| Mar 13 | Instagram | C | **Reel "¿Sigues contando a mano las sesiones de bono?"** (sustituye al de cobro de cuota: el demo no gestiona cobros, sí bonos) | 🟢 Sin música (2 oct) |
| Mié 14 | LinkedIn | A | Texto "Tu escuela de fútbol no necesita más Excel. Necesita un sitio único." | 🟢 Texto listo (2 oct) |
| Jue 15 | Instagram | B | Carrusel "4 tipos de sesiones que cualquier escuela debería poder gestionar" (6 imágenes) | 🟢 Lista · Caption abajo |
| Vie 16 | LinkedIn | D | Texto "Las 3 preguntas que hago a cada responsable de escuela" (sustituye al de «lo que estoy aprendiendo», que exigía datos reales) | 🟢 Texto listo (2 oct) |
| Sáb 17 | Instagram | A | Reel "¿Cuántas apps usas hoy para gestionar tu escuela de fútbol?" | 🟢 Versión sin música · Caption abajo |
| Dom 18 | LinkedIn | C | **Vídeo 4:5** "Pasar lista sin papel ni Excel" | 🟢 Sin música (2 oct) |

**Lun 19 – Mar 20 oct (buffer):** sin pieza nueva. Responder comentarios, comentar en 5–10 posts de responsables de escuelas y clubes, revisar qué funcionó y planificar el ciclo 2.

**Reparto:** A = 7 · B = 6 · C = 5 · D = 4 · stories = 1 (E reservado). Cadencia LinkedIn 3–4/semana, Instagram 3/semana.

## Caption y copy de las piezas listas

### Instagram · Reel "3 señales" (mar 29 sept)

> ¿Gestionas tu escuela de fútbol con más de 3 herramientas?
>
> Un Excel Y varios grupos de WhatsApp para convocatorias y pagos. Cuando falta un entrenador, nadie tiene la vista completa. Y cobrar la cuota del mes implica perseguir a las familias por mensaje.
>
> Si te suena, no es un problema tuyo: es un problema de sistema.
>
> Te enseño cómo lo resuelvo → escríbeme por DM.
>
> #EscuelaDeFútbol #FútbolBase #GestiónDeportiva #ClubesDeFútbol #EntrenadoresDeFútbol

### Instagram · Carrusel "5 cosas" (jue 1 oct)

> 5 cosas que deberías poder ver de un vistazo cada semana en tu escuela de fútbol (desliza) →
>
> Jugadores activos y bajas · asistencia por equipo · cuotas de las familias pendientes · entrenadores con horas descuadradas o entrenos sin cubrir · equipos con plazas libres vs. lista de espera.
>
> Si para saber alguna tienes que preguntar, buscar en un Excel o escribir por WhatsApp, tu escuela ya necesita un sistema, no más hojas de cálculo.
>
> Guárdalo para tu próxima reunión de temporada.
>
> #EscuelaDeFútbol #FútbolBase #GestiónDeportiva #ClubesDeFútbol

### Instagram · Reel "¿Cómo convocas a tu equipo?" (jue 8 oct)

> ¿Cómo convocas a tu equipo para el sábado?
>
> Publicas la convocatoria en el grupo y se pierde entre decenas de mensajes. Unos confirman en el grupo, otros por privado y otros no confirman. Y el sábado por la mañana nadie sabe con cuántos jugadores cuentas.
>
> No es falta de compromiso. Es un problema de sistema.
>
> Te enseño cómo lo resuelvo → escríbenos por DM o entra en el enlace del perfil.
>
> #EscuelaDeFútbol #FútbolBase #Convocatorias #EntrenadoresDeFútbol #GestiónDeportiva

### Instagram · Reel "¿Cuántas apps usas?" (sáb 17 oct)

> ¿Cuántas apps usas hoy para gestionar tu escuela de fútbol?
>
> WhatsApp para convocatorias y avisos. Excel para jugadores y cuotas. Un calendario para entrenos y partidos.
>
> Tres sitios. Ninguno habla con los demás.
>
> Te enseño cómo lo resuelvo → escríbenos por DM o entra en el enlace del perfil.
>
> #EscuelaDeFútbol #FútbolBase #GestiónDeportiva #ClubesDeFútbol

### LinkedIn · Carrusel PDF "Organizar los equipos" (lun 12 oct)

> Cómo organizar los equipos de tu escuela de fútbol sin que dependa de una sola persona (desliza) →
>
> Si hay una persona que «lo sabe todo» —quién juega dónde, quién paga, quién entrena a quién—, tu escuela tiene un punto único de fallo.
>
> Cuatro cosas que ayudan a repartirlo. ¿Cuál de las 4 te falta hoy?
>
> #GestiónDeportiva #FútbolBase #EscuelasDeFútbol

### Instagram · Carrusel "4 tipos de sesiones" (jue 15 oct)

> 4 tipos de sesiones que cualquier escuela de fútbol debería poder gestionar (desliza) →
>
> Entrenos semanales, partidos, torneos y tecnificación. Si cada uno vive en un sitio distinto —un calendario, un grupo de WhatsApp, un Excel—, cuesta ver la semana completa.
>
> ¿Cuántos gestionas hoy en el mismo sitio? Cuéntamelo en los comentarios.
>
> #EscuelaDeFútbol #FútbolBase #GestiónDeportiva #ClubesDeFútbol

### LinkedIn · Carrusel PDF "5 señales" (vie 2 oct)

> 5 señales de que tu escuela de fútbol ha crecido más rápido que tu sistema de gestión (desliza) →
>
> Ninguna de estas señales significa que lo estés haciendo mal. Significa que la escuela ha crecido y las herramientas se han quedado atrás.
>
> ¿Cuántas de las 5 te suenan?
>
> #GestiónDeportiva #FútbolBase #EscuelasDeFútbol
>
> *(Enlace, cuando esté confirmado, en el primer comentario, no en el cuerpo del post.)*

Nota de LinkedIn: al subir el PDF, poner el título "5 señales de que tu escuela de fútbol ha crecido más rápido que tu sistema de gestión".

### Instagram · Stories "Sobre URPA" (sáb 3 oct)

Publicar las 14 tarjetas en orden (sobre URPA → calendario → bonos → comunicación → seguridad → FAQ → demo). Añadir en la última un sticker de mensaje/DM con "Pídenos una demo".

## Borradores de texto (LinkedIn)

**Comprueba que cada afirmación de estos textos es cierta antes de publicar** (p. ej. las conversaciones con responsables de escuelas).

### Borrador A — Lun 28 sept · Pilar D

*(El post de presentación ya contó qué es URPA; este no lo repite. Rellena el hueco entre corchetes con tu motivo real: no lo he inventado.)*

> Hace unos días presenté URPA. Hoy te cuento por qué empecé por las escuelas de fútbol.
>
> [Tu motivo real: qué viste, en qué escuela, qué pasaba a diario — 2–3 frases.]
>
> Lo que más se repite: convocatorias por WhatsApp, cuotas de las familias perseguidas por mensaje, entrenadores que no saben quién falta y un Excel que solo entiende una persona.
>
> No piden más funcionalidades. Piden dejar de tener la información repartida en cinco sitios.
>
> Voy a ir compartiendo aquí cómo lo construyo: lo que aprendo, lo que cambio y lo que no funciona.
>
> Si diriges o coordinas una escuela de fútbol, ¿cuántas herramientas usas hoy para llevarla?

### Borrador B — Mié 30 sept · Pilar A

> ¿Cuántas herramientas usas para gestionar 150 jugadores?
>
> Un Excel para las inscripciones.
> Un grupo de WhatsApp por cada equipo o categoría.
> Un calendario compartido para entrenos y partidos.
> Una hoja aparte para las cuotas.
> Y una carpeta de mensajes sueltos para todo lo que no encaja en ningún sitio.
>
> Ninguna herramienta está mal. El problema es que ninguna habla con las demás.
>
> Así que cuando falta un entrenador, nadie tiene la visión completa. Cuando una familia pregunta por un pago, hay que buscar en tres sitios. Y cuando la escuela crece, el sistema no crece con ella: se rompe.
>
> No es un problema de organización. Es un problema de herramientas pensadas para una sola cosa, no para el día a día completo de una escuela de fútbol.
>
> Es exactamente el problema para el que estoy construyendo URPA.

## Rutina de engagement (30 min/día)

1. Responder todos los comentarios de tus posts (5 min).
2. Comentar con valor en 5–10 posts de responsables de escuelas, clubes y entrenadores (15 min).
3. 2–3 mensajes manuales y personalizados a contactos nuevos (5 min). Sin automatización ni scraping en LinkedIn.
4. Anotar qué comentarios o DMs piden demo (5 min).

## Métricas a mirar cada domingo (no seguidores)

Visitas al perfil · DMs recibidos · demos solicitadas · guardados y compartidos en IG · comentarios en LinkedIn de responsables de escuelas. Con los datos de las dos primeras semanas se ajustan los formatos de la semana 4 y el ciclo 2.

## Siguiente ciclo (2)

Detallado en `estrategia-cierre-2-clientes-21-31-oct.md` (21–31 oct, con todas las piezas ya producidas). Prospectos en `prospectos-tecnificacion-futbol-oct.md`. Empieza el 21 oct. Si en ese tiempo se cierra el primer piloto, activar el pilar E (casos reales). No inventar casos hasta entonces.
