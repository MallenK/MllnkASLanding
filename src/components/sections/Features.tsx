"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FEATURE_ICONS, SECURITY_FEATURE_ICON } from "@/lib/constants";

interface ScreenCopy {
  title: string;
  caption: string;
  alt: string;
}

const SCREEN_SRCS = [
  "/screens/alumnos.png",
  "/screens/clases.png",
  "/screens/bonos.png",
];

interface FeatureCopy {
  title: string;
  description: string;
}

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
  const t = useTranslations("features");
  const items = t.raw("items") as FeatureCopy[];
  const security = t.raw("security") as FeatureCopy;
  const screens = t.raw("screens") as ScreenCopy[];

  return (
    <section id="caracteristicas" className="bg-brand-black py-24 sm:py-32">
      <Container>
        <SectionHeading title={t("title")} description={t("description")} />

        <ul className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {screens.map((screen, i) => (
            <li key={SCREEN_SRCS[i]}>
              <figure className="h-full overflow-hidden border border-white/10 bg-brand-black-soft">
                <Image
                  src={SCREEN_SRCS[i]}
                  alt={screen.alt}
                  width={1440}
                  height={900}
                  loading="lazy"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-white/10 p-4">
                  <p className="text-sm font-bold text-brand-white">{screen.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-brand-gray">
                    {screen.caption}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="mt-4 divide-y divide-white/10 border-b border-white/10"
        >
          {items.map((feature, index) => {
            const Icon = FEATURE_ICONS[index]?.icon;
            return (
              <motion.li
                key={FEATURE_ICONS[index]?.id ?? index}
                variants={rowVariants}
                className="group grid grid-cols-[3rem_1fr] items-start gap-x-5 gap-y-2 py-7 sm:grid-cols-[4rem_auto_1fr] sm:items-center sm:gap-x-8"
              >
                <span className="font-display text-3xl leading-none text-white/15 transition-colors group-hover:text-brand-yellow sm:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {Icon ? (
                  <Icon className="hidden h-6 w-6 shrink-0 text-brand-yellow sm:block" />
                ) : null}
                <div className="col-span-2 sm:col-span-1">
                  <h3 className="text-lg font-bold text-brand-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-brand-gray">
                    {feature.description}
                  </p>
                </div>
              </motion.li>
            );
          })}

          <motion.li
            variants={rowVariants}
            className="grid grid-cols-[3rem_1fr] items-start gap-x-5 gap-y-2 bg-brand-yellow px-4 py-7 sm:grid-cols-[4rem_auto_1fr] sm:items-center sm:gap-x-8 sm:px-6"
          >
            <span className="font-display text-3xl leading-none text-brand-black/25 sm:text-4xl">
              {String(items.length + 1).padStart(2, "0")}
            </span>
            <SECURITY_FEATURE_ICON className="hidden h-6 w-6 shrink-0 text-brand-black sm:block" />
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-lg font-bold text-brand-black">
                {security.title}
              </h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-brand-black/70">
                {security.description}
              </p>
            </div>
          </motion.li>
        </motion.ol>
      </Container>
    </section>
  );
}
