"use client";

import { useSyncExternalStore } from "react";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Los botones flotantes (WhatsApp, volver arriba) necesitan subir su
 * posición mientras el banner de cookies ocupa la franja inferior de la
 * pantalla, o quedan completamente tapados y sin poder pulsarse.
 */
export function useCookieBannerVisible() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  return consent === null;
}
