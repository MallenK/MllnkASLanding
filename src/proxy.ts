import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excluye explícitamente las páginas legales (se quedan solo en español,
  // sin prefijo de idioma), los archivos generados en la raíz (robots,
  // sitemap, manifest, iconos, imágenes OG) y los assets estáticos.
  matcher: [
    "/((?!api|_next|_vercel|privacidad|terminos|cookies|robots.txt|sitemap.xml|manifest.webmanifest|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)",
  ],
};
