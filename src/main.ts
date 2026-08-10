import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router'
import '@/styles/global.scss'

/**
 * `ViteSSG` prerenderiza cada ruta a HTML estático en `pnpm build`.
 *
 * No es un lujo: los crawlers de los motores generativos (GPTBot,
 * PerplexityBot, ClaudeBot, Google-Extended) no ejecutan JavaScript. Sin
 * prerender verían `<div id="app"></div>` vacío y el sitio sería invisible
 * tanto para GEO como para gran parte del SEO.
 *
 * En desarrollo (`pnpm dev`) se comporta como una SPA normal.
 */
export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, guardado) {
      if (guardado) return guardado
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
      return { left: 0, top: 0 }
    },
  },
  ({ app }) => {
    app.use(createPinia())
  },
)
