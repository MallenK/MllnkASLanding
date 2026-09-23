"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  setConsent,
  subscribeConsent,
} from "@/lib/consent";

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const visible = consent === null;

  const handle = (value: "accepted" | "rejected") => {
    setConsent(value);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Aviso de cookies"
          aria-describedby="cookie-consent-text"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-brand-black-soft/95 backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p
              id="cookie-consent-text"
              className="text-sm leading-relaxed text-brand-gray"
            >
              {t.rich("text", {
                link: (chunks) => (
                  <Link
                    href="/cookies"
                    className="underline decoration-brand-yellow underline-offset-2 hover:text-brand-white"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => handle("rejected")}
                className="h-10 whitespace-nowrap border border-white/15 px-4 text-sm font-semibold text-brand-white transition-colors hover:bg-white/5"
              >
                {t("reject")}
              </button>
              <button
                type="button"
                onClick={() => handle("accepted")}
                className="h-10 whitespace-nowrap bg-brand-yellow px-4 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-yellow-dim"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
