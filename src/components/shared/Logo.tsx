import { cn } from "@/lib/utils";
import { SITE_SHORT_NAME } from "@/lib/constants";

interface LogoProps {
  variant?: "inline" | "stacked";
  className?: string;
}

export function Logo({ variant = "inline", className }: LogoProps) {
  if (variant === "stacked") {
    return (
      <div className={cn("inline-flex flex-col items-start", className)}>
        <span className="font-display text-4xl uppercase leading-none tracking-tight text-brand-white sm:text-5xl">
          {SITE_SHORT_NAME}
        </span>
        <span className="mt-3 h-[3px] w-14 bg-brand-yellow" aria-hidden="true" />
        <span className="mt-2 text-xs font-medium uppercase tracking-[0.35em] text-brand-gray">
          Academy Software
        </span>
      </div>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="font-display text-xl uppercase leading-none tracking-tight text-brand-white sm:text-2xl">
        {SITE_SHORT_NAME}
        <span className="text-brand-yellow">.</span>
      </span>
      <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-brand-gray sm:inline">
        Academy Software
      </span>
    </span>
  );
}
