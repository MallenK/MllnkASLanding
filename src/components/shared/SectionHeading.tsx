import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  if (align === "center") {
    return (
      <Reveal
        className={cn(
          "mx-auto flex max-w-3xl flex-col items-center gap-4 text-center",
          className,
        )}
      >
        <h2 className="font-display text-balance text-4xl uppercase leading-[0.95] tracking-tight text-brand-white sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {description ? (
          <p className="text-balance text-base text-brand-gray sm:text-lg">
            {description}
          </p>
        ) : null}
      </Reveal>
    );
  }

  return (
    <Reveal
      className={cn(
        "grid grid-cols-1 items-end gap-6 border-b border-white/10 pb-8 md:grid-cols-[1.3fr_1fr] md:gap-12",
        className,
      )}
    >
      <h2 className="font-display text-balance text-4xl uppercase leading-[0.95] tracking-tight text-brand-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-md text-balance text-base leading-relaxed text-brand-gray sm:text-lg md:pb-1">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
