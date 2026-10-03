import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const OG_LOCALES: Record<string, string> = {
  es: "es_ES",
  en: "en_GB",
  ca: "ca_ES",
};

// Metadata "base" compartida por los dos layouts raíz ([locale] y (legal)).
// Cada página puede sobrescribir title/description/openGraph; por eso aquí
// se fijan también type, siteName y card, que Next no hereda si la página
// define su propio openGraph/twitter.
export async function baseMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: t.raw("keywords") as string[],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale] ?? "es_ES",
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Verificación gratuita de Google Search Console: cuando crees la
    // propiedad, pega aquí el código que te da la opción "etiqueta HTML"
    // (no hace falta acceso a DNS, funciona igual en un subdominio vercel.app).
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      // Bing Webmaster Tools (etiqueta meta). Para cambiarlo sin tocar código:
      // NEXT_PUBLIC_BING_SITE_VERIFICATION en Vercel. El archivo
      // public/BingSiteAuth.xml es el método alternativo de verificación.
      other: {
        "msvalidate.01":
          process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
          "AAA8467CB417C37971716E785B1D851C",
      },
    },
  };
}
