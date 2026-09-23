import {
  UserGroupIcon,
  CalendarDaysIcon,
  TicketIcon,
  FolderIcon,
  BellAlertIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import type { IconType } from "@/types";

export const SITE_NAME = "URPA Academy Software";
export const SITE_SHORT_NAME = "URPA";
// Dominio gratuito de Vercel. Si más adelante compras un dominio propio,
// cambia solo esta constante: toda la metadata (canonical, OG, sitemap,
// JSON-LD) se recalcula sola a partir de aquí.
export const SITE_URL = "https://academiasoftware.vercel.app";
export const DEMO_URL = "https://plataforma-jp-1.onrender.com/";
// Usada solo por los assets globales que no viven bajo /[locale] (manifest,
// imagen OG/Twitter compartida): esos siguen siendo únicos para todo el
// sitio, así que se quedan en español igual que el resto de la metadata base.
export const SITE_TAGLINE =
  "La plataforma de gestión para tu academia deportiva";

// Desarrollador del producto (señal E-E-A-T de "quién hay detrás" en Google).
export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "URPA Academy Software",
  founder: "MallenK",
  founderUrl: "https://mallenk.github.io/Portfolio/",
  foundingLocation: "Sant Vicenç dels Horts, Barcelona, España",
};

// Anclas de sección: se mantienen iguales en los 3 idiomas (no son texto
// visible, así que no hace falta traducirlas). La etiqueta de cada una vive
// en el mensaje `nav.<key>` de cada locale.
export const NAV_SECTIONS = [
  { slug: "historia", key: "history" },
  { slug: "caracteristicas", key: "features" },
  { slug: "como-funciona", key: "howItWorks" },
  { slug: "faq", key: "faq" },
  { slug: "contacto", key: "contact" },
] as const;

// Datos de identificación para las páginas legales (LSSI/RGPD). `taxId` se
// deja vacío a propósito para no inventar datos fiscales: rellénalo con el
// NIF/CIF real antes de publicar en producción. Las páginas legales se
// mantienen solo en español (decisión de producto), por eso este bloque no
// pasa por el sistema de traducciones.
export const LEGAL = {
  responsibleName: ORGANIZATION.legalName,
  taxId: "",
  address: ORGANIZATION.foundingLocation,
  contactEmail: "mllnkacademiasoftware@gmail.com",
  lastUpdated: "2026-09-21",
};

export const CONTACT_EMAIL = "mllnkacademiasoftware@gmail.com";
// Formato internacional sin espacios ni "+", tal y como lo requiere el
// enlace wa.me.
export const WHATSAPP_NUMBER = "34670248461";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE_TEL = `+${WHATSAPP_NUMBER}`;
export const PHONE_DISPLAY = "+34 670 24 84 61";

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/urpa-academia-software/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/urpaacademiasoftware/",
  },
];

// Los textos (title/description) de cada módulo viven en
// messages/<locale>.json bajo "features.items[index]"; aquí solo se guarda
// el id (para la key de React) y el icono, que no cambian por idioma.
export const FEATURE_ICONS: { id: string; icon: IconType }[] = [
  { id: "alumnos", icon: UserGroupIcon },
  { id: "calendario", icon: CalendarDaysIcon },
  { id: "bonos", icon: TicketIcon },
  { id: "documentacion", icon: FolderIcon },
  { id: "notificaciones", icon: BellAlertIcon },
];

export const SECURITY_FEATURE_ICON: IconType = ShieldCheckIcon;

// Los valores numéricos de las estadísticas no cambian por idioma; solo la
// etiqueta (messages "socialProof.stats[index].label") se traduce.
export const STAT_VALUES = [
  { value: 5, suffix: "" },
  { value: 4, suffix: "" },
  { value: 3, suffix: "" },
  { value: 100, suffix: "%" },
];

// Igual que arriba: el número de paso es visual/decorativo y no se traduce.
export const STEP_NUMBERS = ["01", "02", "03"];
