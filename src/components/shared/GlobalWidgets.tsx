import { Analytics } from "@/components/shared/Analytics";
import { BackToTop } from "@/components/shared/BackToTop";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

// Agrupa los widgets flotantes que deben aparecer en cualquier página que
// tenga acceso a las traducciones (banner de cookies, WhatsApp, volver
// arriba, analítica). Vive dentro del proveedor de next-intl de cada árbol
// ([locale] o legal), nunca en el layout raíz — ahí forzaría renderizado
// dinámico en todo el sitio.
export function GlobalWidgets() {
  return (
    <>
      <CookieConsent />
      <BackToTop />
      <WhatsAppButton />
      <Analytics />
    </>
  );
}
