import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductMockProps {
  alt: string;
  className?: string;
}

// Captura real del panel de administración (demo pública, datos ficticios).
// 1440x900 = 16:10, así que no hay CLS ni recorte en ningún ancho.
export function ProductMock({ alt, className }: ProductMockProps) {
  return (
    <div
      className={cn(
        "corner-cut-lg w-full overflow-hidden border border-white/10 bg-brand-black-soft shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      <Image
        src="/screens/dashboard.png"
        alt={alt}
        width={1440}
        height={900}
        priority
        sizes="(min-width: 1280px) 1100px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}
