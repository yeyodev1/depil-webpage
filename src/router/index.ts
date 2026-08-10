import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NoEncontrado',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, guardado) {
    if (guardado) return guardado
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    // Cambio de ruta real → arriba sin animación; el smooth se reserva para anclas.
    if (to.path !== from.path) return { left: 0, top: 0 }
    return { left: 0, top: 0, behavior: 'smooth' }
  },
})

export default router
