<script setup lang="ts">
/** Índice de zonas: /depilacion-laser */
import { RouterLink } from 'vue-router'
import CldImage from '@/components/ui/CldImage.vue'
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { migasLd, serviciosLd } from '@/config/seo'
import { GRUPOS_ZONA, ZONAS, type GrupoZona } from '@/config/zonas'

const migas = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Zonas', ruta: '/depilacion-laser' },
]

const grupos = GRUPOS_ZONA.filter((g) => g.id !== 'Todas') as {
  id: GrupoZona
  label: string
  icono: string
}[]

useSeo(() => ({
  titulo: 'Zonas de Depilación Láser | 16 Áreas Tratables | Depil Ec',
  descripcion:
    'Conoce las 16 zonas que puedes tratar con depilación láser Tri-Laser & 4D en Depil Ec: axilas, bikini, piernas, rostro, espalda, glúteos, brazos, abdomen y más. Certificado por la FDA.',
  ruta: '/depilacion-laser',
  jsonLd: [serviciosLd(), migasLd(migas)],
}))
</script>

<template>
  <div class="pagina">
    <PageHero
      titulo="Zonas de depilación láser"
      kicker="Tratamientos"
      descripcion="Puedes tratar casi cualquier zona del cuerpo. Elige la tuya para ver exactamente qué incluye el protocolo."
      imagen-fondo="depil/brand/portada"
      :migas="migas"
    />

    <section v-for="grupo in grupos" :key="grupo.id" class="grupo">
      <div class="contenedor">
        <h2 class="grupo__titulo">
          <i :class="grupo.icono" aria-hidden="true" /> {{ grupo.label }}
        </h2>
        <ul class="grupo__grid">
          <li v-for="z in ZONAS.filter((x) => x.grupo === grupo.id)" :key="z.id">
            <RouterLink :to="`/depilacion-laser/${z.id}`">
              <CldImage
                :public-id="z.imagen"
                :alt="`Depilación láser ${z.nombre}`"
                :ancho="560"
                aspecto="1:1"
                sizes="(max-width: 575px) 50vw, (max-width: 1023px) 33vw, 25vw"
              />
              <span class="grupo__capa" aria-hidden="true" />
              <span class="grupo__info">
                <strong>{{ z.nombre }}</strong>
                <em>{{ z.descripcion }}</em>
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.grupo {
  @include seccion(2.5rem, 3.5rem);

  &:nth-child(odd) {
    background: var(--bg);
  }
  &:nth-child(even) {
    background: var(--bg-alt);
  }

  &__titulo {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1.5rem;
    font-size: clamp(1.25rem, 1.1rem + 0.8vw, 1.75rem);

    i {
      color: $primary;
      font-size: 0.85em;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
    list-style: none;

    @include desde($bp-md) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include desde($bp-lg) {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }

    a {
      position: relative;
      display: block;
      aspect-ratio: 1;
      border-radius: var(--radio-lg);
      overflow: hidden;
      @include borde-dorado(0.14);
      transition:
        transform var(--dur-media) var(--ease-suave),
        border-color var(--dur-media) ease;

      @include puede-hover {
        &:hover {
          transform: translateY(-5px);
          border-color: rgba($primary, 0.5);
        }
      }
    }
  }

  &__capa {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba($ink, 0.05), rgba($ink, 0.92) 74%);
  }

  &__info {
    position: absolute;
    inset: auto 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;

    strong {
      font-size: 0.9375rem;
    }

    em {
      color: var(--text-muted);
      font-size: 0.75rem;
      font-style: normal;
      line-height: 1.4;
      @include lineas(2);
    }
  }
}
</style>
