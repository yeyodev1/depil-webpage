/**
 * Fuente única de verdad para SEO y GEO (Generative Engine Optimization).
 *
 * GEO = optimizar para que ChatGPT, Perplexity, Gemini y los AI Overviews de
 * Google puedan extraer y citar datos correctos. En la práctica eso exige:
 * datos estructurados JSON-LD, respuestas autocontenidas en texto plano,
 * NAP (nombre-dirección-teléfono) idéntico en todas partes y un `llms.txt`.
 */
import { SEDES, SITE, type Sede } from './site'
import { ZONAS, type Zona } from './zonas'
import { FAQ } from './faq'
import { TESTIMONIOS } from './testimonios'
import { cldUrl } from '@/composables/useCloudinary'

export const DOMINIO = 'https://depil.com.ec'

export const url = (ruta = '/') => `${DOMINIO}${ruta === '/' ? '/' : ruta.replace(/\/$/, '')}`

export interface MetaSeo {
  titulo: string
  descripcion: string
  ruta: string
  imagen?: string
  /** `noindex` para páginas utilitarias (gracias, 404). */
  indexable?: boolean
  jsonLd?: Record<string, unknown>[]
  /** Geoposición de la página; emite `geo.position` e `ICBM`. */
  geo?: { lat: number; lng: number; lugar: string; region: string }
  /** Si la página es editorial (guías): emite `og:type=article` y `article:published_time`. */
  articulo?: { publicada: string }
}

const IMAGEN_DEFECTO = cldUrl(SITE.portada, { ancho: 1200, alto: 630, recorte: 'fill' })

// ── Entidades base reutilizables ───────────────────────────────────────────

/** NAP canónico. Debe coincidir carácter a carácter con Google Business Profile. */
export const NEGOCIO = {
  '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness'],
  '@id': `${DOMINIO}/#negocio`,
  name: 'Depil Ec',
  alternateName: 'Depil Tri-Laser',
  description:
    'Centro de depilación láser definitiva con tecnología Tri-Laser & 4D certificada por la FDA, con sedes en Quito, Guayaquil, Samborondón, Ceibos y Manta.',
  url: DOMINIO,
  telephone: SITE.telefonoRaw,
  email: SITE.email,
  // LocalBusiness exige address; sin ella Search Console la reporta como faltante.
  // Se usa la sede principal (Quito); cada sede emite la suya en `sedeLd`.
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Edificio Gaia, piso 7 oficina 70. Av. Eloy Alfaro y Mariana de Jesús',
    addressLocality: 'Quito',
    addressRegion: 'Pichincha',
    addressCountry: 'EC',
  },
  logo: cldUrl(SITE.logoDorado, { ancho: 512, recorte: 'fit' }),
  image: IMAGEN_DEFECTO,
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Efectivo, Tarjeta de crédito, Tarjeta de débito',
  areaServed: ['Quito', 'Guayaquil', 'Samborondón', 'Manta', 'Ecuador'],
  sameAs: [
    'https://www.instagram.com/depil.ec/',
    'https://www.facebook.com/depiltrilaser/?locale=es_LA',
    'https://www.tiktok.com/@depil.ec',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
}

export function organizacionLd(): Record<string, unknown> {
  return { '@context': 'https://schema.org', ...NEGOCIO }
}

export function sitioLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${DOMINIO}/#sitio`,
    url: DOMINIO,
    name: 'Depil Ec',
    inLanguage: 'es-EC',
    publisher: { '@id': `${DOMINIO}/#negocio` },
  }
}

/** Enlace a Google Maps de una sede (lo usan la UI y `hasMap` del JSON-LD). */
export function mapsUrl(sede: Sede): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sede.mapsQuery)}`
}

/**
 * Una ficha LocalBusiness por sede: la base del SEO local.
 *
 * `geo` + `hasMap` + `areaServed` son las tres señales que Google y los motores
 * generativos usan para resolver consultas del tipo "depilación láser cerca de
 * mí" o "en Samborondón". Sin coordenadas la ficha queda a medias.
 */
export function sedeLd(sedeId: string): Record<string, unknown> | null {
  const sede = SEDES.find((s) => s.id === sedeId)
  if (!sede) return null
  return {
    '@context': 'https://schema.org',
    ...NEGOCIO,
    '@id': `${DOMINIO}/sedes/${sede.id}#negocio`,
    name: sede.nombre,
    url: url(`/sedes/${sede.id}`),
    image: cldUrl(sede.imagen, { ancho: 1200, alto: 630, recorte: 'fill' }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: sede.direccion,
      addressLocality: sede.ciudad,
      addressRegion: REGION_POR_CIUDAD[sede.ciudad] ?? 'Ecuador',
      addressCountry: 'EC',
      ...(sede.postal ? { postalCode: sede.postal } : {}),
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: sede.geo.lat,
      longitude: sede.geo.lng,
    },
    hasMap: mapsUrl(sede),
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: sede.geo.lat,
        longitude: sede.geo.lng,
      },
      geoRadius: 15000,
    },
    parentOrganization: { '@id': `${DOMINIO}/#negocio` },
  }
}

/** Provincia de cada ciudad, para `addressRegion`. */
const REGION_POR_CIUDAD: Record<string, string> = {
  Quito: 'Pichincha',
  Guayaquil: 'Guayas',
  Samborondón: 'Guayas',
  Manta: 'Manabí',
}

export function serviciosLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Zonas de depilación láser',
    numberOfItems: ZONAS.length,
    itemListElement: ZONAS.map((z, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: z.nombre,
      url: url(`/depilacion-laser/${z.id}`),
    })),
  }
}

export function zonaLd(zona: Zona): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${DOMINIO}/depilacion-laser/${zona.id}#servicio`,
    name: `Depilación láser ${zona.nombre}`,
    serviceType: 'Depilación láser definitiva',
    description: zona.descripcion,
    image: cldUrl(zona.imagen, { ancho: 1200, alto: 630, recorte: 'fill' }),
    url: url(`/depilacion-laser/${zona.id}`),
    provider: { '@id': `${DOMINIO}/#negocio` },
    areaServed: NEGOCIO.areaServed,
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 18 },
  }
}

export function faqLd(
  preguntas: { pregunta: string; respuesta: string }[] = FAQ,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((f) => ({
      '@type': 'Question',
      name: f.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
    })),
  }
}

/**
 * Reseñas como nodo que se fusiona con la entidad principal vía `@id`, sin
 * re-declarar el negocio: dos bloques con la misma entidad completa confunden a
 * Google. Ojo: son reseñas del propio sitio («self-serving»), Google no las
 * muestra como estrellas; se emiten como señal para motores generativos.
 */
export function resenasLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': NEGOCIO['@type'],
    '@id': `${DOMINIO}/#negocio`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(TESTIMONIOS.length),
      bestRating: '5',
    },
    review: TESTIMONIOS.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.nombre },
      reviewRating: { '@type': 'Rating', ratingValue: String(t.estrellas), bestRating: '5' },
      reviewBody: t.texto,
    })),
  }
}

export function migasLd(items: { nombre: string; ruta: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nombre,
      item: url(it.ruta),
    })),
  }
}

export const SEO_DEFECTO: MetaSeo = {
  titulo: 'Depil Ec | Depilación Láser Definitiva Tri-Laser & 4D en Ecuador',
  // ≤160 caracteres: keyword y ciudades al inicio para que no se trunque en SERP.
  descripcion:
    'Depilación láser definitiva Tri-Laser & 4D aprobada por la FDA en Quito, Guayaquil, Samborondón, Ceibos y Manta. Segura e indolora en todo tipo de piel.',
  ruta: '/',
  imagen: IMAGEN_DEFECTO,
  indexable: true,
}

export { IMAGEN_DEFECTO }
