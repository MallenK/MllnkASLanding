import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { RootShell, viewportConfig } from "@/components/shared/RootShell";
import { LocaleProviders } from "@/components/shared/LocaleProviders";
import { GlobalWidgets } from "@/components/shared/GlobalWidgets";
import { baseMetadata } from "@/lib/site-metadata";

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return baseMetadata(locale);
}

export const viewport: Viewport = viewportConfig;

export default async function LocaleLayout({
  children,
  params,
}: { children: ReactNode } & LocaleParams) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Debe llamarse antes que getMessages()/getTranslations() de esta misma
  // petición: así next-intl sabe que el locale viene de un parámetro
  // estático (generateStaticParams) y puede seguir prerrenderizando la
  // página en build time en vez de forzar SSR dinámico en cada visita.
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <RootShell lang={locale} skipLabel={t("skipToContent")}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <LocaleProviders>{children}</LocaleProviders>
        <GlobalWidgets />
      </NextIntlClientProvider>
    </RootShell>
  );
}
