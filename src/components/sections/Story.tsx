"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { STORY_STEPS } from "@/lib/constants";

export function Story() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.65"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="historia" className="bg-brand-black-soft py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="De un problema real a una plataforma en producción"
          description="No partió de una plantilla en blanco. Partió de una academia de fútbol real que necesitaba dejar de perder información en hojas de cálculo."
        />

        <div ref={trackRef} className="relative mt-16 max-w-3xl pl-10 sm:pl-14">
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-1 bottom-1 w-px bg-white/10 sm:left-[9px]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute left-[7px] top-1 bottom-1 w-px origin-top bg-brand-yellow sm:left-[9px]"
          />

          <ol className="flex flex-col gap-14">
            {STORY_STEPS.map((step, index) => (
              <Reveal
                as="li"
                key={step.tag}
                delay={index * 0.05}
                className="relative"
              >
                <span className="absolute -left-10 top-1.5 flex h-3.5 w-3.5 items-center justify-center bg-brand-yellow sm:-left-14" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">
                  {String(index + 1).padStart(2, "0")} — {step.tag}
                </span>
                <h3 className="font-display mt-2 text-2xl uppercase leading-none tracking-tight text-brand-white sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-gray sm:text-base">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
