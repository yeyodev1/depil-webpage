<script setup lang="ts">
/** Índice de sedes: /sedes */
import { RouterLink } from 'vue-router'
import CldImage from '@/components/ui/CldImage.vue'
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { migasLd, sedeLd } from '@/config/seo'
import { SEDES, SITE } from '@/config/site'

const migas = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Sedes', ruta: '/sedes' },
]

useSeo(() => ({
  titulo: 'Sedes de Depil Ec | Quito, Guayaquil, Samborondón, Ceibos y Manta',
  descripcion:
    'Encuentra tu centro Depil más cercano: Quito (Edificio Gaia), Guayaquil (Trade Building), Ceibos, Samborondón (Los Arcos) y Manta (Business Center). Lunes a sábado 09H00 - 19H00.',
  ruta: '/sedes',
  jsonLd: [migasLd(migas), ...SEDES.map((s) => sedeLd(s.id)).filter(Boolean as unknown as (v: unknown) => v is Record<string, unknown>)],
}))
</script>

<template>
  <div class="pagina">
    <PageHero
      titulo="Nuestras sedes"
      kicker="Estamos cerca de ti"
      descripcion="Cinco centros en Ecuador operando bajo un mismo estándar de calidad, equipo y protocolo."
      imagen-fondo="depil/sedes/quito"
      :migas="migas"
    />

    <section class="listado">
      <div class="contenedor listado__grid">
        <article v-for="sede in SEDES" :key="sede.id" class="ficha">
          <RouterLink :to="`/sedes/${sede.id}`" class="ficha__imagen">
            <CldImage
              :public-id="sede.imagen"
              :alt="sede.nombre"
              :ancho="800"
              aspecto="16:9"
              sizes="(max-width: 767px) 92vw, 42vw"
            />
          </RouterLink>

          <div class="ficha__cuerpo">
            <h2><RouterLink :to="`/sedes/${sede.id}`">{{ sede.nombre }}</RouterLink></h2>
            <p class="ficha__ciudad">
              <i class="fa-solid fa-city" aria-hidden="true" /> {{ sede.ciudad }}
            </p>
            <p class="ficha__direccion">
              <i class="fa-solid fa-location-dot" aria-hidden="true" /> {{ sede.direccion }}
            </p>
            <RouterLink class="ficha__link" :to="`/sedes/${sede.id}`">
              Ver sede <i class="fa-solid fa-arrow-right-long" aria-hidden="true" />
            </RouterLink>
          </div>
        </article>
      </div>

      <p class="listado__horario contenedor">
        <i class="fa-regular fa-clock" aria-hidden="true" />
        <span v-for="h in SITE.horarios" :key="h.dias">{{ h.dias }}: {{ h.horas }}</span>
      </p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.listado {
  @include seccion;
  background: var(--bg);

  &__grid {
    display: grid;
    gap: 1.25rem;

    @include desde($bp-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desde($bp-xl) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__horario {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem 1.25rem;
    margin-top: 2.5rem;
    color: var(--text-muted);
    font-size: 0.8125rem;
    text-align: center;

    i {
      color: $primary;
    }
  }
}

.ficha {
  @include tarjeta;
  display: flex;
  flex-direction: column;

  &__imagen {
    display: block;
    aspect-ratio: 16 / 9;
    overflow: hidden;

    :deep(img) {
      transition: transform var(--dur-lenta) var(--ease-suave);
    }
  }

  @include puede-hover {
    &:hover &__imagen :deep(img) {
      transform: scale(1.06);
    }
  }

  &__cuerpo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;

    h2 {
      font-size: 1.125rem;
    }
  }

  &__ciudad,
  &__direccion {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    color: var(--text-muted);
    font-size: 0.85rem;

    i {
      margin-top: 0.25rem;
      color: $primary;
      font-size: 0.75rem;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: auto;
    padding-top: 0.5rem;
    color: $primary;
    font-size: 0.8125rem;
    font-weight: 600;
  }
}
</style>
