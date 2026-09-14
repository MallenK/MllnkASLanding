"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, type Scope, utils } from "animejs";

export function AmbientOrbs() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<Scope | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    scopeRef.current = createScope({ root: rootRef }).add(() => {
      const orbs = utils.$(".ambient-orb");

      orbs.forEach((orb, index) => {
        animate(orb, {
          translateX: [
            { to: `${index % 2 === 0 ? "+" : "-"}=40`, duration: 6000 },
            { to: `${index % 2 === 0 ? "-" : "+"}=40`, duration: 6000 },
          ],
          translateY: [
            { to: "+=30", duration: 5000 },
            { to: "-=30", duration: 5000 },
          ],
          scale: [
            { to: 1.08, duration: 4500 },
            { to: 1, duration: 4500 },
          ],
          loop: true,
          ease: "inOutSine",
          delay: index * 400,
        });
      });
    });

    return () => scopeRef.current?.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="ambient-orb absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-yellow/20 blur-[100px]" />
      <div className="ambient-orb absolute right-[-6rem] top-1/3 h-80 w-80 rounded-full bg-brand-yellow/10 blur-[110px]" />
      <div className="ambient-orb absolute bottom-[-4rem] left-1/3 h-64 w-64 rounded-full bg-brand-white/5 blur-[90px]" />
    </div>
  );
}
