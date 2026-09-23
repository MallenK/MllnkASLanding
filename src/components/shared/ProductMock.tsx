import { cn } from "@/lib/utils";

interface ProductMockProps {
  className?: string;
}

const ROWS = [
  { name: "Marc Puig", group: "Cadete A · Fútbol 11", status: "Bono activo", value: "7/10" },
  { name: "Laia Ferrer", group: "Alevín B · Tecnificación", status: "Bono activo", value: "4/8" },
  { name: "Alex Roca", group: "Infantil A · Portero", status: "Por renovar", value: "1/10" },
  { name: "Nil Serra", group: "Cadete B · Fútbol 11", status: "Bono activo", value: "9/10" },
];

export function ProductMock({ className }: ProductMockProps) {
  return (
    <div
      className={cn(
        "corner-cut-lg w-full sm:aspect-[16/10] overflow-hidden border border-white/10 bg-brand-black-soft shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      <div className="flex h-9 items-center gap-1.5 border-b border-white/5 bg-brand-black-elevated px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-4 h-4 w-40 rounded-full bg-white/5" />
      </div>

      <div className="grid grid-cols-1 sm:h-[calc(100%-2.25rem)] sm:grid-cols-[minmax(0,12rem)_1fr]">
        <div className="hidden flex-col gap-2 border-r border-white/5 p-4 sm:flex">
          <div className="mb-3 h-6 w-24 rounded-md bg-brand-yellow/90" />
          {["Alumnos", "Calendario", "Bonos", "Documentación", "Notificaciones"].map(
            (item, i) => (
              <div
                key={item}
                className={cn(
                  "flex h-8 items-center rounded-md px-3 text-xs font-medium",
                  i === 0
                    ? "bg-white/10 text-brand-white"
                    : "text-brand-gray",
                )}
              >
                {item}
              </div>
            ),
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-3 p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Sesiones esta semana", value: "34" },
              { label: "Alumnos activos", value: "128" },
              { label: "Bonos por renovar", value: "6" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-lg border border-white/5 bg-white/[0.03] p-2 sm:p-3"
              >
                <p className="text-[9px] uppercase leading-tight tracking-normal text-brand-gray [overflow-wrap:anywhere] sm:text-[10px] sm:tracking-wide">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm font-bold text-brand-white sm:text-base">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="min-w-0 flex-1 rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="truncate text-xs font-semibold text-brand-white">
                Alumnos recientes
              </span>
              <span className="whitespace-nowrap text-[10px] text-brand-gray">Ver todos</span>
            </div>
            <div className="space-y-1.5">
              {ROWS.map((row, i) => (
                <div
                  key={row.name}
                  className={cn(
                    "items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-white/[0.03]",
                    i === ROWS.length - 1 ? "hidden sm:flex" : "flex",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 text-[10px] font-bold text-brand-yellow">
                      {row.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-brand-white">{row.name}</p>
                      <p className="truncate text-[10px] text-brand-gray">{row.group}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={cn(
                        "whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium",
                        row.status === "Bono activo"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-brand-yellow/10 text-brand-yellow",
                      )}
                    >
                      {row.status}
                    </span>
                    <span className="hidden text-brand-gray sm:inline">
                      {row.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
