import { ArrowRightIcon } from "@heroicons/react/24/outline";
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
          title="Lo que cambió al dejar de improvisar"
          description="Nada de cifras infladas de una empresa con inversores detrás: esto es lo que se resolvió de verdad en la academia donde nació la plataforma."
        />

        <Reveal
          variant="fade"
          className="mt-14 grid grid-cols-2 divide-x divide-y divide-white/10 border border-white/10 sm:grid-cols-4 sm:divide-y-0"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 px-5 py-7 text-center sm:px-6">
              <p className="font-display tabular-nums text-4xl leading-none text-brand-yellow sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-brand-gray sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {PROOF_POINTS.map((point, index) => (
            <Reveal key={point.label} delay={index * 0.1} className="relative flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-xs uppercase tracking-[0.2em] text-brand-yellow">
                  {point.label}
                </span>
                {index < PROOF_POINTS.length - 1 ? (
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="hidden h-3.5 w-3.5 text-white/20 md:absolute md:right-[-1.35rem] md:top-1 md:block"
                  />
                ) : null}
              </div>
              <h3 className="text-lg font-bold text-brand-white">{point.title}</h3>
              <p className="text-sm leading-relaxed text-brand-gray">
                {point.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
