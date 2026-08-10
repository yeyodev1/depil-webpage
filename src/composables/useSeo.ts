/**
 * Aplica title, metas, canonical, Open Graph y JSON-LD a la página actual.
 *
 * Usa `@unhead/vue` (lo monta vite-ssg) en lugar de tocar `document.head`
 * directamente: así las etiquetas quedan escritas en el HTML estático que
 * genera el prerender, que es justo lo que leen los crawlers que no ejecutan
 * JavaScript. Con manipulación manual del DOM el HTML servido saldría sin
 * metadatos.
 */
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { DOMINIO, IMAGEN_DEFECTO, SEO_DEFECTO, url, type MetaSeo } from '@/config/seo'

export function useSeo(fabrica: () => MetaSeo) {
  const m = computed(fabrica)

  const canonica = computed(() => url(m.value.ruta))
  const imagen = computed(() => m.value.imagen ?? IMAGEN_DEFECTO)
  const indexable = computed(() => m.value.indexable !== false)

  useHead(() => ({
    title: m.value.titulo,
    htmlAttrs: { lang: 'es-EC' },
    meta: [
      { name: 'description', content: m.value.descripcion },
      {
        name: 'robots',
        content: indexable.value
          ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          : 'noindex, follow',
      },

      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'es_EC' },
      { property: 'og:site_name', content: 'Depil Ec' },
      { property: 'og:title', content: m.value.titulo },
      { property: 'og:description', content: m.value.descripcion },
      { property: 'og:url', content: canonica.value },
      { property: 'og:image', content: imagen.value },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: m.value.titulo },
      { name: 'twitter:description', content: m.value.descripcion },
      { name: 'twitter:image', content: imagen.value },

      // Señales geográficas. Si la página es de una sede concreta se emite su
      // punto exacto; si no, el ámbito nacional.
      {
        name: 'geo.region',
        content: m.value.geo ? `EC-${m.value.geo.region}` : 'EC',
      },
      {
        name: 'geo.placename',
        content: m.value.geo?.lugar ?? 'Quito, Guayaquil, Samborondón, Manta',
      },
      ...(m.value.geo
        ? [
            { name: 'geo.position', content: `${m.value.geo.lat};${m.value.geo.lng}` },
            { name: 'ICBM', content: `${m.value.geo.lat}, ${m.value.geo.lng}` },
          ]
        : []),
    ],
    link: [
      { rel: 'canonical', href: canonica.value },
      { rel: 'alternate', hreflang: 'es-EC', href: canonica.value },
      { rel: 'alternate', hreflang: 'x-default', href: canonica.value },
    ],
    script: (m.value.jsonLd ?? []).map((datos) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(datos),
    })),
  }))
}

export { DOMINIO, SEO_DEFECTO }
