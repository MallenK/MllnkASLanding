"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

// El <html lang> del layout raíz es fijo ("es") para no forzar renderizado
// dinámico; aquí se ajusta al idioma real para lectores de pantalla y
// traductores del navegador. MotionConfig hace que las animaciones de
// motion respeten prefers-reduced-motion (el CSS solo cubre animaciones CSS).
export function LocaleProviders({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
