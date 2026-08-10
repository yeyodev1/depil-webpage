/**
 * Helpers de entrega Cloudinary.
 *
 * Todas las imágenes viven subidas en la cuenta `nj50iklg` bajo el prefijo `depil/`.
 * NUNCA se usa el api_key/api_secret en el cliente: solo URLs públicas de delivery.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'nj50iklg'
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`

/** Anchos usados para generar `srcset`. */
export const ANCHOS_RESPONSIVE = [320, 480, 640, 960, 1280, 1600] as const

export interface OpcionesImagen {
  /** Ancho en px. Siempre explícito para evitar descargar el original. */
  ancho?: number
  /** Alto en px (requiere `recorte`). */
  alto?: number
  /** Modo de recorte de Cloudinary. */
  recorte?: 'fill' | 'fit' | 'thumb' | 'scale' | 'crop'
  /** Relación de aspecto, ej. `'1:1'` o `'4:5'`. */
  aspecto?: string
  /** Zona de interés al recortar. */
  gravedad?: 'auto' | 'face' | 'faces' | 'center'
  /** Calidad. Por defecto `auto`. */
  calidad?: string
  /** Transformaciones extra crudas, ej. `'e_blur:800'`. */
  extra?: string
}

/**
 * Modos de recorte que aceptan `g_`. Con `c_fit` / `c_scale` / `c_limit` no hay
 * recorte que posicionar y Cloudinary responde 400, así que la gravedad se omite
 * en silencio en vez de romper la imagen.
 */
const RECORTES_CON_GRAVEDAD = new Set(['fill', 'thumb', 'crop'])

function transformaciones(o: OpcionesImagen = {}): string {
  const t = ['f_auto', `q_${o.calidad ?? 'auto'}`]
  if (o.ancho) t.push(`w_${o.ancho}`)
  if (o.alto) t.push(`h_${o.alto}`)
  if (o.aspecto) t.push(`ar_${o.aspecto}`)
  if (o.recorte) t.push(`c_${o.recorte}`)
  if (o.gravedad && o.recorte && RECORTES_CON_GRAVEDAD.has(o.recorte)) {
    t.push(`g_${o.gravedad}`)
  }
  t.push('dpr_auto')
  if (o.extra) t.push(o.extra)
  return t.join(',')
}

/** URL de una imagen. `publicId` sin extensión, ej. `depil/zonas/rostro`. */
export function cldUrl(publicId: string, opciones: OpcionesImagen = {}): string {
  return `${BASE}/image/upload/${transformaciones(opciones)}/${publicId}`
}

/** `srcset` responsive. Respeta recorte/aspecto de las opciones base. */
export function cldSrcset(
  publicId: string,
  opciones: OpcionesImagen = {},
  anchos: readonly number[] = ANCHOS_RESPONSIVE,
): string {
  return anchos.map((w) => `${cldUrl(publicId, { ...opciones, ancho: w })} ${w}w`).join(', ')
}

/** Placeholder borroso y diminuto para el efecto blur-up. */
export function cldPlaceholder(publicId: string, opciones: OpcionesImagen = {}): string {
  return cldUrl(publicId, { ...opciones, ancho: 24, calidad: 'auto:low', extra: 'e_blur:1200' })
}

/** URL de un video subido (`depil/video/...`). */
export function cldVideoUrl(publicId: string, ancho = 720): string {
  return `${BASE}/video/upload/f_auto,q_auto,w_${ancho}/${publicId}.mp4`
}

/** Poster (primer frame) de un video. */
export function cldVideoPoster(publicId: string, ancho = 720): string {
  return `${BASE}/video/upload/f_auto,q_auto,w_${ancho},so_0/${publicId}.jpg`
}

export function useCloudinary() {
  return { cldUrl, cldSrcset, cldPlaceholder, cldVideoUrl, cldVideoPoster }
}
