"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/shared/Container";
import { buttonVariants } from "@/components/ui/button";
import { DEMO_URL, NAV_LINKS, SITE_SHORT_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-colors duration-300",
        scrolled
          ? "border-white/10 bg-brand-black/90"
          : "border-transparent bg-brand-black/40",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#inicio" className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold tracking-tight text-brand-white sm:text-xl">
            {SITE_SHORT_NAME}
            <span className="text-brand-yellow">.</span>
          </span>
          <span className="hidden text-xs font-medium tracking-wide text-brand-gray sm:inline">
            Academy Software
          </span>
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-6 xl:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-gray transition-colors hover:text-brand-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-gray transition-colors hover:text-brand-white"
          >
            Iniciar sesión
          </a>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-10 gap-1.5 bg-brand-yellow px-5 font-semibold text-brand-black hover:bg-brand-yellow-dim",
            )}
          >
            Explorar demo en vivo
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-white xl:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/5 bg-brand-black xl:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 text-base font-medium text-brand-gray transition-colors hover:bg-white/5 hover:text-brand-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-2 h-10 gap-1.5 bg-brand-yellow px-5 font-semibold text-brand-black hover:bg-brand-yellow-dim",
                )}
              >
                Explorar demo en vivo
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
