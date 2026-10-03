import { SITE_NAME, SITE_URL, CONTACT_EMAIL, ORGANIZATION } from "@/lib/constants";

// Documento auxiliar en texto plano para asistentes de IA. No es un requisito
// de indexación ni garantiza citas; solo describe el producto con fidelidad.
export const dynamic = "force-static";

const BODY = `# ${SITE_NAME}

> Software de gestión para academias de fútbol y tecnificación: alumnos, calendario de clases, asistencia, bonos y comunicación en un solo panel. Nació en una academia de tecnificación de Sant Vicenç dels Horts (Barcelona), donde sigue en uso. Lo desarrolla y mantiene ${ORGANIZATION.founder}.

## Páginas principales

- [Español](${SITE_URL}/es): página principal con módulos, comparativa, preguntas frecuentes y reserva de demo.
- [English](${SITE_URL}/en): main page in English.
- [Català](${SITE_URL}/ca): pàgina principal en català.

## Legal

- [Política de privacidad](${SITE_URL}/privacidad)
- [Términos](${SITE_URL}/terminos)
- [Cookies](${SITE_URL}/cookies)

## Contacto

- Demo guiada de 15 minutos: reserva desde la página principal.
- Email: ${CONTACT_EMAIL}
`;

export function GET() {
  return new Response(BODY, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
