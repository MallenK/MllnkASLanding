import type { ReactNode } from "react";
import { Montserrat, Oswald } from "next/font/google";
import "@/app/globals.css";
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

function buildJsonLd(lang: string) {
  return {
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
        inLanguage: lang,
        sameAs: [DEMO_URL],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

// Cuerpo común de los layouts raíz. Hay dos (app/[locale] y app/(legal)) para
// que <html lang> sea el idioma real de cada página ya en el HTML servido,
// sin depender de JavaScript ni forzar renderizado dinámico.
export function RootShell({
  lang,
  skipLabel,
  children,
}: {
  lang: string;
  skipLabel: string;
  children: ReactNode;
}) {
  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${oswald.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-black font-sans antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 bg-brand-yellow px-4 py-2 text-sm font-semibold text-brand-black transition-transform focus:translate-y-0"
        >
          {skipLabel}
        </a>
        {children}
      </body>
    </html>
  );
}

export const viewportConfig = {
  themeColor: "#111111",
  colorScheme: "dark",
} as const;
