import { ViteSSG } from 'vite-ssg'
import { START_LOCATION } from 'vue-router'
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
    scrollBehavior(to, from, guardado) {
      // La navegación inicial NO debe tocar el scroll.
      //
      // El HTML está prerenderizado, así que se ve y se puede desplazar desde
      // el primer instante. Si el usuario empieza a bajar y el router resuelve
      // su navegación inicial después (al terminar de hidratar), un
      // `{ top: 0 }` aquí lo devolvía de golpe al inicio de la página.
      if (from === START_LOCATION) return false

      if (guardado) return guardado
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
      return { left: 0, top: 0 }
    },
  },
  ({ app }) => {
    app.use(createPinia())
  },
)
