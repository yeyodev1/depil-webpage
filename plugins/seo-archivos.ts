import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import type { Plugin } from 'vite'
import { SEDES, SITE } from '../src/config/site'
import { ZONAS } from '../src/config/zonas'
import { FAQ } from '../src/config/faq'
import { GUIAS } from '../src/config/guias'
import { PROMOCIONES } from '../src/config/testimonios'
import { rutasEstaticas } from '../src/config/rutas'

const DOMINIO = 'https://depil.com.ec'

/** Prioridad y frecuencia por tipo de URL, para el sitemap. */
function pesoDeRuta(ruta: string) {
  if (ruta === '/') return { prioridad: '1.0', frecuencia: 'weekly' }
  if (ruta === '/promociones') return { prioridad: '0.9', frecuencia: 'weekly' }
  if (ruta.startsWith('/sedes/')) return { prioridad: '0.9', frecuencia: 'monthly' }
  if (ruta.startsWith('/depilacion-laser/')) return { prioridad: '0.8', frecuencia: 'monthly' }
  return { prioridad: '0.7', frecuencia: 'monthly' }
}

function sitemap(fecha: string): string {
  const urls = rutasEstaticas()
    .map((ruta) => {
      const { prioridad, frecuencia } = pesoDeRuta(ruta)
      const loc = `${DOMINIO}${ruta === '/' ? '/' : ruta}`
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${fecha}</lastmod>
    <changefreq>${frecuencia}</changefreq>
    <priority>${prioridad}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function robots(): string {
  return `# robots.txt — ${DOMINIO}

User-agent: *
Allow: /

# Crawlers de motores generativos (GEO). Se permiten a propósito: queremos que
# ChatGPT, Perplexity, Claude y los AI Overviews de Google puedan citar a Depil.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${DOMINIO}/sitemap.xml
`
}

/**
 * llms.txt — resumen en markdown pensado para modelos de lenguaje.
 * Convención de llmstxt.org: hechos concretos y verificables, sin marketing.
 */
function llms(): string {
  const zonas = ZONAS.map((z) => `- [${z.nombre}](${DOMINIO}/depilacion-laser/${z.id}): ${z.descripcion}`).join('\n')
  const sedes = SEDES.map((s) => `- [${s.nombre}](${DOMINIO}/sedes/${s.id}): ${s.direccion}, ${s.ciudad}, Ecuador.`).join('\n')
  const faq = FAQ.map((f) => `### ${f.pregunta}\n${f.respuesta}`).join('\n\n')
  const guias = GUIAS.map((g) => `- [${g.titulo}](${DOMINIO}/guias/${g.slug}): ${g.descripcion}`).join('\n')
  const promos = PROMOCIONES.map((p) => `- ${p.alt}`).join('\n')
  const horario = SITE.horarios.map((h) => `${h.dias}: ${h.horas}`).join(' · ')

  return `# Depil Ec

> Centro de depilación láser definitiva en Ecuador con tecnología Tri-Laser & 4D
> aprobada y certificada por la FDA. Cinco sedes: Quito, Guayaquil, Ceibos,
> Samborondón y Manta.

## Datos de contacto
- Sitio web: ${DOMINIO}
- Teléfono / WhatsApp: ${SITE.telefono}
- Email: ${SITE.email}
- Horario: ${horario}
- Idioma de atención: español
- País: Ecuador

## Qué es la tecnología Tri-Laser & 4D
Combina tres y cuatro longitudes de onda en un solo disparo para atacar el vello
a distintas profundidades del folículo. Es efectiva en todos los fototipos de
piel (clara, oscura y bronceada) y cuenta con sistema de enfriamiento, por lo que
el tratamiento es prácticamente indoloro. Está aprobada por la FDA.

## Datos clave del tratamiento
- Sesiones para una reducción definitiva: entre 6 y 8.
- Resultados visibles: desde la primera sesión.
- Duración de una sesión: 10-15 minutos en zonas pequeñas (bigote, axilas);
  30-45 minutos en zonas amplias (piernas completas).
- Preparación: rasurar la zona 24 horas antes; no usar cera ni pinzas.
- Cuidado posterior: protector solar, hidratación y evitar sauna 48 horas.

## Sedes
${sedes}

## Zonas de tratamiento (${ZONAS.length})
${zonas}

## Preguntas frecuentes

${faq}

## Promociones vigentes
Más detalle en ${DOMINIO}/promociones. Los precios pueden variar; confirmar por WhatsApp.
${promos}

## Resultados
Fotos reales de antes y después por zona: ${DOMINIO}/resultados

## Guías
${guias}
`
}

/** Escribe robots.txt, sitemap.xml y llms.txt en dist/ al terminar el build. */
export function seoArchivos(): Plugin {
  let esSsr = false
  let salida = 'dist'

  return {
    name: 'depil-seo-archivos',
    apply: 'build',
    configResolved(config) {
      esSsr = !!config.build.ssr
      salida = config.build.outDir
    },
    closeBundle() {
      // El build de servidor de vite-ssg escribe en un temporal: se ignora.
      if (esSsr) return

      const fecha = new Date().toISOString().slice(0, 10)
      const archivos: Record<string, string> = {
        'robots.txt': robots(),
        'sitemap.xml': sitemap(fecha),
        'llms.txt': llms(),
      }

      for (const [nombre, contenido] of Object.entries(archivos)) {
        const destino = resolve(process.cwd(), salida, nombre)
        mkdirSync(dirname(destino), { recursive: true })
        writeFileSync(destino, contenido, 'utf8')
      }

      console.log(`[seo] robots.txt, sitemap.xml (${rutasEstaticas().length} URLs) y llms.txt generados`)
    },
  }
}
