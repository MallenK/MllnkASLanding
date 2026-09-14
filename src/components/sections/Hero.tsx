"use client";

import { motion } from "motion/react";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/shared/Container";
import { AmbientOrbs } from "@/components/shared/AmbientOrbs";
import { ProductMock } from "@/components/shared/ProductMock";
import { Parallax } from "@/components/shared/Parallax";
import { GatedDemoButton } from "@/components/shared/GatedDemoButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-black pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <div className="bg-noise absolute inset-0 opacity-40" aria-hidden="true" />
      <Parallax offset={40} className="absolute inset-0">
        <AmbientOrbs />
      </Parallax>

      <Container className="relative flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-gray"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
          Nacida en una academia de fútbol real, en producción desde el día uno
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-white sm:text-6xl md:text-7xl"
        >
          El backoffice que tu academia deportiva
          {" "}
          <span className="text-brand-yellow">necesita de verdad</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-balance text-base text-brand-gray sm:text-lg md:text-xl"
        >
          Alumnos, calendario, bonos, documentación y comunicación en un solo
          panel. Nació resolviendo el día a día de una academia de fútbol en
          Barcelona y hoy lo diseño, despliego y mantengo yo, de forma
          autónoma.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <GatedDemoButton
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 gap-2 bg-brand-yellow px-7 text-base font-semibold text-brand-black hover:bg-brand-yellow-dim",
            )}
          >
            Explorar demo en vivo
            <ArrowRightIcon className="h-4 w-4" />
          </GatedDemoButton>
          <a
            href="#historia"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 gap-2 border-white/15 bg-transparent px-7 text-base font-semibold text-brand-white hover:bg-white/5",
            )}
          >
            Ver la historia
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-xs text-brand-gray"
        >
          Solo tu email · Elige rol y tipo de academia dentro de la demo · Soporte directo del creador
        </motion.p>

        <Parallax offset={24} className="mt-16 w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductMock />
          </motion.div>
        </Parallax>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-14 flex flex-col items-center gap-2 text-brand-gray"
          aria-hidden="true"
        >
          <span className="text-[11px] uppercase tracking-[0.3em]">Sigue bajando</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </motion.span>
        </motion.div>
      </Container>
    </section>
  );
}
