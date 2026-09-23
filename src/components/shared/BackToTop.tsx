"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useCookieBannerVisible } from "@/lib/useCookieBannerVisible";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const t = useTranslations("backToTop");
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const bannerVisible = useCookieBannerVisible();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 700);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={t("ariaLabel")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow ring-4 ring-brand-black transition-transform hover:scale-105 sm:left-6 sm:h-14 sm:w-14",
            bannerVisible ? "bottom-40 sm:bottom-32" : "bottom-20 sm:bottom-24",
          )}
        >
          <ChevronUpIcon aria-hidden="true" className="h-6 w-6 text-brand-black" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
