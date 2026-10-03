# -*- coding: utf-8 -*-
# Añade al manifest las piezas del 4 al 31 oct (calendario v2 pendiente + tramo 21-31 oct). Idempotente por (fecha, canal, slug).
import json
M = "publicaciones/manifest.json"
man = json.load(open(M, encoding="utf8"))
HT_IG = "#EscuelaDeFútbol #FútbolBase #GestiónDeportiva #EntrenadoresDeFútbol"
HT_LI = "#GestiónDeportiva #FútbolBase #EscuelasDeFútbol"
CAL = "https://cal.com/urpa-academy-software-kgpahx/15min"
DEMO = "Demo en vivo con datos ficticios."
def pngs(carpeta, n): return [dict(origen=f"exports/{carpeta}/{i:02d}.png", nombre=f"{i:02d}.png") for i in range(1, n + 1)]
def mp4(proj): return [dict(origen=f"hf-{proj}/renders/hf-{proj}-sin-musica.mp4", nombre=f"{proj}_SIN-MUSICA.mp4")]
COM = f"Primer comentario (con el enlace, nunca en el cuerpo): Reserva una demo de 15 minutos → {CAL}"

P = []
def add(fecha, canal, slug, titulo, estado, caption, archivos=None, nota=None):
    d = dict(fecha=fecha, canal=canal, slug=slug, titulo=titulo, estado=estado, caption=caption, archivos=archivos or [])
    if nota: d["nota"] = nota
    P.append(d)

add("2026-10-04","linkedin","carrusel-pdf-3-indicadores","Carrusel PDF «3 indicadores semanales»","Listo",
"Los 3 indicadores que debería mirar cada semana el responsable de una escuela de fútbol (desliza) →\n\nAsistencia por equipo, bonos y cuotas pendientes, plazas libres frente a lista de espera.\n\nSi para saber alguno tienes que preguntar a alguien o abrir un Excel, ese dato no está a mano cuando lo necesitas.\n\n¿Cuál de los tres sabes hoy sin preguntar a nadie?\n\n"+HT_LI,
[dict(origen="exports/li-3-indicadores.pdf",nombre="3-indicadores.pdf")], "Al subir el PDF a LinkedIn, título: «Los 3 indicadores que debería mirar cada semana el responsable de una escuela de fútbol».")

add("2026-10-05","linkedin","texto-falta-entrenador","Texto: qué pasa cuando falta un entrenador","Texto listo",
"Imagina esto: el viernes por la noche, un entrenador avisa de que el sábado no llega.\n\nQuien coordina tiene que resolver tres cosas a la vez: qué grupo se queda sin entrenador, quién puede cubrirlo y cómo avisar a las familias a tiempo.\n\nSi esa información vive en el móvil de cada persona, se resuelve a base de llamadas y mensajes sueltos.\n\nNo falla el equipo. Falla que nadie ve la semana completa: quién entrena qué grupo, a qué hora y en qué campo.\n\nCon todo en un calendario compartido, el hueco se ve el lunes, no el sábado a las 9:00.\n\n¿Cómo lo resolvéis hoy en tu escuela cuando un entrenador no puede venir?\n\n"+HT_LI)

add("2026-10-06","instagram","reel-asistencia","Reel «Así pasa lista un entrenador»","Listo sin música",
"Así pasa lista un entrenador en URPA.\n\nSe abre la sesión, se marca presente o ausente jugador a jugador, se añade una nota si hace falta y el bono se descuenta.\n\nSin papel, sin Excel y sin preguntar en el grupo quién vino.\n\nTe lo enseño en 15 minutos → escríbeme por DM o entra en el enlace del perfil.\n\n("+DEMO+")\n\n"+HT_IG, mp4("reel-asistencia"))

add("2026-10-07","linkedin","video-crear-clase","Vídeo: crear una clase recurrente","Listo (vídeo 4:5 sin música)",
"Crear una clase recurrente, en segundos.\n\nDesde el panel: Nueva clase, nombre, horario, lugar y objetivo del entrenamiento. Una vez, y la sesión se repite como la hayas definido.\n\n("+DEMO+")\n\n¿Cuántas veces al mes recreas a mano la misma sesión?\n\n"+HT_LI, mp4("post-crearclase"), COM)

add("2026-10-09","linkedin","texto-no-erp","Texto: por qué no construyo un «ERP» para escuelas","Texto listo (es tu opinión: revísala)",
"Por qué he decidido no construir un «ERP» para escuelas de fútbol.\n\nUn ERP promete cubrirlo todo. Para una escuela de 50 a 200 jugadores eso suele significar semanas de configuración, módulos que nadie abre y formación para todo el mundo.\n\nLo que sí se usa cada semana es corto: equipos y jugadores, calendario, asistencia, bonos y avisos.\n\nEso es lo que construyo en URPA. Si algo no se usa cada semana, todavía no entra.\n\nTe lo cuento porque cada decisión de producto es una renuncia, y prefiero que la veas.\n\nSi diriges una escuela: ¿qué funcionalidad crees que sobra en la mayoría de programas de gestión?\n\n"+HT_LI)

add("2026-10-10","instagram","carrusel-construyendo","Carrusel «Estamos construyendo URPA. Así va»","Listo",
"Estamos construyendo URPA para escuelas de fútbol. Esto es lo que ya funciona hoy (desliza) →\n\nPanel, calendario, asistencia, bonos con alertas, mensajes y documentos.\n\nY la pregunta que importa: ¿qué le falta a tu escuela? Lo que más se repite, lo construyo primero.\n\nDímelo por DM.\n\n"+HT_IG, pngs("ig-construyendo",7))

add("2026-10-13","instagram","reel-bonos","Reel «Bonos que se descuentan solos»","Listo sin música",
"¿Sigues contando a mano las sesiones de bono?\n\nCada jugador con su bono, sus sesiones y su caducidad en una lista. Filtras los agotados y los que están en su última sesión, y se descuentan al pasar lista.\n\nTe lo enseño en 15 minutos → escríbeme por DM o entra en el enlace del perfil.\n\n("+DEMO+")\n\n"+HT_IG, mp4("reel-bonos"))

add("2026-10-14","linkedin","texto-mas-excel","Texto: tu escuela no necesita más Excel","Texto listo",
"Tu escuela de fútbol no necesita más Excel. Necesita un sitio único.\n\nEl Excel no es el problema. Para calcular, ordenar y filtrar es excelente.\n\nEl problema empieza cuando lo usas para lo que no hace: convocar, pasar lista, avisar a las familias o saber que a un jugador se le acaba el bono.\n\nUn Excel no avisa a nadie, no sabe quién ha venido hoy y no te dice que algo caduca. Lo sabe quien lo mira, y solo cuando lo mira.\n\nUn sitio único sí: calendario, asistencia, bonos y avisos hablan entre ellos.\n\n¿Qué es lo que más haces hoy en un Excel y no deberías?\n\n"+HT_LI)

add("2026-10-16","linkedin","texto-3-preguntas","Texto: las 3 preguntas que hago a cada responsable","Texto listo",
"Las 3 preguntas que hago en la primera conversación con el responsable de una escuela de fútbol.\n\n1. ¿Cómo convocáis hoy a los equipos?\nMe dice si usa WhatsApp, llamadas o una herramienta, y quién carga con ello.\n\n2. ¿Quién sabe, de un vistazo, cuántos jugadores activos tenéis?\nSi la respuesta es «depende de a quién preguntes», falta un dato único.\n\n3. ¿Qué os haría perder menos tiempo los lunes?\nAhí está lo que de verdad hay que construir.\n\nNo vendo nada en estas preguntas: sirven para entender cómo trabaja cada escuela.\n\n¿Cuál contestarías tú hoy con más dificultad?\n\n"+HT_LI)

add("2026-10-18","linkedin","video-asistencia","Vídeo: pasar lista sin papel ni Excel","Listo (vídeo 4:5 sin música)",
"Pasar lista sin papel ni Excel.\n\nEl entrenador abre la sesión, marca presente o ausente, añade una nota si hace falta y guarda. El bono del jugador se descuenta.\n\n("+DEMO+")\n\n¿Cómo pasan lista hoy tus entrenadores?\n\n"+HT_LI, mp4("post-asistencia"), COM)

# ---- tramo 21-31 oct
add("2026-10-21","linkedin","video-panel","Vídeo: tu escuela en una pantalla","Listo (vídeo 4:5 sin música)",
"Tu escuela, en una pantalla.\n\nAlumnos activos, entrenadores y alertas de bonos arriba. Debajo, el calendario en vista de mes, de semana o de día.\n\n("+DEMO+")\n\n¿Qué es lo primero que miras cada lunes para saber cómo va tu escuela?\n\n"+HT_LI, mp4("post-dashboard"), COM)

add("2026-10-22","instagram","reel-alumnos","Reel «Toda tu escuela en un listado»","Listo sin música",
"Toda tu escuela en un solo listado.\n\nEstado y ficha de cada jugador, a un clic. Sin buscar entre hojas ni preguntar a quién lo tiene apuntado.\n\nTe lo enseño en 15 minutos → escríbeme por DM o entra en el enlace del perfil.\n\n("+DEMO+")\n\n"+HT_IG, mp4("reel-alumnos"))

add("2026-10-23","linkedin","texto-3-excusas","Texto: 3 excusas para no cambiar de sistema","Texto listo",
"Las 3 excusas para no cambiar de sistema a mitad de temporada, y por qué ninguna aguanta.\n\n«Ahora no es el momento».\nA mitad de temporada es cuando más duele. No hace falta migrarlo todo: se empieza con uno o dos equipos y el resto se suma después.\n\n«Mis entrenadores no lo van a usar».\nSi pasar lista cuesta menos que hacerlo en papel, lo usan. Se empieza por lo que ya hacen cada día.\n\n«Ya tengo mi Excel y funciona».\nFunciona mientras solo lo necesita una persona. Cuando dos lo necesitan a la vez, alguien trabaja con datos de la semana pasada.\n\n¿Cuál de las tres has dicho tú alguna vez? Yo no te juzgo, la he oído muchas veces.\n\n"+HT_LI)

add("2026-10-24","instagram","carrusel-antes-despues","Carrusel «Tu escuela hoy vs. con un sitio único»","Listo",
"Tu escuela hoy vs. con un sitio único (desliza) →\n\nConvocatorias, asistencia, bonos, alertas y pestañas abiertas. Cinco cosas que se simplifican cuando viven en el mismo sitio.\n\n¿Cuál de las 5 te cuesta más hoy? Cuéntamelo en los comentarios o por DM.\n\n"+HT_IG, pngs("ig-antes-despues",7))

add("2026-10-25","linkedin","texto-viernes-antes","Texto: checklist del viernes antes de un sábado de partidos","Texto listo",
"El viernes decide cómo va el sábado. Esta es la lista que repasaría cada semana si coordinara una escuela de fútbol:\n\n1. Convocatorias enviadas y confirmadas por equipo.\n2. Un entrenador asignado a cada grupo, con suplente.\n3. Campo y hora de cada sesión, revisados.\n4. Jugadores con bono a punto de agotarse.\n5. Un único sitio donde ver todo lo anterior.\n\nLos puntos 1 al 4 se resuelven con disciplina. El 5 requiere herramientas.\n\n¿Qué punto añadirías?\n\n"+HT_LI)

add("2026-10-26","linkedin","texto-oferta-2-escuelas","Texto: busco 2 escuelas piloto","Texto listo (confirma la oferta antes de publicar)",
"Busco 2 escuelas de fútbol para trabajar juntas este mes.\n\nLo que propongo:\n\n· 30 días con URPA, sin coste.\n· Cargamos tus equipos y jugadores juntos el primer día.\n· Una llamada corta cada semana para ajustar lo que haga falta.\n· Al final decides si sigues, a precio de fundador.\n\nA quién va dirigido: escuelas de tecnificación de fútbol con entre 30 y 300 jugadores, que hoy llevan convocatorias, asistencia y bonos entre WhatsApp y Excel.\n\nSolo hay 2 plazas porque quiero acompañar cada escuela de cerca.\n\nSi te encaja, escríbeme por mensaje privado o reserva una demo de 15 minutos (enlace en el primer comentario).\n\n"+HT_LI, None,
"OFERTA ELEGIDA POR DEFECTO (opción C): 30 días sin coste + onboarding contigo + llamada semanal + decisión final a precio de fundador. Si cambias las condiciones, edita este texto y el reel del 31 oct.\n"+COM)

add("2026-10-27","instagram","reel-alertas","Reel «Alertas de bonos»","Listo sin música",
"Entérate de quién se queda sin sesiones antes de que pase.\n\nEl panel te avisa de los bonos agotados y de los que están en su última sesión. Lo ves a la vez que el resto de la escuela.\n\nTe lo enseño en 15 minutos → escríbeme por DM o entra en el enlace del perfil.\n\n("+DEMO+")\n\n"+HT_IG, mp4("reel-alertas"))

add("2026-10-28","linkedin","texto-como-es-demo","Texto: cómo es una demo de 15 minutos","Texto listo",
"Cómo es una demo de URPA, paso a paso, para que sepas qué esperar antes de reservarla.\n\nDura 15 minutos y la hacemos tú y yo, en directo.\n\n1. Primeros 2 minutos: me cuentas cómo llevas hoy tu escuela.\n2. Siguientes 8: te enseño asistencia, bonos y calendario con datos de ejemplo, centrado en lo que me hayas contado.\n3. Últimos 5: dudas y siguiente paso. Sin compromiso.\n\nNo hace falta preparar nada ni instalar nada.\n\nSi quieres verla con tu escuela, el enlace para reservar está en el primer comentario.\n\n"+HT_LI, None, COM)

add("2026-10-29","instagram","carrusel-checklist","Carrusel «Checklist: escuela organizada en 1 semana»","Listo",
"Checklist: tu escuela de fútbol organizada en 1 semana (desliza) →\n\nDía 1 equipos y jugadores. Día 2 calendario. Día 3 asistencia. Día 4 bonos. Día 5 comunicación. Días 6 y 7 revisión.\n\nGuárdalo para el lunes. Y si quieres que te ayude a montarlo, escríbeme por DM.\n\n"+HT_IG, pngs("ig-checklist-semana",8))

add("2026-10-30","linkedin","texto-balance-mes","Texto: un mes construyendo en público","Texto listo (completa 2 cifras reales)",
"Un mes hablando de escuelas de fútbol en público. Este es el balance.\n\nLo que he hecho: [nº] conversaciones con responsables de escuelas y [nº] demos.\n\nLo que ya funciona en URPA: panel, calendario, asistencia por sesión, bonos con alertas, mensajes y documentos.\n\nLo que he aprendido sobre cómo se habla de esto: el problema se entiende rápido (convocatorias, asistencia, bonos) y la solución se entiende mejor viéndola que leyéndola. Por eso la demo es de 15 minutos y en directo.\n\nLo que viene: seguir con escuelas piloto y construir lo que más se repita en las conversaciones.\n\nSi quieres entrar como escuela piloto, escríbeme.\n\n"+HT_LI, None,
"Antes de publicar: sustituye [nº] por tus cifras reales de conversaciones y demos del mes.\n"+COM)

add("2026-10-31","instagram","reel-oferta","Reel «Busco 2 escuelas piloto»","Listo sin música (confirma la oferta)",
"Busco 2 escuelas de fútbol para trabajar juntas.\n\n30 días con URPA, acompañado por mí. Cargamos tus equipos el primer día, una llamada corta cada semana y, al final, decides si sigues a precio de fundador.\n\nÚltimas plazas. Escríbeme por DM o entra en el enlace del perfil.\n\n"+HT_IG, mp4("reel-oferta"),
"OFERTA ELEGIDA POR DEFECTO (opción C). Debe coincidir con el post de LinkedIn del 26 oct.")

keys = {(m["fecha"], m["canal"], m["slug"]) for m in man}
for p in P:
    k = (p["fecha"], p["canal"], p["slug"])
    if k in keys: man[[i for i,m in enumerate(man) if (m["fecha"],m["canal"],m["slug"])==k][0]] = p
    else: man.append(p)
json.dump(man, open(M, "w", encoding="utf8"), ensure_ascii=False, indent=2)
print(len(man), "piezas en el manifest")
