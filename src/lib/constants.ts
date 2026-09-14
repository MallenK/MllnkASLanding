import {
  UserGroupIcon,
  CalendarDaysIcon,
  TicketIcon,
  FolderIcon,
  BellAlertIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import type {
  FaqItem,
  Feature,
  NavLink,
  ProofPoint,
  Stat,
  Step,
  StoryStep,
} from "@/types";

export const SITE_NAME = "Mallen'k Academy Software";
export const SITE_SHORT_NAME = "Mallen'k";
// Dominio gratuito de Vercel. Si más adelante compras un dominio propio,
// cambia solo esta constante: toda la metadata (canonical, OG, sitemap,
// JSON-LD) se recalcula sola a partir de aquí.
export const SITE_URL = "https://mallenk-academy-software.vercel.app";
export const DEMO_URL = "https://plataforma-jp-1.onrender.com/";
export const SITE_DESCRIPTION =
  "Software de gestión para academias deportivas: alumnos, calendario de clases, bonos y comunicación en un solo panel. Nacido en una academia de fútbol real, en producción desde el primer día.";
export const SITE_TAGLINE =
  "La plataforma de gestión para tu academia deportiva";

// `founder` se deja vacío a propósito: no hay que inventar un nombre en datos
// estructurados. Rellénalo con tu nombre real si quieres la señal E-E-A-T de
// "quién hay detrás" en Google (recomendado y gratis), o déjalo así y el
// schema simplemente omite el campo.
export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Mallen'k Academy Software",
  founder: "",
  foundingLocation: "Sant Vicenç dels Horts, Barcelona, España",
};

export const NAV_LINKS: NavLink[] = [
  { label: "La historia", href: "#historia" },
  { label: "Características", href: "#caracteristicas" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export const STORY_STEPS: StoryStep[] = [
  {
    tag: "El problema",
    title: "Una academia de fútbol real, ahogada en hojas de cálculo",
    description:
      "JP Preparation, academia de tecnificación en Sant Vicenç dels Horts (Barcelona), llevaba alumnos, bonos y asistencia entre Excel, papel y WhatsApp. La información se perdía y nada escalaba.",
  },
  {
    tag: "La construcción",
    title: "Diseñé y desarrollé un backoffice a medida",
    description:
      "Roles para dirección, entrenadores y alumnos. Calendario de clases, bonos que se descuentan solos al pasar lista, documentación con permisos, mensajería interna y notificaciones. Sin plantillas genéricas.",
  },
  {
    tag: "La prueba",
    title: "Hoy gestiona el día a día real, de forma autónoma",
    description:
      "La plataforma está en producción llevando la operación diaria de la academia. La diseño, desarrollo, despliego, aseguro y mantengo yo — sin agencias ni equipos externos de por medio.",
  },
  {
    tag: "El producto",
    title: "Ahora, la misma plataforma para tu academia",
    description:
      "Lo que empezó resolviendo un problema propio se abre a academias de fútbol, refuerzo escolar, idiomas y entrenamiento personal que necesitan lo mismo: un único panel que funciona de verdad.",
  },
];

export const FEATURES: Feature[] = [
  {
    id: "alumnos",
    title: "Alumnos y entrenadores",
    description:
      "Fichas, seguimiento, categorías y grupos. Cada perfil accesible en un clic, con permisos según el rol de quien lo consulta.",
    icon: UserGroupIcon,
  },
  {
    id: "calendario",
    title: "Calendario de clases",
    description:
      "Sesiones individuales y recurrentes, asignación de entrenadores y control de solapamientos, sin dobles reservas.",
    icon: CalendarDaysIcon,
  },
  {
    id: "bonos",
    title: "Bonos y membresías",
    description:
      "Se descuentan solos al pasar lista. Sin hojas de cálculo paralelas ni persecuciones manuales para saber quién tiene sesiones pendientes.",
    icon: TicketIcon,
  },
  {
    id: "documentacion",
    title: "Documentación y mensajería",
    description:
      "Material con permisos por carpeta y chat interno entre dirección, entrenadores y alumnos, todo dentro de la misma plataforma.",
    icon: FolderIcon,
  },
  {
    id: "notificaciones",
    title: "Notificaciones y soporte",
    description:
      "Avisos individuales o grupales y un sistema de tickets interno para resolver incidencias sin perder el hilo.",
    icon: BellAlertIcon,
  },
];

export const SECURITY_FEATURE = {
  title: "Seguridad real, no de anuncio",
  description:
    "CSRF activo, límite de intentos de acceso, contraseñas con bcrypt y permisos por rol desde el primer despliegue. Auditada, no prometida.",
  icon: ShieldCheckIcon,
};

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Explora la demo en vivo",
    description:
      "Deja tu email, entra como Dirección, Entrenador o Alumno, y elige el tipo de academia: fútbol, refuerzo escolar, idiomas o entrenamiento personal.",
  },
  {
    number: "02",
    title: "Configuramos tu academia",
    description:
      "Migramos alumnos, grupos, horarios y bonos. La plataforma se adapta a cómo trabajas tú, no al revés.",
  },
  {
    number: "03",
    title: "Empieza a operar",
    description:
      "Calendario, bonos, documentación y comunicación funcionando desde el día uno, con soporte directo de quien la construye.",
  },
];

export const PROOF_POINTS: ProofPoint[] = [
  {
    label: "Antes",
    title: "Excel, papel y WhatsApp",
    description:
      "Fichas de alumnos en hojas de cálculo sueltas, asistencia en papel a pie de campo y avisos dispersos en grupos de WhatsApp.",
  },
  {
    label: "Ahora",
    title: "Un único panel operativo",
    description:
      "Alumnos, bonos y asistencia centralizados. Los bonos se descuentan solos al pasar lista, sin hojas paralelas que cuadrar a mano.",
  },
  {
    label: "Resultado",
    title: "Trazabilidad de cada alumno",
    description:
      "Historial completo por alumno y por grupo, documentación con permisos y un canal único de comunicación con entrenadores y familias.",
  },
];

export const STATS: Stat[] = [
  { value: 5, suffix: "", label: "módulos integrados en un panel" },
  { value: 4, suffix: "", label: "tipos de academia soportados" },
  { value: 3, suffix: "", label: "roles con permisos propios" },
  { value: 100, suffix: "%", label: "diseñado y mantenido por su creador" },
];

export const FAQS: FaqItem[] = [
  {
    question: "¿Puedo probarlo sin hablar con nadie primero?",
    answer:
      "Sí. Solo pedimos tu email para abrir la demo (así puedo avisarte si mejoro algo o ayudarte con la migración). A partir de ahí exploras la plataforma libremente como Dirección, Entrenador o Alumno, eligiendo el tipo de academia: fútbol, refuerzo escolar, idiomas o entrenamiento personal.",
  },
  {
    question: "¿Esto es una plantilla genérica o un producto real?",
    answer:
      "Es una plataforma en producción real: nació para gestionar el día a día de una academia de fútbol y hoy sigue operando ahí, además de abrirse a otras academias.",
  },
  {
    question: "¿Quién mantiene la plataforma?",
    answer:
      "La diseño, desarrollo, despliego y mantengo yo directamente. No hay agencia ni equipo externo de por medio, así que los cambios y el soporte llegan sin intermediarios.",
  },
  {
    question: "¿Cómo gestiona la seguridad de los datos de alumnos?",
    answer:
      "Protección CSRF activa, límite de intentos de acceso por cuenta e IP, contraseñas con bcrypt y permisos por rol en cada ruta. No es un añadido de última hora, es parte del diseño desde el principio.",
  },
  {
    question: "¿Sirve para academias que no son de fútbol?",
    answer:
      "Sí. La demo permite explorar cuatro verticales: academias de fútbol, refuerzo escolar, idiomas y entrenamiento personal. El modelo de roles, bonos y calendario se adapta a cada una.",
  },
];
