import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/shared/LegalLayout";
import { DEMO_URL, LEGAL, SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso de la web y de la demo en vivo de " + SITE_NAME + ".",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Términos y Condiciones">
      <LegalSection heading="Identificación (aviso legal)">
        <p>
          En cumplimiento del deber de información de la Ley 34/2002, de
          Servicios de la Sociedad de la Información y de Comercio
          Electrónico (LSSI-CE), se identifica al titular de este sitio web:
        </p>
        <ul>
          <li>
            <strong>Titular:</strong> {LEGAL.responsibleName}
          </li>
          {LEGAL.taxId ? (
            <li>
              <strong>NIF/CIF:</strong> {LEGAL.taxId}
            </li>
          ) : null}
          <li>
            <strong>Domicilio:</strong> {LEGAL.address}
          </li>
          <li>
            <strong>Sitio web:</strong> {SITE_URL}
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Objeto">
        <p>
          Estos términos regulan el acceso y uso de esta web, incluida la
          demo en vivo de la plataforma a la que se accede desde{" "}
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
            {DEMO_URL}
          </a>
          . El acceso a esta web te atribuye la condición de usuario y
          supone la aceptación de estos términos.
        </p>
      </LegalSection>

      <LegalSection heading="La demo en vivo">
        <p>
          La demo es un entorno de prueba con datos ficticios, pensado para
          que explores cómo funciona la plataforma antes de decidir si
          migrar tu academia. No representa un compromiso contractual ni un
          acceso a producción: es un escaparate funcional del producto real.
        </p>
        <p>
          El acceso a la demo puede requerir dejar un email, usado
          exclusivamente según se describe en la{" "}
          <Link href="/privacidad">Política de Privacidad</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="Propiedad intelectual">
        <p>
          Los contenidos de esta web (textos, diseño, código, marca e
          imágenes) son propiedad de {LEGAL.responsibleName} o se usan con
          la debida autorización. No está permitida su reproducción total o
          parcial sin consentimiento previo por escrito.
        </p>
      </LegalSection>

      <LegalSection heading="Exclusión de responsabilidad">
        <p>
          Se hacen esfuerzos razonables para que la información de esta web
          sea correcta y esté actualizada, pero no se garantiza la ausencia
          de errores ni la disponibilidad ininterrumpida del sitio o de la
          demo en vivo, que puede estar sujeta a mantenimiento.
        </p>
      </LegalSection>

      <LegalSection heading="Contratación del servicio real">
        <p>
          La contratación de la plataforma para tu academia no se realiza a
          través de esta web, sino de forma directa tras el contacto
          iniciado desde el formulario. Las condiciones específicas del
          servicio (alcance, soporte, migración de datos) se acuerdan de
          forma individual con cada academia antes de empezar.
        </p>
      </LegalSection>

      <LegalSection heading="Legislación aplicable">
        <p>
          Estos términos se rigen por la legislación española. Para
          cualquier controversia derivada del uso de esta web, las partes se
          someten a los juzgados y tribunales que correspondan según la
          normativa aplicable.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
