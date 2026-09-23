"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { trackLead } from "@/lib/leads";
import { submitToWeb3Forms } from "@/lib/web3forms";

const DRAFT_KEY = "mk_contact_draft";

interface Draft {
  email: string;
  message: string;
}

export function Contact() {
  const t = useTranslations("contact");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  // Restaura el borrador guardado (si lo hay) al montar, para no perder lo
  // escrito si se cierra la pestaña o se navega por error.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft: Draft = JSON.parse(raw);
      // Sincroniza con localStorage (sistema externo) solo tras el montaje.
      /* eslint-disable react-hooks/set-state-in-effect */
      if (draft.email) setEmail(draft.email);
      if (draft.message) setMessage(draft.message);
      /* eslint-enable react-hooks/set-state-in-effect */
    } catch {
      // Sin localStorage disponible o JSON corrupto: se empieza en blanco.
    }
  }, []);

  useEffect(() => {
    if (status === "sent") return;
    try {
      if (!email && !message) {
        localStorage.removeItem(DRAFT_KEY);
        return;
      }
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ email, message }));
    } catch {
      // Persistencia best-effort: si falla, simplemente no hay autosave.
    }
  }, [email, message, status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await submitToWeb3Forms({
        email,
        subject: "Nuevo contacto — URPA Academy Software",
        message,
      });
      trackLead("contact_form");
      setStatus("sent");
      setEmail("");
      setMessage("");
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // No crítico: el borrador quedará vacío en la próxima visita igual.
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t("genericError"));
    }
  };

  return (
    <section id="contacto" className="bg-brand-black-soft py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-14 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <Reveal variant="slide-right" className="flex flex-col">
            <h2 className="font-display text-balance text-4xl uppercase leading-[0.95] tracking-tight text-brand-white sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-sm text-balance text-base leading-relaxed text-brand-gray sm:text-lg">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div className="border-l-2 border-brand-yellow py-2 pl-6">
                <p className="text-lg font-bold text-brand-white">
                  {t("sentTitle")}
                </p>
                <p className="mt-2 text-sm text-brand-gray">
                  {t("sentDescription")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-brand-gray"
                  >
                    {t("emailLabel")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="h-11 w-full border border-white/15 bg-brand-black px-4 text-sm text-brand-white outline-none placeholder:text-brand-gray/60 focus:border-brand-yellow"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-brand-gray"
                  >
                    {t("messageLabel")}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("messagePlaceholder")}
                    className="w-full resize-none border border-white/15 bg-brand-black px-4 py-3 text-sm text-brand-white outline-none placeholder:text-brand-gray/60 focus:border-brand-yellow"
                  />
                </div>
                {error ? <p className="text-xs text-red-400">{error}</p> : null}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 bg-brand-yellow text-sm font-semibold text-brand-black transition-colors hover:bg-brand-yellow-dim disabled:opacity-60"
                >
                  {status === "loading" ? t("submitting") : t("submit")}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
