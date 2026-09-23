"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1400,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const hasDecimals = !Number.isInteger(value);

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const el = ref.current;

    // Misma curva "outExpo" que usaba anime.js, ahora con motion (ya en el
    // bundle) para poder prescindir de una dependencia entera.
    const controls = animate(0, value, {
      duration: duration / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = `${
          hasDecimals ? latest.toFixed(1) : Math.round(latest)
        }${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, value, suffix, duration, hasDecimals]);

  return (
    <span ref={ref}>
      {hasDecimals ? value.toFixed(1) : value}
      {suffix}
    </span>
  );
}
