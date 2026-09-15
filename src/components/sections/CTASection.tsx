import { ArrowRightIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/shared/Parallax";
import { GatedDemoButton } from "@/components/shared/GatedDemoButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-brand-yellow py-20 sm:py-28">
      <Parallax offset={30} className="pointer-events-none absolute -right-16 -top-16">
        <div
          aria-hidden="true"
          className="h-72 w-72 rounded-full bg-brand-black/10 blur-3xl"
        />
      </Parallax>

      <Container className="relative">
        <Reveal variant="fade-up" className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-balance text-4xl uppercase leading-[0.95] text-brand-black sm:text-5xl md:text-6xl">
            Pruébalo tú mismo, sin hablar con nadie primero
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-brand-black/70 sm:text-lg">
            Deja tu email, entra en la demo en vivo, elige tu rol y el tipo
            de academia. Si encaja, hablamos directamente conmigo — sin
            comerciales de por medio.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GatedDemoButton
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 gap-2 bg-brand-black px-7 text-base font-semibold text-brand-white hover:bg-brand-black-elevated",
              )}
            >
              Explorar demo en vivo
              <ArrowRightIcon className="h-4 w-4" />
            </GatedDemoButton>
            <a
              href="#contacto"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 gap-2 border-brand-black/20 bg-transparent px-7 text-base font-semibold text-brand-black hover:bg-brand-black/10",
              )}
            >
              <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
              Escribirme directamente
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
