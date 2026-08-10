<script setup lang="ts">
/** Modal genérico con teleport, trampa de foco, cierre por Escape/overlay. */
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    abierto: boolean
    titulo?: string
    descripcion?: string
    ancho?: 'sm' | 'md' | 'lg' | 'xl'
    persistente?: boolean
    icono?: string
  }>(),
  {
    titulo: undefined,
    descripcion: undefined,
    ancho: 'md',
    persistente: false,
    icono: undefined,
  },
)

const emit = defineEmits<{ cerrar: [] }>()

const panel = ref<HTMLElement | null>(null)
let ultimoFoco: HTMLElement | null = null

const SELECTOR_FOCO =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function solicitarCierre() {
  if (!props.persistente) emit('cerrar')
}

function alTeclear(evento: KeyboardEvent) {
  if (evento.key === 'Escape') {
    solicitarCierre()
    return
  }
  if (evento.key !== 'Tab' || !panel.value) return

  const focos = Array.from(panel.value.querySelectorAll<HTMLElement>(SELECTOR_FOCO)).filter(
    (el) => el.offsetParent !== null,
  )
  if (!focos.length) return

  const primero = focos[0]!
  const ultimo = focos[focos.length - 1]!

  if (evento.shiftKey && document.activeElement === primero) {
    evento.preventDefault()
    ultimo.focus()
  } else if (!evento.shiftKey && document.activeElement === ultimo) {
    evento.preventDefault()
    primero.focus()
  }
}

watch(
  () => props.abierto,
  async (abierto) => {
    if (abierto) {
      ultimoFoco = document.activeElement as HTMLElement | null
      document.addEventListener('keydown', alTeclear)
      await nextTick()
      panel.value?.querySelector<HTMLElement>(SELECTOR_FOCO)?.focus()
    } else {
      document.removeEventListener('keydown', alTeclear)
      ultimoFoco?.focus()
      ultimoFoco = null
    }
  },
)

onBeforeUnmount(() => document.removeEventListener('keydown', alTeclear))
</script>

<template>
  <Teleport to="body">
    <Transition name="fundido">
      <div v-if="abierto" class="modal" role="presentation" @click.self="solicitarCierre">
        <Transition name="zoom" appear>
          <div
            ref="panel"
            class="modal__panel"
            :class="`modal__panel--${ancho}`"
            role="dialog"
            aria-modal="true"
            :aria-label="titulo"
          >
            <button
              v-if="!persistente"
              class="modal__cerrar"
              type="button"
              aria-label="Cerrar"
              @click="emit('cerrar')"
            >
              <i class="fa-solid fa-xmark" aria-hidden="true" />
            </button>

            <header v-if="titulo || icono" class="modal__cabecera">
              <span v-if="icono" class="modal__icono"><i :class="icono" aria-hidden="true" /></span>
              <div>
                <h3 v-if="titulo" class="modal__titulo">{{ titulo }}</h3>
                <p v-if="descripcion" class="modal__descripcion">{{ descripcion }}</p>
              </div>
            </header>

            <div class="modal__cuerpo"><slot /></div>

            <footer v-if="$slots.pie" class="modal__pie"><slot name="pie" /></footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  @include desde($bp-md) {
    align-items: center;
    padding: 2rem;
  }

  &__panel {
    position: relative;
    width: 100%;
    max-height: 92dvh;
    display: flex;
    flex-direction: column;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radio-lg) var(--radio-lg) 0 0;
    box-shadow: var(--sombra-fuerte);
    overflow: hidden;

    @include desde($bp-md) {
      max-height: 88dvh;
      border-radius: var(--radio-lg);
    }

    &--sm {
      max-width: 26rem;
    }
    &--md {
      max-width: 34rem;
    }
    &--lg {
      max-width: 46rem;
    }
    &--xl {
      max-width: 64rem;
    }
  }

  &__cerrar {
    position: absolute;
    top: 0.85rem;
    right: 0.85rem;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: rgba($white, 0.08);
    color: var(--text);
    transition:
      background var(--dur-rapida) ease,
      transform var(--dur-rapida) var(--ease-suave);

    @include puede-hover {
      &:hover {
        background: rgba($primary, 0.22);
        transform: rotate(90deg);
      }
    }
  }

  &__cabecera {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem 3.5rem 0.5rem 1.5rem;

    @include desde($bp-md) {
      padding: 2rem 3.5rem 0.75rem 2rem;
    }
  }

  &__icono {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: var(--accent-soft);
    color: $primary;
    font-size: 1.125rem;
  }

  &__titulo {
    margin: 0;
    font-size: 1.25rem;
  }

  &__descripcion {
    margin: 0.35rem 0 0;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  &__cuerpo {
    flex: 1;
    padding: 1rem 1.5rem 1.5rem;
    overflow-y: auto;
    overscroll-behavior: contain;

    @include desde($bp-md) {
      padding: 1rem 2rem 2rem;
    }
  }

  &__pie {
    display: flex;
    flex-direction: column-reverse;
    gap: 0.75rem;
    padding: 1rem 1.5rem 1.5rem;
    border-top: 1px solid var(--border);
    background: var(--surface-alt);

    @include desde($bp-sm) {
      flex-direction: row;
      justify-content: flex-end;
      padding: 1rem 2rem;
    }
  }
}

// En mobile el panel entra desde abajo, tipo bottom-sheet.
@include movil {
  .zoom-enter-from,
  .zoom-leave-to {
    transform: translateY(100%) scale(1);
  }
}
</style>
