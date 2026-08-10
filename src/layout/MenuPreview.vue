<script setup lang="ts">
/**
 * Imagen flotante que sigue el puntero dentro del menú fullscreen.
 *
 * El movimiento se interpola con `gsap.quickTo` en vez de escribir
 * `style.transform` en cada evento: así el seguimiento va suavizado y no
 * dispara un layout por evento.
 *
 * El seguimiento se registra SIEMPRE. Antes iba detrás de un
 * `matchMedia('(min-width: 1024px) and (pointer: fine)')` evaluado una única
 * vez en `onMounted`; si esa consulta daba falso (navegadores embebidos,
 * ventanas simuladas, dispositivos híbridos) no se creaba ni el listener ni la
 * posición inicial y el marco se quedaba clavado en la esquina superior
 * izquierda. Quién puede verlo lo decide el CSS; el coste de un `pointermove`
 * pasivo es irrelevante.
 */
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { cldUrl } from '@/composables/useCloudinary'
import { enNavegador, gsap } from '@/composables/useScrollReveal'

const props = defineProps<{ publicId: string | null; activo: boolean }>()

const caja = ref<HTMLElement | null>(null)
const imagen = ref<string | null>(null)

let moverX: ((v: number) => void) | null = null
let moverY: ((v: number) => void) | null = null
let colocado = false

function alMover(e: PointerEvent | MouseEvent) {
  if (!caja.value) return

  // El primer evento salta sin interpolar: si no, el marco viajaría desde el
  // centro hasta el cursor y se vería un barrido raro al abrir el menú.
  if (!colocado) {
    colocado = true
    gsap.set(caja.value, { x: e.clientX, y: e.clientY })
    return
  }

  moverX?.(e.clientX)
  moverY?.(e.clientY)
}

onMounted(() => {
  if (!enNavegador || !caja.value) return

  // Punto de partida centrado: cubre el caso de navegación por teclado, donde
  // puede no llegar nunca un evento de puntero.
  gsap.set(caja.value, { x: window.innerWidth / 2, y: window.innerHeight / 2 })

  moverX = gsap.quickTo(caja.value, 'x', { duration: 0.7, ease: 'power3.out' })
  moverY = gsap.quickTo(caja.value, 'y', { duration: 0.7, ease: 'power3.out' })

  window.addEventListener('pointermove', alMover, { passive: true })
})

onUnmounted(() => {
  if (enNavegador) window.removeEventListener('pointermove', alMover)
})

// La imagen anterior se mantiene durante el fundido para no dejar un hueco.
watch(
  () => props.publicId,
  (id) => {
    if (id) imagen.value = cldUrl(id, { ancho: 640, aspecto: '3:4', recorte: 'fill' })
  },
  { immediate: true },
)
</script>

<template>
  <div
    ref="caja"
    class="preview"
    :class="{ 'preview--visible': activo && !!publicId }"
    aria-hidden="true"
  >
    <div class="preview__marco">
      <Transition name="fundido">
        <img v-if="imagen" :key="imagen" :src="imagen" alt="" />
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 15rem;
  height: 20rem;
  margin: -10rem 0 0 -7.5rem; // centra el marco sobre el puntero
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transform-origin: center;
  scale: 0.86;
  transition:
    opacity 0.4s var(--ease-suave),
    scale 0.5s var(--ease-suave),
    visibility 0s linear 0.4s;

  &--visible {
    opacity: 1;
    visibility: visible;
    scale: 1;
    transition:
      opacity 0.4s var(--ease-suave),
      scale 0.5s var(--ease-suave),
      visibility 0s;
  }

  // Solo tiene sentido con puntero de precisión y espacio suficiente.
  // Se oculta con `visibility` y no con `display` para no invalidar la
  // referencia ni el transform que ya aplica GSAP.
  @media (max-width: 1023px), (pointer: coarse) {
    &,
    &--visible {
      visibility: hidden;
      opacity: 0;
    }
  }

  &__marco {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 0.85rem;
    overflow: hidden;
    box-shadow: 0 32px 70px -30px rgba(0, 0, 0, 0.95);
    @include borde-dorado(0.35);
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include sin-movimiento {
    &,
    &--visible {
      visibility: hidden;
      opacity: 0;
    }
  }
}
</style>
