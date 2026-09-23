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
            "fixed left-3 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow ring-2 ring-brand-black transition-transform hover:scale-105 sm:left-5 sm:h-12 sm:w-12",
            bannerVisible ? "bottom-36 sm:bottom-28" : "bottom-4 sm:bottom-5",
          )}
        >
          <ChevronUpIcon aria-hidden="true" className="h-5 w-5 text-brand-black" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
