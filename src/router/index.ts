import type { RouteRecordRaw } from 'vue-router'
import { SLUGS_ANTIGUOS } from '@/config/guias'

export { rutasEstaticas } from '@/config/rutas'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
  { path: '/nosotros', name: 'Nosotros', component: () => import('@/views/NosotrosView.vue') },
  { path: '/contacto', name: 'Contacto', component: () => import('@/views/ContactoView.vue') },
  { path: '/resultados', name: 'Resultados', component: () => import('@/views/ResultadosView.vue') },
  {
    path: '/politica-de-privacidad',
    name: 'Privacidad',
    component: () => import('@/views/PrivacidadView.vue'),
  },
  {
    path: '/depilacion-laser',
    name: 'Zonas',
    component: () => import('@/views/ZonasView.vue'),
  },
  {
    path: '/depilacion-laser/:slug',
    name: 'Zona',
    component: () => import('@/views/ZonaView.vue'),
  },
  { path: '/sedes', name: 'Sedes', component: () => import('@/views/SedesView.vue') },
  { path: '/sedes/:slug', name: 'Sede', component: () => import('@/views/SedeView.vue') },
  {
    path: '/promociones',
    name: 'Promociones',
    component: () => import('@/views/PromocionesView.vue'),
  },
  {
    path: '/preguntas-frecuentes',
    name: 'Faq',
    component: () => import('@/views/FaqView.vue'),
  },
  { path: '/guias', name: 'Guias', component: () => import('@/views/GuiasView.vue') },
  { path: '/guias/:slug', name: 'Guia', component: () => import('@/views/GuiaView.vue') },

  // Rutas antiguas del WordPress: 301 lógico para no perder el enlazado externo.
  { path: '/faq', redirect: '/preguntas-frecuentes' },
  { path: '/zonas', redirect: '/depilacion-laser' },
  { path: '/blog', redirect: '/guias' },
  // Los artículos vivían en la raíz (`/depilacion-definitiva/`).
  ...SLUGS_ANTIGUOS.map((slug) => ({ path: `/${slug}`, redirect: `/guias/${slug}` })),
  // Ruta explícita para poder prerenderizar dist/404.html; el catch-all cubre
  // la navegación en cliente.
  { path: '/404', name: 'NoEncontrado404', component: () => import('@/views/NotFoundView.vue') },
  {
    path: '/:pathMatch(.*)*',
    name: 'NoEncontrado',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

// Este archivo NO crea el router: lo crea `ViteSSG` en `main.ts` a partir de
// `routes`, y ahí vive también el `scrollBehavior`.
//
// Antes se exportaba además una instancia propia con `createRouter`. Como
// `main.ts` importa `routes` de aquí, esa segunda instancia se construía en
// cada arranque —con su propio `createWebHistory()` y su `scrollRestoration`—
// sin que nadie la usara.
