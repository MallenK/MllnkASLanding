import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { DemoGateProvider } from "@/components/shared/DemoGate";
import { GlobalWidgets } from "@/components/shared/GlobalWidgets";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/shared/Container";
import { LEGAL } from "@/lib/constants";
import esMessages from "../../../messages/es.json";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export function LegalLayout({ eyebrow, title, children }: LegalLayoutProps) {
  // Estas páginas son siempre en español (fuera del árbol [locale]); fijar
  // el locale aquí evita que next-intl tenga que leer la negociación de
  // idioma de la petición, lo que forzaría renderizado dinámico en vez de
  // prerenderizar estas páginas estáticas en build time.
  setRequestLocale("es");

  return (
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <DemoGateProvider>
        <Header locale="es" showLanguageSwitcher={false} />
        <main
          id="main-content"
          className="flex-1 bg-brand-black pt-32 pb-24 sm:pt-40 sm:pb-28"
        >
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-yellow">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-balance text-4xl uppercase leading-[0.95] tracking-tight text-brand-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-brand-gray">
              Última actualización: {LEGAL.lastUpdated}
            </p>

            <div className="mt-12 flex max-w-3xl flex-col gap-10">
              {children}
            </div>
          </Container>
        </main>
        <Footer locale="es" />
      </DemoGateProvider>
      <GlobalWidgets />
    </NextIntlClientProvider>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl uppercase tracking-tight text-brand-white sm:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-brand-gray [&_a]:underline [&_a]:decoration-brand-yellow [&_a]:underline-offset-2 [&_a:hover]:text-brand-white [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-brand-white">
        {children}
      </div>
    </section>
  );
}
