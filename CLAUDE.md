# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |

---

# Project

Marketing site for **Depil** (depil.com.ec) — laser hair removal / aesthetics clinic, Ecuador. Content and copy come from https://depil.com.ec. UI language is **Spanish** (`<html lang="es">`).

Vue 3 (`<script setup lang="ts">`) + Vite 7 + TypeScript strict + Pinia + vue-router 4 + Sass. Package manager: **pnpm** (pnpm-workspace.yaml present).

## Commands

```bash
pnpm dev        # vite dev server (se comporta como SPA normal)
pnpm build      # vue-tsc -b && vite-ssg build → prerenderiza 26 páginas a HTML estático
pnpm preview    # sirve dist/
pnpm exec vue-tsc -b --noEmit   # solo typecheck
```

`dist/` es 100% estático. En el hosting hace falta un **fallback SPA a `/index.html`** solo para rutas no prerenderizadas (el 404), sirviendo antes los `.html` reales.

No test runner, linter, or formatter is configured. `pnpm build` is the only gate — it fails on type errors and on `noUnusedLocals` / `noUnusedParameters`.

## Architecture

- `src/services/httpBase.ts` — `APIBase` abstract class. All API access goes through a subclass of it, never raw axios. It owns base-URL normalization (auto-appends `/api`), `Bearer` header from `localStorage.access_token`, 15s timeout, FormData content-type handling, and normalizes every failure into `ApiError` (`src/types/index.ts`). Its `get/post/put/patch/delete` are `protected` — that is deliberate: subclass and expose named domain methods.
- 401 handling is event-based: the response interceptor dispatches `window` event `auth:token-expired`. Anything reacting to logout listens for that event; do not add redirect logic inside services.
- `src/stores/user.ts` — Pinia options-style store (`state`/`actions`, not setup-style). `hydrate()` reads localStorage on boot; `clear()` is the logout path.
- `src/router/index.ts` — rutas lazy y `scrollBehavior` (arriba al cambiar de página, suave solo para anclas). Se eliminó el guard `requiresAuth` del scaffold: es un sitio público y la ruta `/login` a la que redirigía nunca existió.
### Contenido y vistas

El contenido **no** se consulta a ninguna API: vive en `src/config/` (`site.ts`, `zonas.ts`, `faq.ts`, `testimonios.ts`), rescatado de depil.com.ec antes de que ese WordPress se apague. Para cambiar textos, sedes, zonas, FAQ o reviews se editan esos archivos, no los componentes: de ahí salen a la vez la UI, las rutas prerenderizadas, el sitemap y el `llms.txt`.

`HomeView.vue` compone nueve secciones en orden; cada una es un componente en `src/components/sections/` con su propio `id` para el anclaje del header. Las demás vistas (`ZonasView`, `ZonaView`, `SedesView`, `SedeView`, `PromocionesView`, `FaqView`, `NotFoundView`) comparten `PageHero` para migas + H1.

Añadir una zona o una sede a su archivo de config genera automáticamente su página, su entrada en el sitemap y su enlazado interno. No hay lista de rutas que mantener a mano salvo `src/config/rutas.ts`.

### SEO y GEO

- **Prerender**: `main.ts` usa `ViteSSG`. Es obligatorio, no cosmético: los crawlers generativos (GPTBot, PerplexityBot, ClaudeBot) no ejecutan JavaScript y verían un `<div id="app">` vacío.
- **Metadatos**: siempre vía `useSeo()` (que envuelve `useHead` de unhead). Nunca tocar `document.head` a mano — eso no llega al HTML estático. `@unhead/vue` está **pinneado a v2** para coincidir con el que usa vite-ssg; con la v3 hay dos instancias y `useHead` deja de aplicarse en silencio.
- **JSON-LD**: los constructores viven en `src/config/seo.ts` (`organizacionLd`, `sedeLd`, `zonaLd`, `faqLd`, `resenasLd`, `migasLd`). El NAP de `NEGOCIO` debe coincidir carácter a carácter con el Google Business Profile.
- **robots.txt, sitemap.xml y llms.txt** los genera `plugins/seo-archivos.ts` en cada build desde la misma config. No editarlos a mano en `dist/`.
- `tsconfig.node.json` solo incluye los módulos de config sin dependencias (`rutas`, `site`, `zonas`, `faq`); ese proyecto no conoce el alias `@/`, así que esos archivos no pueden importar nada con `@/`.

### Regla dura: una sola raíz por vista

Cada componente de `src/views/` **debe** tener un único nodo raíz (`<div class="pagina">`). `App.vue` envuelve el `RouterView` en `<Transition mode="out-in">`, y `<Transition>` no monta un componente con varios nodos raíz: el resultado es una página con solo header y footer, sin error visible en consola. Si añades una vista, envuélvela.

`BaseButton` acepta `to` (RouterLink, navegación interna) o `href` (`<a>`, solo enlaces externos: WhatsApp, Maps, tel:, mailto:). Usar `href` para una ruta interna recarga toda la app.

### Guías (nunca «blog»)

El contenido editorial se llama **Guías** y vive en `/guias` + `/guias/:slug`. Es decisión de marca: no usar «blog» ni «artículos» en copy, rutas ni etiquetas.

Los 10 textos se rescataron del WordPress vía su API REST y viven en `src/config/guias.ts` troceados en bloques (`h2`/`p`/`li`). Se renderizan como elementos reales, **nunca con `v-html`**: el HTML venía de un CMS ajeno. Los slugs son los mismos del WordPress para poder redirigir desde la raíz (`/depilacion-definitiva` → `/guias/depilacion-definitiva`), y esas redirecciones se generan solas desde `SLUGS_ANTIGUOS`.

Todos los CTA de guías apuntan a WhatsApp con un mensaje distinto por contexto, para saber desde dónde escribió la persona.

### Si una edición "no se aplica", busca archivos `.js` junto a los `.ts`

`tsconfig.node.json` lleva `"noEmit": true` y **no debe perderlo**. Sin él, `vue-tsc -b` escribe los `.js` compilados al lado de los `.ts` de su `include` (`src/config/*.js`, `src/router/index.js`), y **Vite resuelve `.js` antes que `.ts`**: la app se compila en silencio contra código viejo y las ediciones parecen ignorarse. Si vuelve a pasar:

```bash
find src plugins -name '*.js' -not -path '*/node_modules/*' -delete
```

Ese proyecto de TS solo existe para typechequear `vite.config.ts` y los módulos de datos que este importa; nunca debe emitir.

### Bloqueo de scroll

Nadie toca `document.body.style.overflow` directamente: todo pasa por `composables/useBloqueoScroll.ts`. Lleva contador de referencias (menú + modal a la vez) y repone el ancho de la barra como `padding-right`; sin eso la página salta 5 px al abrir el menú. Publica `--ancho-scrollbar` para overlays fijos, pero un overlay con su propio `overflow-y: auto` **no** debe sumarlo — usa `scrollbar-gutter: stable both-edges` o descuadra el doble.

### Trampas de SSR

Todo lo que toque `window`/`document` va en `onMounted` o detrás de `!import.meta.env.SSR`. **No** sirve `typeof window !== 'undefined'`: vite-ssg corre con `mock: true` e inyecta un `window` falso, así que esa comprobación da verdadero en Node (fue lo que rompió `gsap.registerPlugin(ScrollTrigger)`).

- `src/layout/` — `AppHeader` (fijo y minimal: logo, CTA y disparador del menú), `MenuOverlay` + `MenuLateral` + `MenuPreview` (menú fullscreen estilo Awwwards), `AppFooter`, `WhatsappFab`.

El header no lleva navegación inline en ningún breakpoint: toda la navegación vive en `MenuOverlay`. Su apertura es una timeline GSAP **pausada, construida una sola vez** en `onMounted` — abrir hace `play()` y cerrar `reverse()` con `timeScale(1.85)`; no se recrea en cada apertura. `z-index`: overlay 950, header 960 (para no tapar el botón cerrar), modales 1000, toasts 1100.

En el CSS del menú, la regla que ilumina el enlace señalado **debe** repetir `ul:hover` (`ul:hover a:hover .principal__texto`): la regla que apaga los demás (`ul:hover a .principal__texto`) tiene mayor especificidad y si no se apagaría también el que estás señalando.
- `src/components/ui/` — primitivas compartidas: `BaseButton`, `BaseModal`, `CldImage`, `SectionHeader`, más los tres hosts globales montados una única vez en `App.vue`: `ModalHost`, `ConfirmDialog`, `ToastHost`.
- `src/composables/` — `useCloudinary`, `useScrollReveal`, `useModal`, `useToast`.

Los CTA apuntan a WhatsApp mediante `whatsappUrl(mensaje)` de `config/site.ts`, nunca a URLs escritas a mano. El formulario de contacto (`ContactoSection`) valida en cliente, pide confirmación y abre WhatsApp; cuando exista backend, sustituir sólo el cuerpo de `enviar()` por una subclase de `APIBase` conservando el flujo confirmar → toast.

## Styling

`vite.config.ts` injects `@use "@/styles/index.scss" as *;` into **every** SCSS block. So `$primary`, `$font-principal`, etc. are available in any `<style lang="scss">` without importing — never re-import `index.scss` in a component (it double-emits and Sass will warn).

- `colorVariables.module.scss` — brand palette. `fonts.module.scss` — Montserrat (primary) / Inter (secondary), loaded from Google Fonts.
- `global.scss` defines CSS custom properties `--bg/--text/--border/--accent` plus a `[data-theme='dark']` override. Prefer these vars for anything theme-reactive; use raw `$vars` for fixed brand color.
- `index.scss` shadows Sass's deprecated `lighten()`/`darken()` with `color.adjust`-based versions taking a unitless number (`lighten($primary, 10)`), optional `$method: 'scale'`.
- Alias `@` → `src/` in both Vite and tsconfig.

## Project conventions

- **Hard cap: 400 lines per component.** Split into subcomponents in `src/components/<section>/` and extract logic into `src/composables/` before crossing it.
- Icons: Font Awesome via **CDN** (`<link>` in `index.html`), used as `<i class="fa-solid fa-...">`. Do not add the npm packages.
- Animation: **GSAP** (+ ScrollTrigger) for scroll/entrance sequences; plain SCSS/CSS transitions for hover and micro-interactions. Every effect must be authored for **both mobile and desktop** — gate with `gsap.matchMedia()` and honor `prefers-reduced-motion`.
- Page structure is section-based: one component per landing section, composed in a view.
- Modals, confirmations, and toasts are shared components in `src/components/ui/`, driven by a composable — not ad-hoc `v-if` blocks per section, and never `alert()`/`confirm()`.

## Cloudinary

Cloud name `nj50iklg`. Los 54 assets del sitio están **subidos** (delivery type `upload`), no espejeados, bajo el prefijo `depil/`: `brand/`, `features/`, `sedes/`, `zonas/`, `resultados/`, `promos/`, `testimonios/`, `blog/`, `video/`. Se subieron a propósito para que la web no dependa de depil.com.ec, que se apagará.

Nunca construyas URLs a mano: usa `cldUrl` / `cldSrcset` / `cldVideoUrl` de `composables/useCloudinary.ts`, o el componente `CldImage` (que ya trae `srcset`, `sizes` y blur-up). Toda transformación lleva `f_auto,q_auto,dpr_auto` y ancho explícito.

La **api_key y el api_secret son sólo de servidor**: no pueden aparecer en `src/`, en un `VITE_*` (Vite los inlinea en el bundle público) ni en este archivo. Cualquier subida firmada va en el backend detrás de `VITE_API_BASE_URL`.

## Environment

`.env.example` holds `VITE_API_BASE_URL` (default `http://localhost:8100/api`). `httpBase.ts` appends `/api` if missing, so both forms work.
