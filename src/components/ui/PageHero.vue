<script setup lang="ts">
/** Cabecera de página interna: migas de pan + H1. Reutilizada por todas las vistas. */
import { RouterLink } from 'vue-router'
import CldImage from './CldImage.vue'

withDefaults(
  defineProps<{
    titulo: string
    kicker?: string
    descripcion?: string
    imagenFondo?: string
    migas?: { nombre: string; ruta: string }[]
  }>(),
  { kicker: undefined, descripcion: undefined, imagenFondo: undefined, migas: () => [] },
)
</script>

<template>
  <section class="cabecera-pagina">
    <div v-if="imagenFondo" class="cabecera-pagina__fondo" aria-hidden="true">
      <CldImage
        :public-id="imagenFondo"
        alt=""
        :ancho="1920"
        :alto="640"
        recorte="fill"
        carga="eager"
        sizes="100vw"
      />
    </div>
    <div class="cabecera-pagina__velo" aria-hidden="true" />

    <div class="contenedor cabecera-pagina__inner">
      <nav v-if="migas.length" class="migas" aria-label="Miga de pan">
        <ol>
          <li v-for="(m, i) in migas" :key="m.ruta">
            <RouterLink v-if="i < migas.length - 1" :to="m.ruta">{{ m.nombre }}</RouterLink>
            <span v-else aria-current="page">{{ m.nombre }}</span>
            <i v-if="i < migas.length - 1" class="fa-solid fa-chevron-right" aria-hidden="true" />
          </li>
        </ol>
      </nav>

      <p v-if="kicker" class="cabecera-pagina__kicker">{{ kicker }}</p>
      <h1 class="cabecera-pagina__titulo">{{ titulo }}</h1>
      <p v-if="descripcion" class="cabecera-pagina__descripcion">{{ descripcion }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cabecera-pagina {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 22rem;
  padding-block: calc(var(--alto-header) + 3rem) 3rem;
  overflow: hidden;
  isolation: isolate;
  text-align: center;

  @include desde($bp-md) {
    min-height: 26rem;
    padding-block: calc(var(--alto-header) + 4rem) 4rem;
  }

  &__fondo {
    position: absolute;
    inset: 0;
    z-index: -2;
  }

  &__velo {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(180deg, rgba($ink, 0.92) 0%, rgba($ink, 0.72) 45%, rgba($ink, 0.98) 100%),
      radial-gradient(60% 55% at 50% 45%, rgba($primary, 0.16), transparent 72%);
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
  }

  &__kicker {
    color: $primary;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  &__titulo {
    margin: 0;
    font-size: clamp(2rem, 1.3rem + 3.6vw, 3.5rem);
  }

  &__descripcion {
    max-width: 62ch;
    margin: 0;
    color: var(--text-muted);
    font-size: clamp(0.95rem, 0.9rem + 0.3vw, 1.0625rem);
  }
}

.migas {
  font-size: 0.75rem;
  color: var(--text-muted);

  ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  i {
    font-size: 0.55rem;
    color: rgba($primary, 0.7);
  }

  a {
    transition: color var(--dur-rapida) ease;

    @include puede-hover {
      &:hover {
        color: $primary;
      }
    }
  }

  [aria-current='page'] {
    color: $primary;
  }
}
</style>
