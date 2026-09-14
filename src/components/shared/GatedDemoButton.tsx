"use client";

import type { ReactNode } from "react";
import { useDemoGate } from "@/components/shared/DemoGate";

interface GatedDemoButtonProps {
  className?: string;
  children: ReactNode;
  onBeforeOpen?: () => void;
}

export function GatedDemoButton({
  className,
  children,
  onBeforeOpen,
}: GatedDemoButtonProps) {
  const { requestDemoAccess } = useDemoGate();

  return (
    <button
      type="button"
      onClick={() => {
        onBeforeOpen?.();
        requestDemoAccess();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
