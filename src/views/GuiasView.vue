<script setup lang="ts">
/** /guias — índice editorial. Cada tarjeta lleva a su guía; el CTA, a WhatsApp. */
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import CldImage from '@/components/ui/CldImage.vue'
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { migasLd, url } from '@/config/seo'
import { CATEGORIAS_GUIA, GUIAS, type CategoriaGuia } from '@/config/guias'
import { whatsappUrl } from '@/config/site'

const filtro = ref<CategoriaGuia | 'Todas'>('Todas')

/** Fecha visible en cada tarjeta (señal E-E-A-T): «19 feb 2025». */
function fechaLegible(fecha: string): string {
  return new Date(`${fecha}T12:00:00`).toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const visibles = computed(() =>
  filtro.value === 'Todas' ? GUIAS : GUIAS.filter((g) => g.categoria === filtro.value),
)

const migas = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Guías', ruta: '/guias' },
]

useSeo(() => ({
  titulo: 'Guías de Depilación Láser | Resuelve tus Dudas | Depil Ec',
  descripcion:
    'Guías claras sobre depilación láser: cada cuánto son las sesiones, desde qué edad se puede, beneficios reales del Tri-Laser & 4D y experiencias de pacientes en Ecuador.',
  ruta: '/guias',
  jsonLd: [
    migasLd(migas),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Guías de depilación láser',
      url: url('/guias'),
      hasPart: GUIAS.map((g) => ({
        '@type': 'Article',
        headline: g.titulo,
        url: url(`/guias/${g.slug}`),
        datePublished: g.fecha,
      })),
    },
  ],
}))
</script>

<template>
  <div class="pagina">
    <PageHero
      titulo="Guías"
      kicker="Aprende antes de empezar"
      descripcion="Todo lo que conviene saber antes de tu primera sesión, explicado por nuestras especialistas."
      imagen-fondo="depil/guias/descubre-sus-beneficios"
      :migas="migas"
    />

    <section class="guias">
      <div class="contenedor">
        <div class="guias__filtros" role="tablist" aria-label="Filtrar guías">
          <button
            v-for="c in CATEGORIAS_GUIA"
            :key="c.id"
            class="guias__filtro"
            :class="{ 'guias__filtro--activo': filtro === c.id }"
            type="button"
            role="tab"
            :aria-selected="filtro === c.id"
            @click="filtro = c.id"
          >
            <i :class="c.icono" aria-hidden="true" /> {{ c.label }}
          </button>
        </div>

        <TransitionGroup tag="ul" name="lista" class="guias__grid">
          <li v-for="g in visibles" :key="g.slug">
            <article class="tarjeta">
              <RouterLink class="tarjeta__img" :to="`/guias/${g.slug}`">
                <CldImage
                  :public-id="g.imagen"
                  :alt="g.titulo"
                  :ancho="720"
                  aspecto="16:9"
                  sizes="(max-width: 767px) 92vw, 30vw"
                />
              </RouterLink>
              <div class="tarjeta__cuerpo">
                <span class="tarjeta__cat">{{ g.categoria }}</span>
                <time class="tarjeta__fecha" :datetime="g.fecha">{{ fechaLegible(g.fecha) }}</time>
                <h2><RouterLink :to="`/guias/${g.slug}`">{{ g.titulo }}</RouterLink></h2>
                <p>{{ g.descripcion }}</p>
                <RouterLink class="tarjeta__link" :to="`/guias/${g.slug}`">
                  Leer la guía <i class="fa-solid fa-arrow-right-long" aria-hidden="true" />
                </RouterLink>
              </div>
            </article>
          </li>
        </TransitionGroup>

        <div class="guias__cta">
          <p>¿Prefieres que te lo expliquemos directamente?</p>
          <BaseButton
            variante="whatsapp"
            tamano="lg"
            icono="fa-brands fa-whatsapp"
            :href="whatsappUrl('Hola 😁, tengo dudas sobre la depilación láser y quisiera que me asesoren.')"
          >
            Habla con una especialista
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.guias {
  @include seccion;
  background: var(--bg);

  &__filtros {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    overflow-x: auto;
    @include scroll-oculto;

    @include desde($bp-md) {
      justify-content: center;
      flex-wrap: wrap;
      overflow: visible;
    }
  }

  &__filtro {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    padding: 0.55rem 1.05rem;
    border-radius: 99px;
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.8125rem;
    white-space: nowrap;
    transition: all var(--dur-media) ease;

    i {
      font-size: 0.75rem;
    }

    @include puede-hover {
      &:hover {
        border-color: rgba($primary, 0.45);
        color: var(--text);
      }
    }

    &--activo {
      background: linear-gradient(100deg, $gold-gradient-from, $gold-gradient-mid);
      border-color: transparent;
      color: $ink;
      font-weight: 600;
    }
  }

  &__grid {
    display: grid;
    gap: 1.25rem;
    list-style: none;

    @include desde($bp-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desde($bp-xl) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
    margin-top: 3rem;
    text-align: center;

    p {
      color: var(--text-muted);
    }
  }
}

.tarjeta {
  @include tarjeta;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__img {
    display: block;
    aspect-ratio: 16 / 9;
    overflow: hidden;

    :deep(img) {
      transition: transform var(--dur-lenta) var(--ease-suave);
    }
  }

  @include puede-hover {
    &:hover &__img :deep(img) {
      transform: scale(1.06);
    }
  }

  &__cuerpo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;
    flex: 1;

    h2 {
      font-size: 1.0625rem;
      line-height: 1.35;
    }

    p {
      color: var(--text-muted);
      font-size: 0.875rem;
      @include lineas(3);
    }
  }

  &__cat {
    align-self: flex-start;
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
    background: var(--accent-soft);
    color: $primary;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__fecha {
    font-size: 0.75rem;
    color: var(--text-muted, #{$text-muted});
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: auto;
    padding-top: 0.6rem;
    color: $primary;
    font-size: 0.8125rem;
    font-weight: 600;
  }
}
</style>
