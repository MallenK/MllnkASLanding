import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    // El CSS de Tailwind es pequeño (~12 KB): inlinearlo quita una petición
    // que bloquea el primer pintado y mejora FCP/LCP en primeras visitas.
    inlineCss: true,
  },
};

export default withNextIntl(nextConfig);
