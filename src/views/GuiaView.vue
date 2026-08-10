<script setup lang="ts">
/**
 * /guias/:slug — guía individual.
 *
 * El cuerpo se renderiza desde bloques tipados, nunca con `v-html`: el HTML
 * venía de un WordPress ajeno.
 *
 * SEO/GEO de la página:
 *  - `Article` con `wordCount` y `about` apuntando a los servicios que trata.
 *  - `FAQPage` generado con los `h2` interrogativos y su respuesta: es lo que
 *    Google y los motores generativos extraen y citan literalmente.
 *  - Enlazado interno hacia las zonas relacionadas.
 * Todos los CTA llevan a WhatsApp, con mensaje distinto según el punto de
 * lectura, para saber desde dónde escribió la persona.
 */
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import CldImage from '@/components/ui/CldImage.vue'
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { cldUrl } from '@/composables/useCloudinary'
import { DOMINIO, faqLd, migasLd, url } from '@/config/seo'
import { GUIAS, minutosLectura, preguntasDeGuia, type BloqueGuia } from '@/config/guias'
import { ZONAS } from '@/config/zonas'
import { whatsappUrl } from '@/config/site'

const route = useRoute()
const guia = computed(() => GUIAS.find((g) => g.slug === route.params.slug) ?? GUIAS[0]!)

/** Agrupa los `li` consecutivos: un <li> suelto fuera de <ul> es HTML inválido. */
type Nodo = { tipo: 'h2' | 'p'; texto: string } | { tipo: 'ul'; items: string[] }

function agrupar(bloques: BloqueGuia[]): Nodo[] {
  const out: Nodo[] = []
  for (const b of bloques) {
    const ultimo = out[out.length - 1]
    if (b.tipo === 'li') {
      if (ultimo?.tipo === 'ul') ultimo.items.push(b.texto)
      else out.push({ tipo: 'ul', items: [b.texto] })
    } else {
      out.push({ tipo: b.tipo, texto: b.texto })
    }
  }
  return out
}

const nodos = computed(() => agrupar(guia.value.bloques))
// El CTA se intercala tras el primer tercio, no a la mitad: así no parte una
// sección corta por el medio.
const corte = computed(() => Math.max(2, Math.ceil(nodos.value.length / 3)))
const parteA = computed(() => nodos.value.slice(0, corte.value))
const parteB = computed(() => nodos.value.slice(corte.value))

const zonasRel = computed(() =>
  guia.value.zonasRelacionadas
    .map((id) => ZONAS.find((z) => z.id === id))
    .filter((z): z is (typeof ZONAS)[number] => !!z),
)

const relacionadas = computed(() =>
  GUIAS.filter((g) => g.categoria === guia.value.categoria && g.slug !== guia.value.slug).slice(0, 3),
)

const migas = computed(() => [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Guías', ruta: '/guias' },
  { nombre: guia.value.titulo, ruta: `/guias/${guia.value.slug}` },
])

const waLectura = computed(() =>
  whatsappUrl(`Hola 😁, estaba leyendo "${guia.value.titulo}" en su web y quisiera más información.`),
)

const portada = computed(() =>
  cldUrl(guia.value.imagen, { ancho: 1200, alto: 630, recorte: 'fill' }),
)

useSeo(() => {
  const preguntas = preguntasDeGuia(guia.value)
  return {
    titulo: `${guia.value.titulo} | Depil Ec`,
    descripcion: guia.value.descripcion,
    ruta: `/guias/${guia.value.slug}`,
    imagen: portada.value,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guia.value.titulo,
        description: guia.value.descripcion,
        image: portada.value,
        datePublished: guia.value.fecha,
        dateModified: guia.value.fecha,
        inLanguage: 'es-EC',
        wordCount: guia.value.palabras,
        articleSection: guia.value.categoria,
        mainEntityOfPage: url(`/guias/${guia.value.slug}`),
        author: { '@type': 'Organization', name: 'Depil Ec', url: DOMINIO },
        publisher: { '@id': `${DOMINIO}/#negocio` },
        about: zonasRel.value.map((z) => ({
          '@type': 'Service',
          name: `Depilación láser ${z.nombre}`,
          url: url(`/depilacion-laser/${z.id}`),
        })),
      },
      ...(preguntas.length ? [faqLd(preguntas)] : []),
      migasLd(migas.value),
    ],
  }
})
</script>

<template>
  <div class="pagina">
    <PageHero
      :titulo="guia.titulo"
      :kicker="guia.categoria"
      :descripcion="guia.descripcion"
      :imagen-fondo="guia.imagen"
      :migas="migas"
    />

    <article class="guia">
      <div class="contenedor guia__cuerpo">
        <p class="guia__meta">
          <i class="fa-regular fa-clock" aria-hidden="true" />
          {{ minutosLectura(guia) }} min de lectura · {{ guia.palabras }} palabras
        </p>

        <template v-for="(n, i) in parteA" :key="`a-${i}`">
          <h2 v-if="n.tipo === 'h2'">{{ n.texto }}</h2>
          <ul v-else-if="n.tipo === 'ul'">
            <li v-for="(it, j) in n.items" :key="j">{{ it }}</li>
          </ul>
          <p v-else>{{ n.texto }}</p>
        </template>

        <aside class="cta-inline">
          <p><strong>¿Te lo resolvemos al instante?</strong></p>
          <BaseButton variante="whatsapp" icono="fa-brands fa-whatsapp" :href="waLectura">
            Escríbenos por WhatsApp
          </BaseButton>
        </aside>

        <template v-for="(n, i) in parteB" :key="`b-${i}`">
          <h2 v-if="n.tipo === 'h2'">{{ n.texto }}</h2>
          <ul v-else-if="n.tipo === 'ul'">
            <li v-for="(it, j) in n.items" :key="j">{{ it }}</li>
          </ul>
          <p v-else>{{ n.texto }}</p>
        </template>

        <nav v-if="zonasRel.length" class="guia__zonas" aria-label="Zonas relacionadas">
          <h2>Zonas relacionadas</h2>
          <ul>
            <li v-for="z in zonasRel" :key="z.id">
              <RouterLink :to="`/depilacion-laser/${z.id}`">
                <i :class="z.icono" aria-hidden="true" /> Depilación láser {{ z.nombre }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </article>

    <section class="cierre">
      <div class="contenedor">
        <h2>Agenda tu valoración gratuita</h2>
        <p>
          Una especialista revisa tu tipo de piel y el grosor del vello, y te dice exactamente
          cuántas sesiones necesitas. Sin compromiso.
        </p>
        <div class="cierre__botones">
          <BaseButton variante="whatsapp" tamano="lg" icono="fa-brands fa-whatsapp" :href="waLectura">
            Agendar por WhatsApp
          </BaseButton>
          <BaseButton variante="contorno" tamano="lg" to="/depilacion-laser">
            Ver todas las zonas
          </BaseButton>
        </div>
      </div>
    </section>

    <section v-if="relacionadas.length" class="mas">
      <div class="contenedor">
        <h2>Sigue leyendo</h2>
        <ul>
          <li v-for="r in relacionadas" :key="r.slug">
            <RouterLink :to="`/guias/${r.slug}`">
              <CldImage :public-id="r.imagen" :alt="r.titulo" :ancho="480" aspecto="16:9" sizes="30vw" />
              <span>{{ r.titulo }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.guia {
  @include seccion(2.5rem, 4rem);
  background: var(--bg);

  &__cuerpo {
    max-width: 44rem;

    h2 {
      margin: 2.25rem 0 0.85rem;
      font-size: clamp(1.15rem, 1rem + 0.7vw, 1.5rem);
      color: $primary;
    }

    p {
      margin-bottom: 1rem;
      color: var(--text-muted);
      font-size: 1rem;
      line-height: 1.8;
    }

    ul {
      margin: 0 0 1.25rem 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    li {
      color: var(--text-muted);
      line-height: 1.75;
    }
  }

  &__meta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.75rem !important;
    padding: 0.35rem 0.85rem;
    border-radius: 99px;
    border: 1px solid var(--border);
    font-size: 0.78rem !important;

    i {
      color: $primary;
    }
  }

  &__zonas {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);

    h2 {
      margin-top: 0 !important;
      font-size: 0.75rem !important;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    ul {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-left: 0;
      list-style: none;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 99px;
      border: 1px solid var(--border);
      font-size: 0.8125rem;
      transition: all var(--dur-media) ease;

      i {
        color: $primary;
        font-size: 0.75rem;
      }

      @include puede-hover {
        &:hover {
          border-color: $primary;
          color: $primary;
        }
      }
    }
  }
}

.cta-inline {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 2.25rem 0;
  padding: 1.35rem;
  border-radius: var(--radio-lg);
  background: var(--surface);
  border-left: 3px solid $primary;

  p {
    margin: 0 !important;
    color: var(--text) !important;
  }
}

.cierre {
  @include seccion(3rem, 4.5rem);
  background: var(--bg-alt);
  text-align: center;

  h2 {
    margin-bottom: 0.75rem;
    font-size: clamp(1.35rem, 1.1rem + 1.2vw, 2rem);
  }

  p {
    max-width: 52ch;
    margin: 0 auto;
    color: var(--text-muted);
  }

  &__botones {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.85rem;
    margin-top: 1.5rem;
  }
}

.mas {
  @include seccion(3rem, 4rem);
  background: var(--bg);

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }

  ul {
    display: grid;
    gap: 1rem;
    list-style: none;

    @include desde($bp-md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  a {
    display: block;
    border-radius: var(--radio-lg);
    overflow: hidden;
    @include borde-dorado(0.14);
    transition: border-color var(--dur-media) ease, transform var(--dur-media) var(--ease-suave);

    span {
      display: block;
      padding: 0.85rem 1rem 1rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    @include puede-hover {
      &:hover {
        transform: translateY(-4px);
        border-color: rgba($primary, 0.5);
      }
    }
  }
}
</style>
