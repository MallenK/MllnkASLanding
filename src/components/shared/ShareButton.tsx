"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpOnSquareIcon, CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export function ShareButton({ className }: { className?: string }) {
  const t = useTranslations("footer");
  const tMeta = useTranslations("meta");
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: SITE_NAME,
      text: tMeta("title"),
      url: SITE_URL,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // El usuario canceló el diálogo nativo: no es un error a mostrar.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin API de portapapeles disponible: no hay fallback razonable más.
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm text-brand-gray transition-colors hover:text-brand-white",
        className,
      )}
    >
      {copied ? (
        <>
          <CheckIcon aria-hidden="true" className="h-4 w-4 text-brand-yellow" />
          {t("shareCopied")}
        </>
      ) : (
        <>
          <ArrowUpOnSquareIcon aria-hidden="true" className="h-4 w-4" />
          {t("share")}
        </>
      )}
    </button>
  );
}
