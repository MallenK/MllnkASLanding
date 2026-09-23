import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GatedDemoButton } from "@/components/shared/GatedDemoButton";
import { STEP_NUMBERS } from "@/lib/constants";

interface StepCopy {
  title: string;
  description: string;
}

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as StepCopy[];

  return (
    <section
      id="como-funciona"
      className="relative bg-brand-black-soft py-24 sm:py-32"
    >
      <Container>
        <SectionHeading title={t("title")} description={t("description")} />

        <div className="mt-4 grid grid-cols-1 divide-y divide-white/10 border-b border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map((step, index) => (
            <Reveal
              key={STEP_NUMBERS[index] ?? index}
              delay={index * 0.1}
              className="relative flex flex-col gap-3 py-9 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <span
                aria-hidden="true"
                className="font-display pointer-events-none select-none text-6xl leading-none text-brand-yellow/15 sm:text-7xl"
              >
                {STEP_NUMBERS[index]}
              </span>
              <h3 className="font-display -mt-2 text-2xl uppercase leading-none tracking-tight text-brand-white sm:text-3xl">
                {step.title}
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-brand-gray">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <GatedDemoButton className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow transition-colors hover:text-brand-yellow-dim">
            {t("cta", { number: STEP_NUMBERS[0] })}
            <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" />
          </GatedDemoButton>
        </Reveal>
      </Container>
    </section>
  );
}
