import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { GatedDemoButton } from "@/components/shared/GatedDemoButton";
import { ShareButton } from "@/components/shared/ShareButton";
import {
  CONTACT_EMAIL,
  NAV_SECTIONS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_SHORT_NAME,
  SOCIAL_LINKS,
} from "@/lib/constants";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");

  const legalLinks = [
    { label: tf("legalPrivacy"), href: "/privacidad" },
    { label: tf("legalTerms"), href: "/terminos" },
    { label: tf("legalCookies"), href: "/cookies" },
  ];

  return (
    <footer className="border-t border-white/5 bg-brand-black">
      <Container className="flex flex-col gap-10 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="stacked" />
            <p className="mt-4 text-sm text-brand-gray">{tf("description")}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-white">
                {tf("productHeading")}
              </h3>
              <ul className="mt-3 space-y-2">
                {NAV_SECTIONS.map((section) => (
                  <li key={section.slug}>
                    <a
                      href={`/${locale}#${section.slug}`}
                      className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                    >
                      {t(section.key)}
                    </a>
                  </li>
                ))}
                <li>
                  <GatedDemoButton className="text-sm text-brand-gray transition-colors hover:text-brand-white">
                    {tf("demo")}
                  </GatedDemoButton>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-white">
                {tf("legalHeading")}
              </h3>
              <ul className="mt-3 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                    >
                      {link.label}
                      {locale !== "es" ? (
                        <span className="ml-1 text-brand-gray/60">
                          {tf("legalEsOnlyHint")}
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-white">
                {tf("contactHeading")}
              </h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 pt-6 text-sm text-brand-gray sm:flex-row sm:items-center sm:justify-between">
          <p>
            {tf("copyright", {
              year: new Date().getFullYear(),
              siteName: `${SITE_SHORT_NAME} Academy Software`,
            })}
          </p>
          <div className="flex items-center gap-5">
            <p>{tf("builtBy")}</p>
            <ShareButton />
          </div>
        </div>
      </Container>
    </footer>
  );
}
