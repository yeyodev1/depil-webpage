<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppFooter from '@/layout/AppFooter.vue'
import AppHeader from '@/layout/AppHeader.vue'
import WhatsappFab from '@/layout/WhatsappFab.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import ModalHost from '@/components/ui/ModalHost.vue'
import ToastHost from '@/components/ui/ToastHost.vue'

const router = useRouter()

/** Barra de progreso superior mientras se resuelve el chunk de la vista. */
const navegando = ref(false)
let temporizador: ReturnType<typeof setTimeout> | null = null

router.beforeEach((to, from, next) => {
  // Solo para cambios de página reales, no para saltos a un ancla.
  if (to.path !== from.path) {
    if (temporizador) clearTimeout(temporizador)
    navegando.value = true
  }
  next()
})

router.afterEach(() => {
  if (temporizador) clearTimeout(temporizador)
  temporizador = setTimeout(() => (navegando.value = false), 260)
})

/**
 * El scroll vuelve arriba al terminar la salida, no al empezar: así no se ve
 * saltar la página mientras aún se está desvaneciendo.
 */
function alSalirPagina() {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'auto' })
}

// Cierra el menú/limpia estado si el usuario usa atrás/adelante del navegador.
watch(
  () => router.currentRoute.value.fullPath,
  () => {
    if (temporizador) clearTimeout(temporizador)
  },
)
</script>

<template>
  <div class="app-container">
    <a class="salto-contenido" href="#contenido">Saltar al contenido</a>

    <div class="barra-progreso" :class="{ 'barra-progreso--activa': navegando }" aria-hidden="true">
      <span />
    </div>

    <AppHeader />

    <main id="contenido" class="app-main">
      <RouterView v-slot="{ Component, route }">
        <!--
          `mode="out-in"` + una sola raíz por vista (`.pagina`). Si una vista
          tuviera varios nodos raíz, <Transition> no la monta y solo quedarían
          header y footer en pantalla.
        -->
        <Transition name="pagina" mode="out-in" @after-leave="alSalirPagina">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />
    <WhatsappFab />

    <!-- Hosts globales: modales, confirmaciones y toasts -->
    <ModalHost />
    <ConfirmDialog />
    <ToastHost />
  </div>
</template>

<style lang="scss">
.app-container {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

// Skip link: invisible hasta recibir foco con teclado. Por encima del header (960).
.salto-contenido {
  position: fixed;
  top: -100px;
  left: 1rem;
  z-index: 970;
  padding: 0.6rem 1rem;
  background: $primary;
  color: $ink;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;

  &:focus-visible {
    top: 1rem;
  }
}

.app-main {
  flex: 1;
}

// Evita que el footer suba mientras la vista entrante aún no tiene alto.
.pagina {
  min-height: 60svh;
}

// ── Transición entre páginas ───────────────────────────────────────────────
.pagina-enter-active {
  transition:
    opacity 0.42s var(--ease-suave),
    transform 0.42s var(--ease-suave),
    filter 0.42s var(--ease-suave);
}

.pagina-leave-active {
  transition:
    opacity 0.24s ease-in,
    transform 0.24s ease-in,
    filter 0.24s ease-in;
}

.pagina-enter-from {
  opacity: 0;
  transform: translate3d(0, 22px, 0) scale(0.994);
  filter: blur(6px);
}

.pagina-leave-to {
  opacity: 0;
  transform: translate3d(0, -12px, 0) scale(0.997);
  filter: blur(4px);
}

@media (prefers-reduced-motion: reduce) {
  .pagina-enter-active,
  .pagina-leave-active {
    transition: opacity 0.15s linear;
  }

  .pagina-enter-from,
  .pagina-leave-to {
    opacity: 0;
    transform: none;
    filter: none;
  }
}

// ── Barra de progreso de navegación ────────────────────────────────────────
.barra-progreso {
  position: fixed;
  inset: 0 0 auto;
  z-index: 1200;
  height: 2px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;

  span {
    display: block;
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, #a8801f, #e8cf7a, #a8801f);
    box-shadow: 0 0 12px rgba(232, 207, 122, 0.7);
  }

  &--activa {
    opacity: 1;

    span {
      // Avanza rápido hasta el 90% y espera: nunca miente diciendo "100%".
      animation: barra-avanza 0.9s var(--ease-suave) forwards;
    }
  }
}

@keyframes barra-avanza {
  0% {
    width: 0;
  }
  60% {
    width: 72%;
  }
  100% {
    width: 92%;
  }
}
</style>
