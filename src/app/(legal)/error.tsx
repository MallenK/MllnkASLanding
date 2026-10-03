"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-6 py-24 text-center">
      <Container className="flex flex-col items-center">
        <Logo variant="stacked" />
        <h1 className="mt-10 font-display text-balance text-3xl uppercase leading-[0.95] tracking-tight text-brand-white sm:text-4xl">
          Algo ha fallado
        </h1>
        <p className="mt-4 max-w-sm text-balance text-sm leading-relaxed text-brand-gray sm:text-base">
          Ha ocurrido un error inesperado. Puedes intentarlo de nuevo o
          volver al inicio.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center bg-brand-yellow px-6 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-yellow-dim"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center border border-white/15 px-6 text-sm font-semibold text-brand-white transition-colors hover:bg-white/5"
          >
            Volver al inicio
          </Link>
        </div>
      </Container>
    </main>
  );
}
