<script setup lang="ts">
/** Encabezado de sección con reveal por GSAP. */
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

withDefaults(
  defineProps<{
    kicker?: string
    titulo: string
    resaltado?: string
    descripcion?: string
    alineacion?: 'centro' | 'izquierda'
  }>(),
  { kicker: undefined, resaltado: undefined, descripcion: undefined, alineacion: 'centro' },
)

const raiz = ref<HTMLElement | null>(null)

// Atributo propio, distinto de `[data-reveal]`: las secciones padre revelan sus
// hijos con `[data-reveal]` y, si este componente usara el mismo nombre, sus
// nodos recibirían dos `gsap.from({autoAlpha: 0})` superpuestos y se quedarían
// invisibles (le pasaba al encabezado de Contacto).
useScrollReveal(raiz, { hijos: '[data-reveal-titulo]', cascada: 0.12, desplazamiento: 34 })
</script>

<template>
  <header ref="raiz" class="encabezado" :class="`encabezado--${alineacion}`">
    <p v-if="kicker" class="encabezado__kicker" data-reveal-titulo>
      <span class="encabezado__linea" aria-hidden="true" />
      {{ kicker }}
    </p>

    <h2 class="encabezado__titulo" data-reveal-titulo>
      {{ titulo }}
      <span v-if="resaltado" class="texto-dorado">{{ resaltado }}</span>
    </h2>

    <p v-if="descripcion" class="encabezado__descripcion" data-reveal-titulo>{{ descripcion }}</p>
  </header>
</template>

<style scoped lang="scss">
.encabezado {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 2.5rem;

  @include desde($bp-md) {
    margin-bottom: 3.5rem;
  }

  &--centro {
    align-items: center;
    text-align: center;
  }

  &--izquierda {
    align-items: flex-start;
    text-align: left;
  }

  &__kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0;
    color: $primary;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  &__linea {
    width: 2rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, $primary);
  }

  &__titulo {
    margin: 0;
    font-size: clamp(1.75rem, 1.2rem + 2.6vw, 3rem);

    .texto-dorado {
      display: block;
    }
  }

  &__descripcion {
    max-width: 62ch;
    margin: 0;
    color: var(--text-muted);
    font-size: clamp(0.95rem, 0.9rem + 0.3vw, 1.0625rem);
  }
}
</style>
