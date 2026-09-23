import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LocaleProviders } from "@/components/shared/LocaleProviders";
import { GlobalWidgets } from "@/components/shared/GlobalWidgets";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleProviders locale={locale}>{children}</LocaleProviders>
      <GlobalWidgets />
    </NextIntlClientProvider>
  );
}
