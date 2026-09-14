"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FEATURES, SECURITY_FEATURE } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Features() {
  return (
    <section id="caracteristicas" className="bg-brand-black py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Lo que ya funciona en producción"
          title="Los mismos módulos que llevan la academia real"
          description="Nada de esto es una demo de escaparate: son los módulos que gestionan el día a día de JP Preparation, listos para tu academia."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-black-soft p-7 transition-colors hover:border-brand-yellow/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-yellow/10 text-brand-yellow transition-colors group-hover:bg-brand-yellow group-hover:text-brand-black">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                {feature.description}
              </p>
            </motion.div>
          ))}

          <motion.div
            variants={cardVariants}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-brand-yellow/30 bg-brand-yellow p-7"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-black/10 text-brand-black">
                <SECURITY_FEATURE.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-black">
                {SECURITY_FEATURE.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                {SECURITY_FEATURE.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
