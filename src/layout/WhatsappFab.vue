<script setup lang="ts">
/** Botón flotante de WhatsApp con burbuja de invitación y botón "subir". */
import { onMounted, onUnmounted, ref } from 'vue'
import { WHATSAPP_MENSAJE_DEFECTO, whatsappUrl } from '@/config/site'

const visible = ref(false)
const burbuja = ref(false)
const mostrarSubir = ref(false)

let temporizador: ReturnType<typeof setTimeout> | null = null

function alScrollear() {
  visible.value = window.scrollY > 220
  mostrarSubir.value = window.scrollY > 900
}

function subir() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  alScrollear()
  window.addEventListener('scroll', alScrollear, { passive: true })
  temporizador = setTimeout(() => (burbuja.value = true), 6000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', alScrollear)
  if (temporizador) clearTimeout(temporizador)
})
</script>

<template>
  <div class="flotantes">
    <Transition name="subir">
      <button v-if="mostrarSubir" class="flotantes__subir" type="button" aria-label="Volver arriba" @click="subir">
        <i class="fa-solid fa-chevron-up" aria-hidden="true" />
      </button>
    </Transition>

    <Transition name="zoom">
      <div v-if="visible" class="flotantes__wa">
        <Transition name="subir">
          <p v-if="burbuja" class="flotantes__burbuja">
            ¿Tienes dudas? Escríbenos, te respondemos al instante.
            <button type="button" aria-label="Ocultar mensaje" @click="burbuja = false">
              <i class="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </p>
        </Transition>

        <a
          class="flotantes__boton"
          :href="whatsappUrl(WHATSAPP_MENSAJE_DEFECTO)"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
        >
          <span class="flotantes__pulso" aria-hidden="true" />
          <i class="fa-brands fa-whatsapp" aria-hidden="true" />
        </a>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.flotantes {
  position: fixed;
  z-index: 850;
  right: 1rem;
  bottom: calc(1rem + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;

  @include desde($bp-md) {
    right: 1.75rem;
    bottom: 1.75rem;
  }

  &__wa {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  &__burbuja {
    position: relative;
    max-width: 15rem;
    padding: 0.7rem 2rem 0.7rem 0.9rem;
    border-radius: var(--radio-md);
    border: 1px solid var(--border);
    background: var(--surface);
    box-shadow: var(--sombra-fuerte);
    font-size: 0.8125rem;
    line-height: 1.4;

    button {
      position: absolute;
      top: 0.4rem;
      right: 0.5rem;
      color: var(--text-muted);
      font-size: 0.75rem;
    }

    @include hasta($bp-sm) {
      max-width: 12rem;
    }
  }

  &__boton {
    position: relative;
    display: grid;
    place-items: center;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: $whatsapp;
    color: #062e18;
    font-size: 1.65rem;
    box-shadow: 0 14px 32px -12px rgba($whatsapp, 0.85);
    transition: transform var(--dur-media) var(--ease-suave);

    @include puede-hover {
      &:hover {
        transform: scale(1.08);
      }
    }
  }

  &__pulso {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba($whatsapp, 0.55);
    animation: pulso-suave 2.4s ease-in-out infinite;
    z-index: -1;
  }

  &__subir {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: rgba($ink, 0.85);
    backdrop-filter: blur(8px);
    color: $primary;
    transition:
      background var(--dur-media) ease,
      transform var(--dur-media) var(--ease-suave);

    @include puede-hover {
      &:hover {
        background: rgba($primary, 0.18);
        transform: translateY(-3px);
      }
    }
  }
}
</style>
