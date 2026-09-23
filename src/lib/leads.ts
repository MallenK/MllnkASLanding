// Criterio de negocio: cualquier contacto cuenta como lead. Se envía como
// `generate_lead` (evento recomendado de GA4) con `method` indicando el canal.
export type LeadMethod =
  | "contact_form"
  | "demo_gate"
  | "whatsapp"
  | "email"
  | "phone";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLead(method: LeadMethod) {
  // gtag solo existe si el visitante aceptó las cookies (ver Analytics.tsx).
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "generate_lead", { method });
}

export function leadMethodFromHref(href: string): LeadMethod | null {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("https://wa.me/")) return "whatsapp";
  return null;
}
