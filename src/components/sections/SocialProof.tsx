import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { PROOF_POINTS, STATS } from "@/lib/constants";

export function SocialProof() {
  return (
    <section id="resultados" className="bg-brand-black py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Prueba, no promesas"
          title="Lo que cambió al dejar de improvisar"
          description="Nada de cifras infladas de una empresa con inversores detrás: esto es lo que se resolvió de verdad en la academia donde nació la plataforma."
        />

        <Reveal
          variant="fade"
          className="mt-14 grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-brand-black-soft px-6 py-8 sm:grid-cols-4 sm:px-10"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-brand-yellow sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs text-brand-gray sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PROOF_POINTS.map((point, index) => (
            <Reveal
              key={point.label}
              delay={index * 0.1}
              className="flex flex-col rounded-2xl border border-white/10 bg-brand-black-soft p-7"
            >
              <span className="inline-flex w-fit items-center rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-yellow">
                {point.label}
              </span>
              <h3 className="mt-4 text-lg font-bold text-brand-white">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                {point.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
