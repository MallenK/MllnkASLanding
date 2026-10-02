import { ArrowRightIcon, GlobeAltIcon, DevicePhoneMobileIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GatedDemoButton } from "@/components/shared/GatedDemoButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICONS = [GlobeAltIcon, DevicePhoneMobileIcon, RocketLaunchIcon];

interface ServiceItem {
  title: string;
  description: string;
}

export function WebServices() {
  const t = useTranslations("webServices");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="webs" className="bg-brand-black py-24 sm:py-32">
      <Container>
        <SectionHeading title={t("title")} description={t("description")} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-brand-yellow/30">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-yellow/10">
                    <Icon className="h-5 w-5 text-brand-yellow" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="fade-up" className="mt-10 text-center">
          <p className="mb-6 text-sm text-brand-gray">
            {t("combo")}
          </p>
          <GatedDemoButton
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 gap-2 border-brand-yellow/30 px-7 text-base font-semibold text-brand-yellow hover:bg-brand-yellow/10",
            )}
          >
            {t("cta")}
            <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
          </GatedDemoButton>
        </Reveal>
      </Container>
    </section>
  );
}
