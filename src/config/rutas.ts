/**
 * Lista de URLs estáticas del sitio.
 *
 * Vive aparte del router a propósito: `vite.config.ts` la importa para saber qué
 * prerenderizar, y `vite.config.ts` se typechequea con `tsconfig.node.json`, que
 * no conoce el alias `@/` ni las libs del DOM. Por eso este archivo solo importa
 * datos planos por ruta relativa.
 */
import { SEDES } from './site'
import { ZONAS } from './zonas'
import { GUIAS } from './guias'

/**
 * Rutas que se prerenderizan pero NO van al sitemap.
 *
 * `/404` genera `dist/404.html`, que Vercel sirve con estado HTTP 404 real para
 * cualquier URL desconocida. Sin él habría que reescribir a `index.html`, que
 * responde 200 a todo y Google lo trata como «soft 404».
 */
export function rutasNoIndexables(): string[] {
  return ['/404']
}

export function rutasEstaticas(): string[] {
  return [
    '/',
    '/nosotros',
    '/depilacion-laser',
    ...ZONAS.map((z) => `/depilacion-laser/${z.id}`),
    '/sedes',
    ...SEDES.map((s) => `/sedes/${s.id}`),
    '/resultados',
    '/promociones',
    '/guias',
    ...GUIAS.map((g) => `/guias/${g.slug}`),
    '/preguntas-frecuentes',
    '/contacto',
    '/politica-de-privacidad',
  ]
}
