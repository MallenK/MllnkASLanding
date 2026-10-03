import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/shared/LegalLayout";
import { LEGAL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo se recogen, usan y protegen los datos personales en la web de " +
    SITE_NAME + ".",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Política de Privacidad">
      <LegalSection heading="Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales recogidos a
          través de esta web es <strong>{LEGAL.responsibleName}</strong>,
          con domicilio en {LEGAL.address}.
        </p>
        <p>
          {LEGAL.contactEmail
            ? `Puedes contactar por email en ${LEGAL.contactEmail}.`
            : "Puedes contactar a través del formulario de contacto disponible en esta misma web."}
        </p>
      </LegalSection>

      <LegalSection heading="Qué datos recogemos">
        <p>Esta web recoge datos personales en dos puntos concretos:</p>
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> tu dirección de email y
            el mensaje que escribas.
          </li>
          <li>
            <strong>Acceso a la demo en vivo:</strong> tu dirección de email,
            para poder abrirte la demo y, si lo autorizas implícitamente al
            enviarlo, avisarte de novedades o ayudarte con una migración.
          </li>
        </ul>
        <p>
          No se recogen datos de pago, ni datos de categoría especial, ni se
          crean perfiles automatizados con estos datos.
        </p>
      </LegalSection>

      <LegalSection heading="Con qué finalidad los tratamos">
        <ul>
          <li>Responder a tu consulta o solicitud de contacto.</li>
          <li>Darte acceso a la demo en vivo de la plataforma.</li>
          <li>
            Enviarte, únicamente si nos escribes, información relacionada con
            tu consulta o con la migración de tu academia a la plataforma.
          </li>
        </ul>
        <p>
          No se cede tu email a terceros para fines comerciales ni se utiliza
          para enviar comunicaciones no solicitadas.
        </p>
      </LegalSection>

      <LegalSection heading="Base legal">
        <p>
          El tratamiento se basa en tu consentimiento, otorgado al rellenar
          voluntariamente el formulario de contacto o el formulario de
          acceso a la demo (art. 6.1.a RGPD).
        </p>
      </LegalSection>

      <LegalSection heading="Con quién compartimos los datos">
        <p>
          Los formularios de esta web se procesan a través de{" "}
          <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer">
            Web3Forms
          </a>
          , un proveedor externo que actúa como encargado del tratamiento
          para el envío de los mensajes por email. No se comparten datos con
          ningún otro tercero.
        </p>
        <p>
          Además, si aceptas las cookies de analítica en el aviso de
          cookies, se usa Google Analytics para medir el uso agregado de la
          web (ver{" "}
          <Link href="/cookies">Política de Cookies</Link>
          {" "}para más detalle).
        </p>
      </LegalSection>

      <LegalSection heading="Cuánto tiempo conservamos los datos">
        <p>
          Los datos de contacto se conservan mientras sea necesario para
          atender tu consulta y, como máximo, durante los plazos legalmente
          exigibles. Puedes solicitar su eliminación en cualquier momento
          (ver el apartado de derechos, más abajo).
        </p>
      </LegalSection>

      <LegalSection heading="Tus derechos">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión,
          oposición, limitación del tratamiento y portabilidad escribiendo a
          través del formulario de contacto de esta web
          {LEGAL.contactEmail ? ` o a ${LEGAL.contactEmail}` : ""}. También
          tienes derecho a presentar una reclamación ante la Agencia
          Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>
          ) si consideras que el tratamiento no se ajusta a la normativa.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
