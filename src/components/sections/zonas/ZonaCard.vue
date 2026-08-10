<script setup lang="ts">
/**
 * Tarjeta de zona en la home.
 *
 * Es un RouterLink a la landing de la zona, no un botón con modal: así la
 * página existe de verdad para el usuario y para los crawlers (enlazado
 * interno). El detalle completo vive en /depilacion-laser/:slug.
 */
import { RouterLink } from 'vue-router'
import CldImage from '@/components/ui/CldImage.vue'
import type { Zona } from '@/config/zonas'

defineProps<{ zona: Zona }>()
</script>

<template>
  <RouterLink class="zona" :to="`/depilacion-laser/${zona.id}`">
    <div class="zona__imagen">
      <CldImage
        :public-id="zona.imagen"
        :alt="`Depilación láser ${zona.nombre}`"
        :ancho="640"
        aspecto="1:1"
        sizes="(max-width: 575px) 50vw, (max-width: 1023px) 33vw, 25vw"
      />
    </div>

    <div class="zona__capa" aria-hidden="true" />

    <div class="zona__info">
      <span class="zona__icono"><i :class="zona.icono" aria-hidden="true" /></span>
      <h3 class="zona__nombre">{{ zona.nombre }}</h3>
      <p class="zona__desc">{{ zona.descripcion }}</p>
      <span class="zona__mas">
        Ver tratamiento <i class="fa-solid fa-arrow-right-long" aria-hidden="true" />
      </span>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.zona {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radio-lg);
  overflow: hidden;
  text-align: left;
  @include borde-dorado(0.14);
  transition:
    transform var(--dur-media) var(--ease-suave),
    border-color var(--dur-media) ease,
    box-shadow var(--dur-media) var(--ease-suave);

  @include puede-hover {
    &:hover {
      transform: translateY(-6px);
      border-color: rgba($primary, 0.55);
      box-shadow: 0 26px 52px -26px rgba($primary, 0.55);
    }

    &:hover .zona__imagen :deep(img) {
      transform: scale(1.09);
    }

    &:hover .zona__desc,
    &:hover .zona__mas {
      opacity: 1;
      max-height: 8rem;
      transform: translateY(0);
    }

    &:hover .zona__capa {
      opacity: 1;
    }
  }

  &__imagen {
    position: absolute;
    inset: 0;

    :deep(img) {
      transition: transform var(--dur-lenta) var(--ease-suave);
    }
  }

  &__capa {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba($ink, 0.05) 0%, rgba($ink, 0.9) 72%);
    transition: opacity var(--dur-media) ease;
  }

  &__info {
    position: absolute;
    inset: auto 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1rem;

    @include desde($bp-md) {
      padding: 1.25rem;
    }
  }

  &__icono {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba($primary, 0.9);
    color: $ink;
    font-size: 0.8rem;
  }

  &__nombre {
    margin: 0;
    font-size: 0.9375rem;
    font-weight: 700;

    @include desde($bp-md) {
      font-size: 1.0625rem;
    }
  }

  &__desc {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.8125rem;
    line-height: 1.45;
    @include lineas(3);
  }

  &__mas {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: $primary;
    font-size: 0.75rem;
    font-weight: 600;
  }

  // En desktop el detalle aparece al hacer hover; en mobile siempre visible.
  @include desde($bp-md) {
    .zona__desc,
    .zona__mas {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
      transform: translateY(8px);
      transition:
        opacity var(--dur-media) ease,
        max-height var(--dur-media) var(--ease-suave),
        transform var(--dur-media) var(--ease-suave);
    }
  }

  @include sin-movimiento {
    transition: none;

    .zona__desc,
    .zona__mas {
      opacity: 1;
      max-height: none;
      transform: none;
    }
  }
}
</style>
