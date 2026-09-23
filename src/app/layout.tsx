import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Montserrat, Oswald } from "next/font/google";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import { DEMO_URL, ORGANIZATION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Metadata "base" del sitio: se usa tal cual en las páginas que quedan
// fuera del árbol [locale] (legales, 404), y como fallback antes de que
// generateMetadata de [locale]/page.tsx la sobrescriba con la versión
// traducida correspondiente. Usa un locale explícito ("es"), no el de la
// petición, para que este layout se mantenga estático (ver [locale]/layout.tsx
// para la parte dinámica por idioma).
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "es", namespace: "meta" });
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
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: SITE_URL,
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
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: ORGANIZATION.name,
      legalName: ORGANIZATION.legalName,
      url: SITE_URL,
      ...(ORGANIZATION.founder
        ? {
            founder: {
              "@type": "Person",
              name: ORGANIZATION.founder,
              url: ORGANIZATION.founderUrl,
            },
          }
        : {}),
      foundingLocation: ORGANIZATION.foundingLocation,
      sameAs: SOCIAL_LINKS.map((link) => link.href),
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      sameAs: [DEMO_URL],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${oswald.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-black font-sans antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 bg-brand-yellow px-4 py-2 text-sm font-semibold text-brand-black transition-transform focus:translate-y-0"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
