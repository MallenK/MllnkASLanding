import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootShell, viewportConfig } from "@/components/shared/RootShell";
import { baseMetadata } from "@/lib/site-metadata";

// Páginas legales: solo en español, sin prefijo de idioma.
export function generateMetadata(): Promise<Metadata> {
  return baseMetadata("es");
}

export const viewport: Viewport = viewportConfig;

export default function LegalRootLayout({ children }: { children: ReactNode }) {
  return (
    <RootShell lang="es" skipLabel="Saltar al contenido principal">
      {children}
    </RootShell>
  );
}
