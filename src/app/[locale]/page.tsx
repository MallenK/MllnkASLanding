import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { DemoGateProvider } from "@/components/shared/DemoGate";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Features } from "@/components/sections/Features";
import { Comparison } from "@/components/sections/Comparison";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTASection } from "@/components/sections/CTASection";
import { WebServices } from "@/components/sections/WebServices";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import { OG_LOCALES } from "@/lib/site-metadata";

const SITE_IMAGE_ALT = `${SITE_NAME} — ${SITE_TAGLINE}`;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}`]),
  );

  const title = t("title");
  const description = t("description");

  return {
    // absolute: el título ya lleva la marca; evita que el template del
    // layout raíz le añada "| URPA Academy Software" otra vez.
    title: { absolute: title },
    description,
    keywords: t.raw("keywords") as string[],
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": `${SITE_URL}/es` },
    },
    // Next no fusiona openGraph/twitter con los del layout: se repiten aquí
    // type, siteName y card para no perderlos.
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALES[locale] ?? "es_ES",
      url: `${SITE_URL}/${locale}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: SITE_NAME,
    description: t("description"),
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <DemoGateProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <ScrollProgressBar />
      <Header locale={locale} />
      <main id="main-content" className="flex-1">
        <Hero />
        <Story />
        <Features />
        <Comparison />
        <HowItWorks />
        <SocialProof />
        <CTASection />
        <WebServices />
        <FAQ />
        <Contact />
      </main>
      <Footer locale={locale} />
    </DemoGateProvider>
  );
}
