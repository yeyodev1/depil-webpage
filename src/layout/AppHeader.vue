<script setup lang="ts">
/**
 * Header fijo minimal: logo, CTA y disparador del menú fullscreen.
 *
 * La navegación completa vive en `MenuOverlay` (estilo Awwwards). El header
 * queda por encima del overlay para que el botón cerrar siempre esté visible.
 */
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import MenuOverlay from './MenuOverlay.vue'
import { cldUrl } from '@/composables/useCloudinary'
import { SITE, whatsappUrl } from '@/config/site'

const route = useRoute()

const compacto = ref(false)
const menuAbierto = ref(false)

const logo = cldUrl(SITE.logoDorado, { ancho: 420, recorte: 'fit' })

function alScrollear() {
  compacto.value = window.scrollY > 40
}

// Cerrar el menú al cambiar de ruta (por si se navega desde otro sitio).
watch(() => route.fullPath, () => (menuAbierto.value = false))

onMounted(() => {
  alScrollear()
  window.addEventListener('scroll', alScrollear, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', alScrollear))
</script>

<template>
  <header
    class="cabecera"
    :class="{ 'cabecera--compacta': compacto && !menuAbierto, 'cabecera--menu': menuAbierto }"
  >
    <div class="cabecera__barra contenedor">
      <RouterLink class="cabecera__logo" to="/" aria-label="Depil Ec — inicio">
        <img :src="logo" alt="Depil Ec" width="140" height="41" />
      </RouterLink>

      <div class="cabecera__acciones">
        <BaseButton
          class="cabecera__cta"
          variante="dorado"
          tamano="sm"
          icono="fa-brands fa-whatsapp"
          :href="whatsappUrl()"
        >
          Agenda tu cita
        </BaseButton>

        <button
          class="disparador"
          :class="{ 'disparador--activo': menuAbierto }"
          type="button"
          :aria-expanded="menuAbierto"
          :aria-label="menuAbierto ? 'Cerrar menú' : 'Abrir menú'"
          @click="menuAbierto = !menuAbierto"
        >
          <span class="disparador__texto">
            <span class="disparador__mascara">
              <em>Menú</em>
              <em>Cerrar</em>
            </span>
          </span>
          <span class="disparador__barras" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>
    </div>

    <MenuOverlay :abierto="menuAbierto" @cerrar="menuAbierto = false" />
  </header>
</template>

<style scoped lang="scss">
.cabecera {
  position: fixed;
  inset: 0 0 auto;
  // Por encima del overlay (950) para no perder el botón de cierre.
  z-index: 960;
  border-bottom: 1px solid transparent;
  transition:
    background var(--dur-media) ease,
    box-shadow var(--dur-media) ease,
    border-color var(--dur-media) ease;

  &--compacta {
    background: rgba($ink, 0.86);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom-color: var(--border);
    box-shadow: var(--sombra-suave);
  }

  &__barra {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    height: var(--alto-header);
  }

  &__logo img {
    width: auto;
    height: 2.1rem;
    object-fit: contain;

    @include desde($bp-md) {
      height: 2.5rem;
    }
  }

  &__acciones {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  &__cta {
    display: none;

    @include desde($bp-sm) {
      display: inline-flex;
    }
  }

  // Con el menú abierto el CTA estorba a la composición.
  &--menu &__cta {
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--dur-rapida) ease;
  }
}

.disparador {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.45rem 0.9rem 0.45rem 1rem;
  border-radius: 99px;
  border: 1px solid rgba($primary, 0.4);
  color: $primary;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition:
    background var(--dur-media) ease,
    border-color var(--dur-media) ease;

  @include puede-hover {
    &:hover {
      background: rgba($primary, 0.14);
      border-color: $primary;
    }
  }

  // Máscara vertical: "Menú" sube y "Cerrar" entra desde abajo.
  &__texto {
    display: block;
    height: 1em;
    overflow: hidden;
  }

  &__mascara {
    display: flex;
    flex-direction: column;
    transition: transform var(--dur-media) var(--ease-suave);

    em {
      display: block;
      height: 1em;
      line-height: 1;
      font-style: normal;
    }
  }

  &--activo &__mascara {
    transform: translateY(-1em);
  }

  &__barras {
    position: relative;
    display: block;
    width: 1.15rem;
    height: 0.6rem;

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1.5px;
      border-radius: 2px;
      background: currentColor;
      transition: transform var(--dur-media) var(--ease-suave);
    }

    span:nth-child(1) {
      top: 0;
    }
    span:nth-child(2) {
      bottom: 0;
    }
  }

  &--activo &__barras span:nth-child(1) {
    transform: translateY(0.29rem) rotate(45deg);
  }

  &--activo &__barras span:nth-child(2) {
    transform: translateY(-0.29rem) rotate(-45deg);
  }

  @include sin-movimiento {
    &__mascara,
    &__barras span {
      transition: none;
    }
  }
}
</style>
