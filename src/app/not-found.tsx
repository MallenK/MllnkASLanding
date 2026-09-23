import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-6 py-24 text-center">
      <Container className="flex flex-col items-center">
        <Logo variant="stacked" />
        <p className="mt-10 font-display text-8xl leading-none text-brand-yellow sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-balance text-3xl uppercase leading-[0.95] tracking-tight text-brand-white sm:text-4xl">
          Esta página no existe
        </h1>
        <p className="mt-4 max-w-sm text-balance text-sm leading-relaxed text-brand-gray sm:text-base">
          Puede que el enlace esté roto o que la página se haya movido.
          Vuelve al inicio para seguir explorando.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center bg-brand-yellow px-6 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-yellow-dim"
        >
          Volver al inicio
        </Link>
      </Container>
    </main>
  );
}
