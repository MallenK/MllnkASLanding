"use client";

import { useTranslations } from "next-intl";
import { WHATSAPP_URL } from "@/lib/constants";
import { useCookieBannerVisible } from "@/lib/useCookieBannerVisible";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const bannerVisible = useCookieBannerVisible();

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("ariaLabel")}
      className={cn(
        "group fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] ring-4 ring-brand-black transition-[transform,bottom] hover:scale-105 sm:right-6 sm:h-14 sm:w-14",
        bannerVisible ? "bottom-40 sm:bottom-32" : "bottom-20 sm:bottom-24",
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 text-white sm:h-7 sm:w-7"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2.002c-5.514 0-9.99 4.475-9.99 9.988 0 1.762.464 3.484 1.346 4.999l-1.43 5.222a1 1 0 0 0 1.225 1.225l5.222-1.43a9.958 9.958 0 0 0 4.627 1.153c5.514 0 9.99-4.475 9.99-9.988s-4.476-9.988-9.99-9.988zm.001 18.148a8.14 8.14 0 0 1-4.145-1.132l-.298-.176-3.099.849.849-3.099-.176-.298a8.148 8.148 0 0 1-1.132-4.145c0-4.508 3.669-8.176 8.171-8.176s8.171 3.668 8.171 8.176-3.669 8.176-8.171 8.176z" />
      </svg>
    </a>
  );
}
