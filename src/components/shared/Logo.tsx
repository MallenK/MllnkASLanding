import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "inline" | "stacked";
  className?: string;
}

export function Logo({ variant = "inline", className }: LogoProps) {
  if (variant === "stacked") {
    return (
      <div className={cn("inline-flex flex-col items-start", className)}>
        <Image
          src="/brand-assets/logo/urpa-logo.png"
          alt="URPA"
          width={1356}
          height={375}
          priority
          className="h-9 w-auto sm:h-11"
        />
        <span className="mt-3 h-[3px] w-14 bg-brand-yellow" aria-hidden="true" />
        <span className="mt-2 text-xs font-medium uppercase tracking-[0.35em] text-brand-gray">
          Academia Software
        </span>
      </div>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/brand-assets/logo/urpa-logo.png"
        alt="URPA"
        width={1356}
        height={375}
        priority
        className="h-6 w-auto sm:h-7"
      />
      <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-brand-gray sm:inline">
        Academia Software
      </span>
    </span>
  );
}
