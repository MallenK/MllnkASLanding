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
        <span className="text-3xl font-extrabold uppercase leading-none tracking-tight text-brand-white sm:text-4xl">
          {SITE_SHORT_NAME}
        </span>
        <span className="mt-3 h-[3px] w-full bg-brand-yellow" aria-hidden="true" />
        <span className="mt-2 text-xs font-medium uppercase tracking-[0.35em] text-brand-gray">
          Academy Software
        </span>
      </div>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="text-lg font-extrabold tracking-tight text-brand-white sm:text-xl">
        {SITE_SHORT_NAME}
        <span className="text-brand-yellow">.</span>
      </span>
      <span className="hidden text-xs font-medium tracking-wide text-brand-gray sm:inline">
        Academy Software
      </span>
    </span>
  );
}
