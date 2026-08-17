/**
 * Datos institucionales de Depil Ec.
 * Fuente original: https://depil.com.ec (rescatado antes del apagado del WordPress).
 */

export interface Sede {
  id: string
  nombre: string
  ciudad: string
  direccion: string
  /** Código postal, separado de `direccion` para emitirse como `postalCode` en el JSON-LD. */
  postal?: string
  imagen: string
  mapsQuery: string
  /**
   * Coordenadas para el `LocalBusiness` de cada sede (SEO local).
   *
   * Geocodificadas contra OpenStreetMap el 2026-08-10.
   * `precision: 'edificio'` = el nodo del edificio existe en OSM y coincide con
   * la dirección. `precision: 'via'` = solo se ubicó la avenida, así que el
   * punto cae en la calle y puede desviarse ~100-200 m.
   *
   * Confírmalas contra el pin real del Google Business Profile de cada sede:
   * en SEO local la coherencia con GBP pesa más que la exactitud absoluta.
   */
  geo: { lat: number; lng: number; precision: 'edificio' | 'via' }
}

export interface EnlaceSocial {
  id: string
  nombre: string
  url: string
  icono: string
}

// Número único del negocio (confirmado por Diego el 2026-08-17). Debe coincidir
// con el del Google Business Profile cuando se cree.
export const WHATSAPP_NUMERO = '593989279945'

export const WHATSAPP_MENSAJE_DEFECTO =
  'Hola, vengo de tu sitio web 😁, quisiera hablar con una especialista sobre depilación láser'

/** Construye un link de WhatsApp con mensaje pre-cargado. */
export function whatsappUrl(mensaje: string = WHATSAPP_MENSAJE_DEFECTO): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(mensaje)}`
}

export const SITE = {
  nombre: 'Depil Ec',
  claim: 'La depilación definitiva',
  tecnologia: 'Tri-Laser & 4D',
  telefono: '+(593) 989 279 945',
  telefonoRaw: '+593989279945',
  email: 'depil.atencioncliente@gmail.com',
  horarios: [
    { dias: 'Lunes - Viernes', horas: '09H00 - 19H00' },
    { dias: 'Sábados', horas: '09H00 - 19H00' },
    { dias: 'Domingos', horas: 'Cerrado' },
  ],
  logoDorado: 'depil/brand/logo-dorado',
  logoBlanco: 'depil/brand/logo-blanco',
  isotipo: 'depil/brand/isotipo',
  portada: 'depil/brand/portada',
  selloFda: 'depil/brand/fda',
  mapaEcuador: 'depil/brand/mapa-ecuador',
  videoIntro: 'depil/video/intro-trilaser',
} as const

/** Tupla no vacía: garantiza a TS que `SEDES[0]` siempre existe. */
export const SEDES: [Sede, ...Sede[]] = [
  {
    id: 'quito',
    nombre: 'Depil Quito',
    ciudad: 'Quito',
    direccion: 'Edificio Gaia, piso 7 oficina 70. Av. Eloy Alfaro y Mariana de Jesús',
    imagen: 'depil/sedes/quito',
    mapsQuery: 'Edificio Gaia Av Eloy Alfaro y Mariana de Jesus Quito',
    geo: { lat: -0.191226, lng: -78.487053, precision: 'edificio' },
  },
  {
    id: 'ceibos',
    nombre: 'Depil Ceibos',
    ciudad: 'Guayaquil',
    direccion:
      'Edificio Cien, Torre A oficina 601. Km 6,5 Av. del Bombero, urbanización La Vista de San Eduardo',
    imagen: 'depil/sedes/ceibos',
    mapsQuery: 'Edificio Cien Torre A Av del Bombero La Vista de San Eduardo Guayaquil',
    geo: { lat: -2.168394, lng: -79.936341, precision: 'via' },
  },
  {
    id: 'guayaquil',
    nombre: 'Depil Guayaquil',
    ciudad: 'Guayaquil',
    direccion: 'Edificio Trade Building, Joaquín José Orrantia González y Guayaquil',
    postal: '090513',
    imagen: 'depil/sedes/guayaquil',
    mapsQuery: 'Trade Building Joaquin Jose Orrantia Guayaquil',
    geo: { lat: -2.154974, lng: -79.890233, precision: 'edificio' },
  },
  {
    id: 'samborondon',
    nombre: 'Depil Samborondón',
    ciudad: 'Samborondón',
    direccion: 'Los Arcos, La Plaza 1. Samborondón',
    postal: '092301',
    imagen: 'depil/sedes/samborondon',
    mapsQuery: 'Los Arcos La Plaza 1 Samborondon',
    geo: { lat: -2.140993, lng: -79.865974, precision: 'via' },
  },
  {
    id: 'manta',
    nombre: 'Depil Manta',
    ciudad: 'Manta',
    direccion: 'Edificio Manta Business Center, Torre B piso 6 oficina 604',
    imagen: 'depil/sedes/manta',
    mapsQuery: 'Manta Business Center Torre B Manta',
    geo: { lat: -0.942182, lng: -80.733988, precision: 'edificio' },
  },
]

export const REDES: EnlaceSocial[] = [
  {
    id: 'instagram',
    nombre: 'Instagram',
    url: 'https://www.instagram.com/depil.ec/',
    icono: 'fa-brands fa-instagram',
  },
  {
    id: 'facebook',
    nombre: 'Facebook',
    url: 'https://www.facebook.com/depiltrilaser/?locale=es_LA',
    icono: 'fa-brands fa-facebook-f',
  },
  {
    id: 'tiktok',
    nombre: 'TikTok',
    url: 'https://www.tiktok.com/@depil.ec',
    icono: 'fa-brands fa-tiktok',
  },
]

export interface EnlaceNav {
  id: string
  label: string
  /** Destino real. Las páginas propias pesan más en SEO que un ancla. */
  ruta: string
  /** Id de la sección equivalente en la home, para marcar el enlace activo. */
  seccion?: string
}

/** Todas apuntan a páginas propias: pesan más en SEO que un ancla de la home. */
export const NAV_LINKS: EnlaceNav[] = [
  { id: 'inicio', label: 'Inicio', ruta: '/', seccion: 'inicio' },
  { id: 'nosotros', label: 'Nosotros', ruta: '/nosotros', seccion: 'nosotros' },
  { id: 'zonas', label: 'Zonas', ruta: '/depilacion-laser', seccion: 'zonas' },
  { id: 'sedes', label: 'Sedes', ruta: '/sedes', seccion: 'sedes' },
  { id: 'resultados', label: 'Resultados', ruta: '/resultados', seccion: 'resultados' },
  { id: 'promociones', label: 'Promociones', ruta: '/promociones', seccion: 'promociones' },
  { id: 'guias', label: 'Guías', ruta: '/guias' },
  { id: 'faq', label: 'FAQ', ruta: '/preguntas-frecuentes', seccion: 'faq' },
  { id: 'contacto', label: 'Contacto', ruta: '/contacto', seccion: 'contacto' },
]

/** Enlaces legales, solo en el pie. */
export const NAV_LEGAL: EnlaceNav[] = [
  { id: 'privacidad', label: 'Política de privacidad', ruta: '/politica-de-privacidad' },
]

export interface Diferenciador {
  id: string
  titulo: string
  imagen: string
  icono: string
}

export const DIFERENCIADORES: Diferenciador[] = [
  {
    id: 'premium',
    titulo: 'Experiencia Premium',
    imagen: 'depil/features/experiencia-premium',
    icono: 'fa-solid fa-gem',
  },
  {
    id: 'especialistas',
    titulo: 'Especialistas altamente capacitadas',
    imagen: 'depil/features/especialistas',
    icono: 'fa-solid fa-user-nurse',
  },
  {
    id: 'protocolos',
    titulo: 'Protocolos personalizados',
    imagen: 'depil/features/protocolos',
    icono: 'fa-solid fa-clipboard-list',
  },
  {
    id: 'resultados',
    titulo: 'Resultados garantizados',
    imagen: 'depil/features/resultados',
    icono: 'fa-solid fa-award',
  },
]
