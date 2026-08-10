<script setup lang="ts">
/** Antes y Después con comparador deslizable (mouse + touch + teclado). */
import { onUnmounted, ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { cldUrl } from '@/composables/useCloudinary'
import { useScrollReveal } from '@/composables/useScrollReveal'

const raiz = ref<HTMLElement | null>(null)
const comparador = ref<HTMLElement | null>(null)
const posicion = ref(50)
const arrastrando = ref(false)

useScrollReveal(raiz, { hijos: '[data-reveal]', cascada: 0.12, desplazamiento: 42 })

const antes = cldUrl('depil/resultados/antes', { ancho: 900, aspecto: '1:1', recorte: 'fill' })
const despues = cldUrl('depil/resultados/despues', { ancho: 900, aspecto: '1:1', recorte: 'fill' })

function actualizar(clienteX: number) {
  const caja = comparador.value?.getBoundingClientRect()
  if (!caja) return
  posicion.value = Math.min(100, Math.max(0, ((clienteX - caja.left) / caja.width) * 100))
}

function alMover(evento: PointerEvent) {
  if (!arrastrando.value) return
  actualizar(evento.clientX)
}

function soltar() {
  arrastrando.value = false
  window.removeEventListener('pointermove', alMover)
  window.removeEventListener('pointerup', soltar)
}

function tomar(evento: PointerEvent) {
  arrastrando.value = true
  actualizar(evento.clientX)
  window.addEventListener('pointermove', alMover)
  window.addEventListener('pointerup', soltar)
}

function alTeclado(evento: KeyboardEvent) {
  const paso = evento.shiftKey ? 10 : 3
  if (evento.key === 'ArrowLeft') posicion.value = Math.max(0, posicion.value - paso)
  if (evento.key === 'ArrowRight') posicion.value = Math.min(100, posicion.value + paso)
}

onUnmounted(soltar)
</script>

<template>
  <section id="resultados" ref="raiz" class="resultados">
    <div class="contenedor">
      <SectionHeader
        kicker="Antes y después"
        titulo="Transformaciones"
        resaltado="asombrosas"
        descripcion="Cada imagen cuenta una historia de transformación. Desliza para ver el cambio real que podemos lograr contigo."
      />

      <div class="resultados__lienzo" data-reveal>
        <div
          ref="comparador"
          class="comparador"
          :class="{ 'comparador--activo': arrastrando }"
          @pointerdown.prevent="tomar"
        >
          <img class="comparador__base" :src="despues" alt="Resultado después del tratamiento" loading="lazy" />

          <div class="comparador__recorte" :style="{ width: `${posicion}%` }">
            <img :src="antes" alt="Zona antes del tratamiento" loading="lazy" />
            <span class="comparador__etiqueta comparador__etiqueta--antes">Antes</span>
          </div>

          <span class="comparador__etiqueta comparador__etiqueta--despues">Después</span>

          <div class="comparador__manija" :style="{ left: `${posicion}%` }">
            <button
              class="comparador__tirador"
              type="button"
              role="slider"
              aria-label="Comparar antes y después"
              :aria-valuenow="Math.round(posicion)"
              aria-valuemin="0"
              aria-valuemax="100"
              @keydown="alTeclado"
            >
              <i class="fa-solid fa-left-right" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p class="resultados__pista" data-reveal>
          <i class="fa-solid fa-hand-pointer" aria-hidden="true" />
          Desliza el control para comparar
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.resultados {
  @include seccion;
  background: var(--bg);

  &__lienzo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__pista {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
    font-size: 0.8125rem;

    i {
      color: $primary;
      animation: flotar 2.4s ease-in-out infinite;
    }
  }
}

.comparador {
  position: relative;
  width: min(100%, 34rem);
  aspect-ratio: 1;
  border-radius: var(--radio-lg);
  overflow: hidden;
  user-select: none;
  touch-action: pan-y;
  cursor: ew-resize;
  @include borde-dorado(0.22);
  box-shadow: var(--sombra-fuerte);

  &__base {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  &__recorte {
    position: absolute;
    inset: 0 auto 0 0;
    overflow: hidden;

    // El contenedor es 1:1 y la imagen también: fijando la altura, el ancho
    // renderizado coincide con el del comparador y el recorte no deforma nada.
    img {
      height: 100%;
      width: auto;
      max-width: none;
      aspect-ratio: 1;
      object-fit: cover;
      pointer-events: none;
    }
  }

  &__etiqueta {
    position: absolute;
    top: 0.85rem;
    padding: 0.3rem 0.8rem;
    border-radius: 99px;
    background: rgba($ink, 0.72);
    backdrop-filter: blur(6px);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;

    &--antes {
      left: 0.85rem;
      color: var(--text-muted);
    }

    &--despues {
      right: 0.85rem;
      color: $primary;
    }
  }

  &__manija {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    margin-left: -1px;
    background: linear-gradient(180deg, transparent, $primary 18%, $primary 82%, transparent);
    pointer-events: none;
  }

  &__tirador {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: linear-gradient(120deg, $gold-gradient-from, $gold-gradient-mid);
    color: $ink;
    font-size: 0.95rem;
    box-shadow: 0 10px 26px -8px rgba($ink, 0.9);
    pointer-events: auto;
    cursor: grab;
    transition: transform var(--dur-rapida) var(--ease-suave);
  }

  &--activo &__tirador {
    transform: translate(-50%, -50%) scale(1.1);
    cursor: grabbing;
  }
}
</style>
