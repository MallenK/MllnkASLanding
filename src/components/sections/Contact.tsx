"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { submitToWeb3Forms } from "@/lib/web3forms";

export function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await submitToWeb3Forms({
        email,
        subject: "Nuevo contacto — Mallen'k Academy Software",
        message,
      });
      setStatus("sent");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "No se pudo enviar. Inténtalo de nuevo.",
      );
    }
  };

  return (
    <section id="contacto" className="bg-brand-black-soft py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-14 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <Reveal variant="slide-right" className="flex flex-col">
            <h2 className="font-display text-balance text-4xl uppercase leading-[0.95] tracking-tight text-brand-white sm:text-5xl">
              Escríbeme directamente
            </h2>
            <p className="mt-5 max-w-sm text-balance text-base leading-relaxed text-brand-gray sm:text-lg">
              Sin comerciales ni formularios que se pierden en un CRM: el
              mensaje me llega a mí y te respondo yo mismo.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div className="border-l-2 border-brand-yellow py-2 pl-6">
                <p className="text-lg font-bold text-brand-white">
                  Mensaje enviado
                </p>
                <p className="mt-2 text-sm text-brand-gray">
                  Gracias — te responderé al email que has dejado en cuanto
                  lo lea.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-brand-gray"
                  >
                    Tu email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="h-11 w-full border border-white/15 bg-brand-black px-4 text-sm text-brand-white outline-none placeholder:text-brand-gray/60 focus:border-brand-yellow"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-brand-gray"
                  >
                    Cuéntame sobre tu academia
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Qué tipo de academia llevas, cuántos alumnos, qué usas ahora mismo..."
                    className="w-full resize-none border border-white/15 bg-brand-black px-4 py-3 text-sm text-brand-white outline-none placeholder:text-brand-gray/60 focus:border-brand-yellow"
                  />
                </div>
                {error ? <p className="text-xs text-red-400">{error}</p> : null}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 bg-brand-yellow text-sm font-semibold text-brand-black transition-colors hover:bg-brand-yellow-dim disabled:opacity-60"
                >
                  {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
