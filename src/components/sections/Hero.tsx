"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/shared/Container";
import { ProductMock } from "@/components/shared/ProductMock";
import { Parallax } from "@/components/shared/Parallax";
import { GatedDemoButton } from "@/components/shared/GatedDemoButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-black pt-32 pb-24 sm:pt-40 sm:pb-28"
    >
      <div className="bg-pitch absolute inset-0" aria-hidden="true" />
      <div className="bg-noise absolute inset-0 opacity-30" aria-hidden="true" />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col items-start text-left">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-5xl uppercase leading-[0.92] tracking-tight text-brand-white sm:text-6xl md:text-7xl"
          >
            {t("titleLine1")}
            {" "}
            <span className="text-brand-yellow">{t("titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-brand-gray sm:text-lg"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <GatedDemoButton
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 gap-2 bg-brand-yellow px-7 text-base font-semibold text-brand-black hover:bg-brand-yellow-dim",
              )}
            >
              {t("ctaPrimary")}
              <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
            </GatedDemoButton>
            <a
              href="#historia"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 gap-2 border-white/15 bg-transparent px-7 text-base font-semibold text-brand-white hover:bg-white/5",
              )}
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-brand-gray sm:flex-row sm:items-center sm:gap-5"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" aria-hidden="true" />
              {t("badgeLive")}
            </span>
            <span className="hidden sm:inline">·</span>
            <span>{t("badgeEmail")}</span>
            <span className="hidden sm:inline">·</span>
            <span>{t("badgeBot")}</span>
          </motion.div>
        </div>

        <Parallax offset={20} className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="corner-cut-lg absolute -inset-3 -z-10 bg-brand-yellow/90" aria-hidden="true" />
            <ProductMock alt={t("mockAlt")} />
          </motion.div>
        </Parallax>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative mt-16 flex flex-col items-center gap-2 text-brand-gray"
        aria-hidden="true"
      >
        <span className="text-[11px] uppercase tracking-[0.3em]">{t("scrollHint")}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
