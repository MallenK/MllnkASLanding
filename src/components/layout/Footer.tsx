import { Container } from "@/components/shared/Container";
import { DEMO_URL, NAV_LINKS, SITE_SHORT_NAME } from "@/lib/constants";

const LEGAL_LINKS = [
  { label: "Privacidad", href: "#" },
  { label: "Términos", href: "#" },
  { label: "Cookies", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-black">
      <Container className="flex flex-col gap-10 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <span className="text-lg font-extrabold tracking-tight text-brand-white">
              {SITE_SHORT_NAME}
              <span className="text-brand-yellow">.</span>{" "}
              <span className="text-sm font-medium text-brand-gray">
                Academy Software
              </span>
            </span>
            <p className="mt-3 text-sm text-brand-gray">
              La plataforma de gestión nacida en una academia de fútbol real,
              diseñada, desplegada y mantenida por una sola persona.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-brand-white">
                Producto
              </h3>
              <ul className="mt-3 space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                  >
                    Demo en vivo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-brand-white">
                Sobre esto
              </h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="#historia"
                    className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                  >
                    La historia
                  </a>
                </li>
                <li>
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-brand-white">
                Legal
              </h3>
              <ul className="mt-3 space-y-2">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 pt-6 text-sm text-brand-gray sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_SHORT_NAME} Academy Software.
            Todos los derechos reservados.
          </p>
          <p>Construido y mantenido por su creador, sin agencias de por medio.</p>
        </div>
      </Container>
    </footer>
  );
}
