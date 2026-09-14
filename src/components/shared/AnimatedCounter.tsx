"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { animate } from "animejs";

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
    const counter = { count: 0 };

    animate(counter, {
      count: value,
      duration,
      ease: "outExpo",
      onUpdate: () => {
        el.textContent = `${
          hasDecimals ? counter.count.toFixed(1) : Math.round(counter.count)
        }${suffix}`;
      },
    });
  }, [isInView, value, suffix, duration, hasDecimals]);

  return (
    <span ref={ref}>
      {hasDecimals ? value.toFixed(1) : value}
      {suffix}
    </span>
  );
}
