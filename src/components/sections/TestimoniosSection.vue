<script setup lang="ts">
/** Reviews en marquee infinito (desktop) / carrusel con snap (mobile). */
import { ref } from 'vue'
import CldImage from '@/components/ui/CldImage.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { TESTIMONIOS } from '@/config/testimonios'

const raiz = ref<HTMLElement | null>(null)
useScrollReveal(raiz, { hijos: '[data-reveal]', cascada: 0.1, desplazamiento: 40 })

// Se duplica la lista para que el marquee no muestre huecos al reiniciar.
const filaA = TESTIMONIOS.slice(0, 5)
const filaB = TESTIMONIOS.slice(5)
</script>

<template>
  <section id="testimonios" ref="raiz" class="testimonios">
    <div class="contenedor">
      <SectionHeader
        kicker="Testimoniales"
        titulo="Lo que dicen"
        resaltado="nuestras pacientes"
        descripcion="Reviews reales de personas que ya viven sin vello."
      />
    </div>

    <div class="marquee" data-reveal>
      <div class="marquee__fila marquee__fila--a">
        <article v-for="(t, i) in [...filaA, ...filaA]" :key="`a-${i}`" class="review">
          <div class="review__estrellas" :aria-label="`${t.estrellas} de 5 estrellas`">
            <i v-for="n in t.estrellas" :key="n" class="fa-solid fa-star" aria-hidden="true" />
          </div>
          <p class="review__texto">“{{ t.texto }}”</p>
          <footer class="review__pie">
            <span class="review__avatar">
              <CldImage :public-id="t.avatar" :alt="t.nombre" :ancho="96" aspecto="1:1" gravedad="face" sizes="44px" />
            </span>
            <span class="review__nombre">{{ t.nombre }}</span>
          </footer>
        </article>
      </div>

      <div class="marquee__fila marquee__fila--b">
        <article v-for="(t, i) in [...filaB, ...filaB]" :key="`b-${i}`" class="review">
          <div class="review__estrellas" :aria-label="`${t.estrellas} de 5 estrellas`">
            <i v-for="n in t.estrellas" :key="n" class="fa-solid fa-star" aria-hidden="true" />
          </div>
          <p class="review__texto">“{{ t.texto }}”</p>
          <footer class="review__pie">
            <span class="review__avatar">
              <CldImage :public-id="t.avatar" :alt="t.nombre" :ancho="96" aspecto="1:1" gravedad="face" sizes="44px" />
            </span>
            <span class="review__nombre">{{ t.nombre }}</span>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonios {
  @include seccion;
  background: var(--bg);
  overflow: hidden;
}

.marquee {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);

  &__fila {
    display: flex;
    gap: 1rem;
    width: max-content;
    animation: correr 46s linear infinite;

    &--b {
      animation-duration: 58s;
      animation-direction: reverse;
    }

    @include puede-hover {
      &:hover {
        animation-play-state: paused;
      }
    }
  }

  // En mobile no hay animación: se convierte en carrusel manual con snap.
  @include movil {
    mask-image: none;
    -webkit-mask-image: none;

    &__fila {
      width: auto;
      animation: none;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-inline: 1.25rem;
      @include scroll-oculto;

      &--b {
        display: none;
      }
    }
  }

  @include sin-movimiento {
    &__fila {
      animation: none;
      overflow-x: auto;
      width: auto;
      @include scroll-oculto;
    }
  }
}

.review {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex: 0 0 auto;
  width: 19rem;
  padding: 1.35rem;
  border-radius: var(--radio-lg);
  background: var(--surface);
  @include borde-dorado(0.14);
  scroll-snap-align: center;
  transition: border-color var(--dur-media) ease, transform var(--dur-media) var(--ease-suave);

  @include desde($bp-md) {
    width: 22rem;
  }

  @include puede-hover {
    &:hover {
      transform: translateY(-4px);
      border-color: rgba($primary, 0.45);
    }
  }

  &__estrellas {
    display: flex;
    gap: 0.15rem;
    color: $primary;
    font-size: 0.75rem;
  }

  &__texto {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.875rem;
    line-height: 1.6;
    @include lineas(5);
  }

  &__pie {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-top: auto;
    padding-top: 0.35rem;
  }

  &__avatar {
    display: block;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    @include borde-dorado(0.4);
  }

  &__nombre {
    font-size: 0.875rem;
    font-weight: 600;
  }
}

@keyframes correr {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
