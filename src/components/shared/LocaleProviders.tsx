"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

// MotionConfig hace que las animaciones de motion respeten
// prefers-reduced-motion (el CSS solo cubre animaciones CSS).
export function LocaleProviders({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
