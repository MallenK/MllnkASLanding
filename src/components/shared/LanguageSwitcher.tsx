"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.08em]", className)}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? "true" : undefined}
          className={cn(
            "rounded-sm px-1.5 py-1 transition-colors",
            loc === locale
              ? "text-brand-yellow"
              : "text-brand-gray hover:text-brand-white",
          )}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
