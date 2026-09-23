"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DEMO_URL } from "@/lib/constants";
import { trackLead } from "@/lib/leads";
import { submitToWeb3Forms } from "@/lib/web3forms";

const STORAGE_KEY = "mk_demo_access";

interface DemoGateContextValue {
  requestDemoAccess: () => void;
}

const DemoGateContext = createContext<DemoGateContextValue | null>(null);

export function useDemoGate() {
  const ctx = useContext(DemoGateContext);
  if (!ctx) {
    throw new Error("useDemoGate debe usarse dentro de <DemoGateProvider>");
  }
  return ctx;
}

function openDemo() {
  window.open(DEMO_URL, "_blank", "noopener,noreferrer");
}

export function DemoGateProvider({ children }: { children: ReactNode }) {
  const t = useTranslations("demoGate");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const requestDemoAccess = useCallback(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        openDemo();
        return;
      }
    } catch {
      // localStorage no disponible: seguimos pidiendo el correo igualmente
    }
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen((wasOpen) => {
      if (!wasOpen) return wasOpen;
      setError("");
      setStatus("idle");
      return false;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await submitToWeb3Forms({
        email,
        subject: "Nuevo acceso a la demo — URPA Academy Software",
        message: "Alguien ha solicitado acceso a la demo en vivo desde la landing.",
      });
      trackLead("demo_gate");
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // per-viewer conveniencia: si falla, simplemente se le volverá a pedir la próxima vez
      }
      openDemo();
      setOpen(false);
      setEmail("");
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t("genericError"));
    }
  };

  return (
    <DemoGateContext.Provider value={{ requestDemoAccess }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-gate-title"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="corner-cut w-full max-w-sm border border-white/10 bg-brand-black-soft p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h2
                  id="demo-gate-title"
                  className="text-lg font-bold text-brand-white"
                >
                  {t("title")}
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label={t("close")}
                  className="-mr-1 -mt-1 rounded-md p-1 text-brand-gray hover:text-brand-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-brand-gray">{t("description")}</p>

              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                <label htmlFor="demo-gate-email" className="sr-only">
                  Email
                </label>
                <input
                  id="demo-gate-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  autoFocus
                  className="h-11 border border-white/15 bg-brand-black px-4 text-sm text-brand-white outline-none placeholder:text-brand-gray/60 focus:border-brand-yellow"
                />
                {error ? <p className="text-xs text-red-400">{error}</p> : null}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 bg-brand-yellow text-sm font-semibold text-brand-black transition-colors hover:bg-brand-yellow-dim disabled:opacity-60"
                >
                  {status === "loading" ? t("submitting") : t("submit")}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DemoGateContext.Provider>
  );
}
