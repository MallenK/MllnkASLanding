# Mallen'k Academy Software — Landing Page

Landing page de conversión para **Mallen'k Academy Software**: la plataforma
de gestión nacida en una escuela de tecnificación de fútbol (Barcelona) y
ahora abierta a otras academias. Next.js 16 (App Router) +
TypeScript + Tailwind CSS v4 + shadcn/ui + Motion (motion.dev) + anime.js.

Demo en vivo del producto real: <https://plataforma-jp-1.onrender.com/>

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (config CSS-first en `src/app/globals.css`, sin `tailwind.config.js`)
- **shadcn/ui** sobre Base UI (`Accordion`, `Button`, `Badge`, `Separator`)
- **motion** (motion.dev / ex-Framer Motion) para scroll-reveals y parallax
- **animejs v4** para movimiento ambiental continuo (orbes del Hero) y contadores animados
- **@heroicons/react** para iconografía
- **`next/og`** (`ImageResponse`) para generar favicon, apple-icon y las imágenes Open Graph/Twitter sin ningún diseñador ni herramienta externa

## Estructura de carpetas

```
src/
  proxy.ts               # Middleware de next-intl: detecta idioma y redirige "/" -> /es|/en|/ca
  i18n/
    routing.ts             # Locales soportados, locale por defecto, prefijo siempre visible
    navigation.ts            # Link/usePathname/useRouter conscientes del locale
    request.ts                 # Carga messages/<locale>.json según la petición
  app/
    layout.tsx           # Fuentes, metadata SEO base (es), JSON-LD, tema oscuro fijo — 100% estático
    [locale]/
      layout.tsx           # NextIntlClientProvider + GlobalWidgets (por locale, sigue siendo estático)
      page.tsx               # Home: ensambla todas las secciones, generateMetadata por idioma
    not-found.tsx / error.tsx  # 404 y error runtime con la identidad de marca (siempre en español)
    globals.css            # Tokens de color de marca, utilidades, reduced-motion
    sitemap.ts / robots.ts / manifest.ts
    icon.tsx / apple-icon.tsx           # Favicon + apple-touch-icon generados
    opengraph-image.tsx / twitter-image.tsx  # Imagen social generada (1200×630)
    privacidad/ · terminos/ · cookies/ page.tsx  # Páginas legales, SIEMPRE en español (ver sección Legal)
  components/
    layout/
      Header.tsx          # Nav sticky + selector de idioma, cambia de transparente a sólido con el scroll
      Footer.tsx
    sections/
      Hero.tsx             # Parallax en orbes y mock de producto
      Story.tsx             # "La historia": timeline con línea de progreso ligada al scroll
      Features.tsx           # Módulos reales, con stagger de scroll
      HowItWorks.tsx
      SocialProof.tsx         # Stats animados + proof points (antes/ahora/resultado)
      CTASection.tsx
      FAQ.tsx                  # Accordion (shadcn/ui) + JSON-LD FAQPage
      Contact.tsx               # Formulario de contacto (Web3Forms)
    shared/
      Container.tsx, SectionHeading.tsx, Logo.tsx
      Reveal.tsx                # Wrapper de scroll-reveal (motion, whileInView)
      Parallax.tsx                # Wrapper de parallax continuo (motion, useScroll+useTransform)
      ScrollProgressBar.tsx
      AnimatedCounter.tsx          # Contador con animejs
      AmbientOrbs.tsx                # Orbes de fondo con animejs (loop continuo)
      ProductMock.tsx                 # Mock de producto en CSS (sustituir por capturas reales)
      DemoGate.tsx                      # Contexto + modal: pide email antes de abrir la demo
      GatedDemoButton.tsx                # Botón reutilizable que dispara el gate de email
      CookieConsent.tsx                   # Banner de aceptar/rechazar cookies analíticas
      Analytics.tsx                        # Carga GA4 solo si hay consentimiento aceptado
      GlobalWidgets.tsx                     # Agrupa CookieConsent + BackToTop + WhatsApp + Analytics
      LanguageSwitcher.tsx                   # Selector ES/EN/CA (cambia de idioma sin perder la ruta)
      LegalLayout.tsx                       # Layout + tipografía compartidos por las 3 páginas legales
    ui/                              # Componentes shadcn/ui generados
  lib/
    constants.ts                      # Solo datos estructurales no traducibles: iconos, ids, SITE_URL, LEGAL
    consent.ts                          # Store de consentimiento de cookies (useSyncExternalStore-friendly)
    og.tsx                             # JSX compartido por opengraph-image y twitter-image
    web3forms.ts                        # Cliente del formulario (contacto + gate de demo)
    utils.ts                            # cn()
  types/
    index.ts
messages/
  es.json / en.json / ca.json          # Todo el copy traducible del sitio, por idioma
```

## Sistema de colores (Tailwind v4, `@theme` en `globals.css`)

| Token | Valor | Uso |
|---|---|---|
| `--color-brand-black` | `#111111` | Fondo base |
| `--color-brand-black-soft` | `#1a1a1a` | Superficies / tarjetas |
| `--color-brand-black-elevated` | `#212121` | Superficies elevadas (barra de mock) |
| `--color-brand-yellow` | `#ffd21f` | Acento primario, CTAs |
| `--color-brand-yellow-dim` | `#e6bd1c` | Hover del amarillo |
| `--color-brand-white` | `#ffffff` | Texto principal |
| `--color-brand-gray` | `#a3a3a3` | Texto secundario |

Tema oscuro fijo (es la identidad de marca, no un modo con toggle).
`color-scheme: dark` declarado en `<html>` y en `viewport`.

## Animaciones (scroll-first)

- **Scroll reveal** (`Reveal.tsx`): `whileInView` + `viewport={{ once: true }}`.
- **Parallax** (`Parallax.tsx`): `useScroll`/`useTransform` continuos — orbes y
  mock del Hero, blur decorativo del CTA final.
- **Timeline de scroll** (`Story.tsx`): la línea vertical se dibuja con
  `scaleY` ligado a `scrollYProgress` a medida que el usuario avanza por los
  4 hitos de la historia.
- **Stagger real** (`Features.tsx`): variantes padre/hijo con `staggerChildren`.
- **Header dinámico**: pasa de transparente a sólido con `useScroll` + `useMotionValueEvent`.
- **Orbes ambientales y contadores**: `animejs` (`createScope`, `animate`).
- Todo respeta `prefers-reduced-motion` (ver `globals.css`).

## SEO — implementado 100% gratis

Todo lo de abajo usa únicamente convenciones nativas de Next.js (Metadata API,
`next/og`) y servicios gratuitos de Google/Bing. Cero herramientas de pago.

**Ya en el código:**
- **Metadata completa** (`layout.tsx`): title/description con las palabras
  clave reales del sector (investigadas por búsqueda: *"software gestión
  academia deportiva/de fútbol/club deportivo"*, frente a competidores como
  SportMember, Playoff o Controla.Club), Open Graph, Twitter Card, `alternates.canonical`.
- **JSON-LD** en `@graph` (Organization + WebSite + SoftwareApplication) en
  `layout.tsx`, más **`FAQPage`** en `FAQ.tsx` — esto habilita rich snippets
  de preguntas frecuentes directamente en los resultados de Google, gratis.
- **Imagen Open Graph/Twitter generada** (`opengraph-image.tsx`,
  `twitter-image.tsx`, 1200×630) con `next/og` — no ha hecho falta ningún
  diseñador ni Canva: se renderiza en build.
- **Favicon + apple-touch-icon generados** (`icon.tsx`, `apple-icon.tsx`) y
  **`manifest.ts`** (web app manifest).
- **`sitemap.ts`** y **`robots.ts`** dinámicos (usan `SITE_URL`).
- Un único `<h1>` (el titular del Hero) y jerarquía `h2`/`h3` correcta en
  cada sección — importante para cómo Google interpreta la estructura.
- `<nav aria-label>` y landmarks semánticos (`<header>`, `<main>`, `<footer>`).

**Lo único que tienes que hacer tú, fuera de código, y gratis:**

1. **Desplegar en Vercel** con el nombre de proyecto `mallenk-academy-software`
   para que la URL final coincida con `SITE_URL` en `src/lib/constants.ts`
   (si usas otro nombre o luego compras un dominio propio, actualiza esa
   única constante — toda la metadata se recalcula sola).
2. **Google Search Console** (gratis): crea la propiedad tipo "Prefijo de
   URL" con tu URL de Vercel, verifica con el método "etiqueta HTML" (te da
   un código `content="..."`) y ponlo como variable de entorno en Vercel:
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ese-código` → redeploy. Luego envía
   `https://tu-dominio/sitemap.xml` en la sección Sitemaps.
3. **Bing Webmaster Tools** (gratis): puedes importar directamente la
   propiedad ya verificada en Google Search Console con un clic, sin repetir
   el proceso.
4. **Valida los rich results gratis**: pega tu URL en
   [Google Rich Results Test](https://search.google.com/test/rich-results)
   para confirmar que el `FAQPage` y el `Organization` se leen bien.
5. **PageSpeed Insights** (gratis): corre tu URL real tras el despliegue y
   comprueba que Core Web Vitals están en verde (ver tabla de rendimiento
   más abajo).
6. **Backlinks gratis de arranque** (lo que de verdad mueve el ranking a
   medio plazo, no las meta tags): perfil en LinkedIn/Instagram del
   producto enlazando a la landing, alta en directorios gratuitos de SaaS
   (Product Hunt, BetaList, SaaSHub, alternativeto.net), y si quieres, un
   post explicando la historia de esta escuela de tecnificación en foros/comunidades de
   entrenadores o clubes de base — contenido real, no spam de enlaces.
7. **Opcional — `founder` en el schema**: en `src/lib/constants.ts`, la
   constante `ORGANIZATION.founder` está vacía a propósito para no inventar
   un nombre en datos estructurados. Si quieres la señal E-E-A-T de "quién
   hay detrás del producto" (recomendable y gratis), pon ahí tu nombre real.

> No hay backend de "content marketing" (blog) todavía. Si más adelante
> quieres pelear por keywords informacionales (p. ej. "cómo gestionar los
> bonos de una academia de fútbol"), la vía gratuita es añadir
> `src/app/blog/[slug]/page.tsx` con contenido propio — eso, no las meta
> tags, es lo que de verdad compite en Google a medio plazo.

## Contacto y acceso a la demo (gratis, con Web3Forms)

Dos piezas nuevas, ambas usando el mismo backend gratuito
([web3forms.com](https://web3forms.com), sin servidor propio, sin límite
mensual publicitado):

- **Gate de email antes de la demo** (`DemoGate.tsx` + `GatedDemoButton.tsx`):
  cualquier botón "Explorar demo en vivo" del sitio abre un modal que pide el
  email antes de abrir `DEMO_URL` en una pestaña nueva. Una vez enviado, se
  guarda una marca en `localStorage` del navegador para no volver a pedirlo
  en visitas futuras desde el mismo dispositivo.
- **Sección de contacto** (`Contact.tsx`, `#contacto`): formulario email +
  mensaje, mismo backend.

**Configuración obligatoria antes de desplegar** (gratis, ~2 minutos):
1. Crea una cuenta en [web3forms.com](https://web3forms.com) con tu email —
   ahí es donde llegarán los leads y mensajes de contacto.
2. Copia tu "Access Key".
3. En Vercel: Project Settings → Environment Variables → añade
   `NEXT_PUBLIC_WEB3FORMS_KEY` con ese valor → redeploy.
4. En local, copia `.env.example` a `.env.local` y pega la misma clave si
   quieres probar los formularios con `npm run dev`.

Sin esta variable configurada, el modal y el formulario de contacto se
muestran igual, pero el envío falla con un aviso en pantalla — no hay un
"modo simulado" silencioso, para que no publiques el sitio pensando que
funciona sin haberlo comprobado.

## Legal y consentimiento de cookies

- **Páginas legales reales**: `/privacidad`, `/terminos`, `/cookies`
  (antes eran enlaces muertos `href="#"` en el footer). Comparten layout y
  tipografía vía `LegalLayout.tsx`.
- **Datos de identificación** (`LEGAL` en `constants.ts`): `taxId` se deja
  vacío a propósito para no inventar un NIF/CIF. **Rellénalo con el real
  antes de publicar en producción** — mientras esté vacío, la página de
  Términos simplemente omite esa línea.
- **Las páginas legales son siempre en español**, sin prefijo de idioma
  (`/privacidad`, no `/es/privacidad` ni `/en/privacidad`) — decisión de
  producto, no una limitación técnica. Desde `/en` o `/ca`, el footer añade
  un aviso "(Spanish only)" / "(només en castellà)" junto a esos enlaces.
- **Banner de cookies** (`CookieConsent.tsx` + `consent.ts`): aparece en la
  primera visita, guarda la elección en `localStorage`
  (`mk_cookie_consent`). Google Analytics (`Analytics.tsx`) **solo se
  carga si el visitante pulsa "Aceptar"** — antes se cargaba siempre, sin
  consentimiento previo.
- **404 y error runtime** (`not-found.tsx`, `error.tsx`): páginas con la
  identidad de marca en vez de las genéricas de Next.js. Viven fuera del
  árbol `[locale]`, así que también se muestran siempre en español.

## Idiomas (Español / English / Català)

- **Rutas con prefijo siempre visible**: `/es`, `/en`, `/ca` (via `next-intl`,
  `localePrefix: "always"` en `src/i18n/routing.ts`). Un visitante que entra
  por `/` recibe un `307` hacia el idioma detectado en `Accept-Language`
  (con fallback a `/es`) — lo hace `src/proxy.ts` (el middleware de
  next-intl; en Next.js 16 esta convención se llama "proxy", no
  "middleware", y **debe vivir en `src/` cuando el proyecto usa `src/app`**,
  no en la raíz del repo).
- **Todo el copy vive en `messages/{es,en,ca}.json`**, organizado por
  sección (`hero`, `story`, `features`, `faq`, `cookieConsent`, etc.).
  `src/lib/constants.ts` ya solo guarda lo que NO se traduce: iconos, ids,
  slugs de sección y valores numéricos.
- **Selector de idioma** (`LanguageSwitcher.tsx`, en el header desktop y en
  el menú móvil): cambia de ruta preservando la página actual
  (`/en#faq` → `/ca#faq`), usando `usePathname`/`useRouter` de
  `src/i18n/navigation.ts`.
- **Rendimiento**: las 3 versiones de la home (`/es`, `/en`, `/ca`) se
  prerrenderizan como HTML estático en build (`generateStaticParams` +
  `setRequestLocale` en `[locale]/layout.tsx`) — **no uses `getLocale()` ni
  `getMessages()` en el layout raíz** (`src/app/layout.tsx`): eso lee la
  negociación de idioma de la petición y fuerza renderizado dinámico en
  *todas* las rutas del sitio, legales incluidas. Ese provider vive en
  `[locale]/layout.tsx`, y las páginas legales tienen su propio
  `NextIntlClientProvider` estático con `messages/es.json` importado
  directamente (ver `LegalLayout.tsx`).
- **SEO multi-idioma**: `[locale]/page.tsx` genera `alternates.languages`
  (hreflang) por idioma + `x-default`, y `sitemap.ts` lista las 3 URLs de
  home con sus alternates.

## Wireframe de secciones

1. **Hero** (`#inicio`) — badge + titular + subtítulo con la historia real →
   2 CTAs (demo en vivo / ver la historia) → mock de producto con parallax →
   indicador de scroll.
2. **Historia** (`#historia`) — timeline de scroll: problema → construcción → prueba → producto.
3. **Features** (`#caracteristicas`) — los módulos reales de la plataforma + tarjeta de seguridad.
4. **Cómo funciona** (`#como-funciona`) — 3 pasos, empezando por la demo.
5. **Resultados** (`#resultados`) — stats honestas + proof points antes/ahora/resultado.
6. **CTA principal** (`#cta`) — banner amarillo: demo (con gate de email) + enlace a contacto.
7. **FAQ** (`#faq`) — accordion + `FAQPage` JSON-LD.
8. **Contacto** (`#contacto`) — formulario email + mensaje (Web3Forms).
9. **Footer** — logo, enlaces de producto, legal.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Despliegue en Vercel

Proyecto zero-config: Vercel detecta Next.js automáticamente.

```bash
npm install -g vercel   # si no lo tienes
vercel login
vercel                  # despliegue de preview
vercel --prod            # despliegue a producción
```

O conectando el repositorio de Git desde el dashboard de Vercel (New Project →
Import Git Repository) para despliegues automáticos en cada push.

Antes de publicar:
- Confirma que el nombre del proyecto en Vercel coincide con `SITE_URL`
  (o actualiza esa constante tras el primer deploy).
- **Configura `NEXT_PUBLIC_WEB3FORMS_KEY` en Vercel** (ver sección de
  Contacto arriba) — sin esto el gate de la demo y el formulario de
  contacto no envían nada.
- Sustituye `ProductMock.tsx` por capturas reales (`next/image`, con
  `width`/`height` explícitos para no introducir CLS).
- Sigue la checklist de SEO de arriba (Search Console, sitemap, Rich Results Test).

## Rendimiento esperado (Vercel, producción)

Con el stack actual (fuentes con `next/font` y `display: swap`, sin imágenes
externas en el above-the-fold, animaciones basadas en `transform`/`opacity`,
CSS-first Tailwind v4, sin JS bloqueante):

| Métrica | Objetivo | Por qué se cumple |
|---|---|---|
| LCP | < 2.5s | El elemento LCP (titular del Hero) es texto del sistema con fuente precargada; el mock de producto es CSS puro, no una imagen que bloquee. |
| CLS | < 0.1 | Contenedores con `aspect-ratio` fijo, sin fuentes con fallback descuadrado (`display: swap` + fallback métrico de `next/font`), sin imágenes sin dimensiones. |
| INP | < 200ms | Animaciones limitadas a `transform`/`opacity` (compositor), sin listeners pesados en scroll. |
| TBT | Bajo | Sin librerías de terceros pesadas; `motion` y `animejs` se cargan solo en los client components que los necesitan. |

Verificar siempre con Lighthouse/PageSpeed Insights sobre el despliegue real,
especialmente al sustituir el `ProductMock` por imágenes reales.
