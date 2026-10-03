import { notFound } from "next/navigation";

// Rutas desconocidas bajo /<locale>/...: sin esto no habría layout raíz con el
// que renderizar el 404 (no existe app/layout.tsx), y se serviría el 404
// genérico de Next sin marca ni idioma.
export default function CatchAll() {
  notFound();
}
