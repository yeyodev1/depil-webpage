<script setup lang="ts">
/**
 * Botón/enlace unificado.
 *  - `to`   → RouterLink (navegación interna, sin recarga)
 *  - `href` → <a> (enlaces externos: WhatsApp, Maps, tel:, mailto:)
 *  - nada   → <button>
 */
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variante?: 'dorado' | 'contorno' | 'fantasma' | 'whatsapp' | 'peligro'
    tamano?: 'sm' | 'md' | 'lg'
    icono?: string
    iconoDerecha?: string
    to?: string
    href?: string
    externo?: boolean
    bloque?: boolean
    cargando?: boolean
    deshabilitado?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variante: 'dorado',
    tamano: 'md',
    icono: undefined,
    iconoDerecha: undefined,
    to: undefined,
    href: undefined,
    externo: true,
    bloque: false,
    cargando: false,
    deshabilitado: false,
    type: 'button',
  },
)

const etiqueta = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const atributos = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return {
      href: props.deshabilitado ? undefined : props.href,
      target: props.externo ? '_blank' : undefined,
      rel: props.externo ? 'noopener noreferrer' : undefined,
    }
  }
  return { type: props.type, disabled: props.deshabilitado || props.cargando }
})
</script>

<template>
  <component
    :is="etiqueta"
    class="btn"
    :class="[
      `btn--${variante}`,
      `btn--${tamano}`,
      { 'btn--bloque': bloque, 'btn--cargando': cargando, 'btn--off': deshabilitado },
    ]"
    v-bind="atributos"
  >
    <span class="btn__brillo" aria-hidden="true" />
    <i v-if="cargando" class="fa-solid fa-circle-notch btn__spin" aria-hidden="true" />
    <i v-else-if="icono" :class="icono" aria-hidden="true" />
    <span class="btn__texto"><slot /></span>
    <i v-if="iconoDerecha && !cargando" :class="iconoDerecha" aria-hidden="true" />
  </component>
</template>

<style scoped lang="scss">
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border-radius: 99px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition:
    transform var(--dur-rapida) var(--ease-suave),
    box-shadow var(--dur-media) var(--ease-suave),
    background-color var(--dur-media) ease,
    color var(--dur-media) ease,
    border-color var(--dur-media) ease;

  @include puede-hover {
    &:hover:not(.btn--off) {
      transform: translateY(-2px);
    }
  }

  &:active:not(.btn--off) {
    transform: translateY(0) scale(0.985);
  }

  // Barrido de brillo en hover
  &__brillo {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      110deg,
      transparent 25%,
      rgba($white, 0.28) 50%,
      transparent 75%
    );
    background-size: 220% 100%;
    background-position: 180% 0;
    opacity: 0;
    transition:
      background-position 0.75s var(--ease-suave),
      opacity 0.2s ease;
  }

  @include puede-hover {
    &:hover:not(.btn--off) .btn__brillo {
      opacity: 1;
      background-position: -60% 0;
    }
  }

  &__texto {
    white-space: nowrap;
  }

  &__spin {
    animation: girar 0.9s linear infinite;
  }

  // ── Tamaños ──
  &--sm {
    padding: 0.5rem 1.1rem;
    font-size: 0.8125rem;
  }

  &--md {
    padding: 0.75rem 1.6rem;
    font-size: 0.9rem;
  }

  &--lg {
    padding: 1rem 2.1rem;
    font-size: 1rem;

    @include movil {
      padding: 0.9rem 1.6rem;
      font-size: 0.9375rem;
    }
  }

  &--bloque {
    display: flex;
    width: 100%;
  }

  // ── Variantes ──
  &--dorado {
    background: linear-gradient(
      100deg,
      $gold-gradient-from,
      $gold-gradient-mid 50%,
      $gold-gradient-from
    );
    color: $ink;
    box-shadow: 0 12px 30px -14px rgba($primary, 0.7);

    @include puede-hover {
      &:hover:not(.btn--off) {
        box-shadow: 0 18px 40px -14px rgba($primary, 0.85);
      }
    }
  }

  &--contorno {
    color: $primary;
    border: 1px solid rgba($primary, 0.55);
    background: transparent;

    @include puede-hover {
      &:hover:not(.btn--off) {
        background: rgba($primary, 0.12);
        border-color: $primary;
      }
    }
  }

  &--fantasma {
    color: var(--text);
    background: rgba($white, 0.06);

    @include puede-hover {
      &:hover:not(.btn--off) {
        background: rgba($white, 0.12);
      }
    }
  }

  &--whatsapp {
    background: $whatsapp;
    color: #062e18;
    box-shadow: 0 12px 30px -14px rgba($whatsapp, 0.8);
  }

  &--peligro {
    background: $alert-error;
    color: $white;
    box-shadow: 0 12px 30px -14px rgba($alert-error, 0.7);
  }

  &--off {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  @include sin-movimiento {
    transition: none;

    &:hover {
      transform: none;
    }

    .btn__brillo {
      display: none;
    }
  }
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}
</style>
