"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
} from "@/lib/consent";
import { leadMethodFromHref, trackLead } from "@/lib/leads";

const GA_MEASUREMENT_ID = "G-BNMNF931TY";

export function Analytics() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  const accepted = consent === "accepted";

  // Clics en WhatsApp, email y teléfono = lead. Un único listener delegado
  // cubre botón flotante, footer y cualquier enlace futuro.
  useEffect(() => {
    if (!accepted) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const method = link && leadMethodFromHref(link.getAttribute("href") ?? "");
      if (method) trackLead(method);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [accepted]);

  if (!accepted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
