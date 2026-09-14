import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DEMO_URL, STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative bg-brand-black-soft py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Cómo funciona"
          title="De curiosear la demo a operar en producción"
          description="Sin implementaciones eternas ni comerciales de por medio: empiezas probando tú mismo."
        />

        <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block"
          />
          {STEPS.map((step, index) => (
            <Reveal
              key={step.number}
              delay={index * 0.12}
              className="relative flex flex-col items-start gap-4"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-brand-black text-xl font-extrabold text-brand-yellow">
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-brand-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-gray">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow transition-colors hover:text-brand-yellow-dim"
          >
            Empezar por el paso 01: abrir la demo
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
