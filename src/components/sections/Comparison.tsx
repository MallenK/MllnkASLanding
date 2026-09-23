import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface ComparisonRow {
  label: string;
  before: string;
  after: string;
}

export function Comparison() {
  const t = useTranslations("comparison");
  const rows = t.raw("rows") as ComparisonRow[];

  return (
    <section id="comparativa" className="bg-brand-black-soft py-24 sm:py-32">
      <Container>
        <SectionHeading title={t("title")} description={t("description")} />

        <div className="mt-14 overflow-hidden border border-white/10">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-[1fr_1.3fr_1.3fr] sm:divide-y-0 sm:divide-x">
            <div className="hidden bg-white/[0.03] px-6 py-4 sm:block" aria-hidden="true" />
            <div className="hidden items-center gap-2 bg-white/[0.03] px-6 py-4 sm:flex">
              <XMarkIcon aria-hidden="true" className="h-4 w-4 text-brand-gray" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gray">
                {t("before")}
              </span>
            </div>
            <div className="hidden items-center gap-2 bg-brand-yellow/10 px-6 py-4 sm:flex">
              <CheckIcon aria-hidden="true" className="h-4 w-4 text-brand-yellow" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-yellow">
                {t("after")}
              </span>
            </div>
          </div>

          {rows.map((row, index) => (
            <Reveal
              key={row.label}
              delay={index * 0.05}
              className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 sm:grid-cols-[1fr_1.3fr_1.3fr] sm:divide-y-0 sm:divide-x sm:border-t-0"
            >
              <div className="px-6 py-5">
                <h3 className="text-sm font-bold text-brand-white">
                  {row.label}
                </h3>
              </div>
              <div className="flex items-start gap-2 px-6 py-5">
                <XMarkIcon
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-white/25 sm:hidden"
                />
                <p className="text-sm leading-relaxed text-brand-gray">
                  {row.before}
                </p>
              </div>
              <div className="flex items-start gap-2 px-6 py-5">
                <CheckIcon
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow sm:hidden"
                />
                <p className="text-sm leading-relaxed text-brand-white">
                  {row.after}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
