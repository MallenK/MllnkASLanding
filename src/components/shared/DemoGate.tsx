"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { trackLead } from "@/lib/leads";

const CAL_LINK = "urpa-academy-software-kgpahx/15min";

interface DemoGateContextValue {
  requestDemoAccess: () => void;
}

const DemoGateContext = createContext<DemoGateContextValue | null>(null);

export function useDemoGate() {
  const ctx = useContext(DemoGateContext);
  if (!ctx) {
    throw new Error("useDemoGate debe usarse dentro de <DemoGateProvider>");
  }
  return ctx;
}

export function DemoGateProvider({ children }: { children: ReactNode }) {
  const calRef = useRef<((action: string, opts?: Record<string, unknown>) => void) | null>(null);

  useEffect(() => {
    (async () => {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi({ namespace: "demo" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#facc15",
            "cal-text": "#ffffff",
            "cal-text-emphasis": "#ffffff",
            "cal-border-emphasis": "#facc15",
          },
          dark: {
            "cal-brand": "#facc15",
            "cal-text": "#ffffff",
            "cal-text-emphasis": "#ffffff",
            "cal-border-emphasis": "#facc15",
          },
        },
        hideEventTypeDetails: false,
      });
      calRef.current = cal as unknown as (action: string, opts?: Record<string, unknown>) => void;
    })();
  }, []);

  const requestDemoAccess = useCallback(() => {
    trackLead("demo_booking");
    if (calRef.current) {
      calRef.current("modal", { calLink: CAL_LINK });
    } else {
      window.open(`https://cal.com/${CAL_LINK}`, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <DemoGateContext.Provider value={{ requestDemoAccess }}>
      {children}
    </DemoGateContext.Provider>
  );
}
