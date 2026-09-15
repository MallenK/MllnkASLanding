"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FEATURES, SECURITY_FEATURE } from "@/lib/constants";

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export function Features() {
  return (
    <section id="caracteristicas" className="bg-brand-black py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="Los módulos que llevan la academia real"
          description="Nada de esto es una demo de escaparate: son los módulos que gestionan el día a día de una escuela de tecnificación real, listos para tu academia."
        />

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="mt-4 divide-y divide-white/10 border-b border-white/10"
        >
          {FEATURES.map((feature, index) => (
            <motion.li
              key={feature.id}
              variants={rowVariants}
              className="group grid grid-cols-[3rem_1fr] items-start gap-x-5 gap-y-2 py-7 sm:grid-cols-[4rem_auto_1fr] sm:items-center sm:gap-x-8"
            >
              <span className="font-display text-3xl leading-none text-white/15 transition-colors group-hover:text-brand-yellow sm:text-4xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <feature.icon className="hidden h-6 w-6 shrink-0 text-brand-yellow sm:block" />
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-lg font-bold text-brand-white">
                  {feature.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-brand-gray">
                  {feature.description}
                </p>
              </div>
            </motion.li>
          ))}

          <motion.li
            variants={rowVariants}
            className="grid grid-cols-[3rem_1fr] items-start gap-x-5 gap-y-2 bg-brand-yellow py-7 pl-4 pr-4 sm:grid-cols-[4rem_auto_1fr] sm:items-center sm:gap-x-8 sm:pl-0"
          >
            <span className="font-display text-3xl leading-none text-brand-black/25 sm:text-4xl">
              {String(FEATURES.length + 1).padStart(2, "0")}
            </span>
            <SECURITY_FEATURE.icon className="hidden h-6 w-6 shrink-0 text-brand-black sm:block" />
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-lg font-bold text-brand-black">
                {SECURITY_FEATURE.title}
              </h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-brand-black/70">
                {SECURITY_FEATURE.description}
              </p>
            </div>
          </motion.li>
        </motion.ol>
      </Container>
    </section>
  );
}
