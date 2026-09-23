import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}`]),
  );

  const localeEntries: MetadataRoute.Sitemap = routing.locales.map((loc) => ({
    url: `${SITE_URL}/${loc}`,
    lastModified,
    changeFrequency: "weekly",
    priority: loc === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: { ...languages, "x-default": `${SITE_URL}/es` },
    },
  }));

  return [
    ...localeEntries,
    {
      url: `${SITE_URL}/privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terminos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
