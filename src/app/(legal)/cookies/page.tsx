import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/shared/LegalLayout";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Qué cookies usa esta web y cómo puedes gestionarlas.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Política de Cookies">
      <LegalSection heading="Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que se almacenan en tu navegador
          al visitar una web. Esta web usa un número reducido de cookies y
          almacenamiento local, descritos a continuación.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies que usamos">
        <ul>
          <li>
            <strong>Necesarias (siempre activas):</strong> guardan tu
            elección sobre este mismo aviso de cookies (
            <code>mk_cookie_consent</code>) y si ya has accedido antes a la
            demo en vivo (<code>mk_demo_access</code>), para no pedírtelo dos
            veces. No requieren consentimiento porque son imprescindibles
            para el funcionamiento básico de la web.
          </li>
          <li>
            <strong>Analíticas (solo si las aceptas):</strong> Google
            Analytics (<code>_ga</code>, <code>_ga_*</code>), que nos ayuda a
            entender cuántas visitas recibe la web y qué secciones se leen
            más, de forma agregada y anónima. Solo se cargan si pulsas
            &quot;Aceptar&quot; en el aviso de cookies.
          </li>
        </ul>
        <p>Esta web no usa cookies de publicidad ni de terceros para perfilado.</p>
      </LegalSection>

      <LegalSection heading="Cómo gestionar tu elección">
        <p>
          Puedes aceptar o rechazar las cookies analíticas desde el aviso que
          aparece en tu primera visita. Si quieres cambiar tu elección más
          adelante, borra los datos de navegación de este sitio desde la
          configuración de tu navegador y el aviso volverá a aparecer.
        </p>
        <p>
          También puedes bloquear o eliminar cookies en cualquier momento
          desde la configuración de tu navegador (Chrome, Firefox, Safari,
          Edge), aunque esto puede afectar a algunas funciones de esta u
          otras webs.
        </p>
      </LegalSection>

      <LegalSection heading="Más información">
        <p>
          Para saber qué hacemos con los datos que recogemos a través de
          estas cookies o de los formularios, consulta la{" "}
          <Link href="/privacidad">Política de Privacidad</Link> de {SITE_NAME}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
