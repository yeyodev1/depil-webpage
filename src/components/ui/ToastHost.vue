<script setup lang="ts">
/** Pila de notificaciones. Se monta una sola vez en App.vue. */
import { useToast } from '@/composables/useToast'

const { toasts, cerrarToast } = useToast()
</script>

<template>
  <Teleport to="body">
    <TransitionGroup tag="div" name="lista" class="toasts" role="status" aria-live="polite">
      <article v-for="toast in toasts" :key="toast.id" class="toast" :class="`toast--${toast.tono}`">
        <i class="toast__icono" :class="toast.icono" aria-hidden="true" />
        <div class="toast__texto">
          <p class="toast__titulo">{{ toast.titulo }}</p>
          <p v-if="toast.mensaje" class="toast__mensaje">{{ toast.mensaje }}</p>
        </div>
        <button class="toast__cerrar" type="button" aria-label="Cerrar" @click="cerrarToast(toast.id)">
          <i class="fa-solid fa-xmark" aria-hidden="true" />
        </button>
        <span
          class="toast__barra"
          :style="{ animationDuration: `${toast.duracion}ms` }"
          aria-hidden="true"
        />
      </article>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped lang="scss">
.toasts {
  position: fixed;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  inset: auto 0.75rem calc(0.75rem + env(safe-area-inset-bottom)) 0.75rem;

  @include desde($bp-md) {
    inset: 1.25rem 1.25rem auto auto;
    width: min(24rem, calc(100vw - 2.5rem));
  }
}

.toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.9rem 0.9rem 0.95rem;
  border-radius: var(--radio-md);
  border: 1px solid var(--border);
  border-left: 3px solid var(--tono, #{$primary});
  background: var(--surface);
  box-shadow: var(--sombra-fuerte);
  overflow: hidden;

  &--success {
    --tono: #{$alert-success};
  }
  &--error {
    --tono: #{$alert-error};
  }
  &--info {
    --tono: #{$alert-info};
  }
  &--warning {
    --tono: #{$alert-warning};
  }

  &__icono {
    flex-shrink: 0;
    margin-top: 0.15rem;
    color: var(--tono);
    font-size: 1.1rem;
  }

  &__texto {
    flex: 1;
    min-width: 0;
  }

  &__titulo {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
  }

  &__mensaje {
    margin: 0.15rem 0 0;
    color: var(--text-muted);
    font-size: 0.8125rem;
    line-height: 1.45;
  }

  &__cerrar {
    flex-shrink: 0;
    color: var(--text-muted);
    transition: color var(--dur-rapida) ease;

    @include puede-hover {
      &:hover {
        color: var(--text);
      }
    }
  }

  &__barra {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background: var(--tono);
    transform-origin: left;
    animation: vaciar linear forwards;
  }
}

@keyframes vaciar {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
