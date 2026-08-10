<script setup lang="ts">
/** Carrusel de promociones con scroll-snap y lightbox. */
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import CldImage from '@/components/ui/CldImage.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { PROMOCIONES, type Promocion } from '@/config/testimonios'
import { whatsappUrl } from '@/config/site'

const raiz = ref<HTMLElement | null>(null)
const pista = ref<HTMLElement | null>(null)
const promoActiva = ref<Promocion | null>(null)

useScrollReveal(raiz, { hijos: '[data-reveal]', cascada: 0.07, desplazamiento: 40 })

function desplazar(direccion: 1 | -1) {
  const el = pista.value
  if (!el) return
  el.scrollBy({ left: direccion * el.clientWidth * 0.8, behavior: 'smooth' })
}
</script>

<template>
  <section id="promociones" ref="raiz" class="promos">
    <div class="contenedor">
      <SectionHeader
        kicker="Promociones"
        titulo="Ofertas vigentes"
        resaltado="para ti"
        descripcion="Toca una promoción para verla en grande y cotizarla al instante por WhatsApp."
      />

      <div class="promos__carrusel" data-reveal>
        <button
          class="promos__flecha promos__flecha--izq"
          type="button"
          aria-label="Promociones anteriores"
          @click="desplazar(-1)"
        >
          <i class="fa-solid fa-chevron-left" aria-hidden="true" />
        </button>

        <ul ref="pista" class="promos__pista">
          <li v-for="promo in PROMOCIONES" :key="promo.id">
            <button class="promo" type="button" @click="promoActiva = promo">
              <CldImage
                :public-id="promo.imagen"
                :alt="promo.alt"
                :ancho="640"
                aspecto="4:5"
                sizes="(max-width: 575px) 72vw, (max-width: 1023px) 40vw, 24vw"
              />
              <span class="promo__lupa" aria-hidden="true">
                <i class="fa-solid fa-magnifying-glass-plus" />
              </span>
            </button>
          </li>
        </ul>

        <button
          class="promos__flecha promos__flecha--der"
          type="button"
          aria-label="Siguientes promociones"
          @click="desplazar(1)"
        >
          <i class="fa-solid fa-chevron-right" aria-hidden="true" />
        </button>
      </div>

      <div class="promos__cta" data-reveal>
        <BaseButton
          variante="dorado"
          tamano="lg"
          icono="fa-solid fa-tags"
          :href="whatsappUrl('Hola 😁, quiero obtener una promoción de Depil.')"
        >
          ¡Obtén tu promoción!
        </BaseButton>
        <BaseButton
          variante="contorno"
          tamano="lg"
          icono-derecha="fa-solid fa-arrow-right-long"
          to="/promociones"
        >
          Ver todas las promociones
        </BaseButton>
      </div>
    </div>

    <BaseModal :abierto="!!promoActiva" ancho="md" @cerrar="promoActiva = null">
      <div v-if="promoActiva" class="lightbox">
        <CldImage
          :public-id="promoActiva.imagen"
          :alt="promoActiva.alt"
          :ancho="1000"
          recorte="fit"
          sizes="(max-width: 767px) 92vw, 520px"
        />
        <BaseButton
          variante="whatsapp"
          icono="fa-brands fa-whatsapp"
          bloque
          :href="whatsappUrl('Hola 😁, me interesa esta promoción que vi en su página web.')"
        >
          Quiero esta promoción
        </BaseButton>
      </div>
    </BaseModal>
  </section>
</template>

<style scoped lang="scss">
.promos {
  @include seccion;
  background: var(--bg-alt);

  &__carrusel {
    position: relative;
  }

  &__pista {
    display: flex;
    gap: 0.85rem;
    padding-bottom: 0.5rem;
    list-style: none;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 0.5rem;
    @include scroll-oculto;

    @include desde($bp-md) {
      gap: 1.25rem;
    }

    > li {
      flex: 0 0 auto;
      width: 72%;
      scroll-snap-align: center;

      @include desde($bp-sm) {
        width: 40%;
      }

      @include desde($bp-lg) {
        width: 23%;
        scroll-snap-align: start;
      }
    }
  }

  &__flecha {
    position: absolute;
    top: 50%;
    z-index: 2;
    display: none;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    transform: translateY(-50%);
    border-radius: 50%;
    border: 1px solid var(--border);
    background: rgba($ink, 0.85);
    backdrop-filter: blur(8px);
    color: $primary;
    transition:
      background var(--dur-media) ease,
      transform var(--dur-rapida) var(--ease-suave);

    @include desde($bp-lg) {
      display: grid;
    }

    @include puede-hover {
      &:hover {
        background: rgba($primary, 0.2);
      }
    }

    &--izq {
      left: -1.25rem;
    }

    &--der {
      right: -1.25rem;
    }
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.85rem;
    margin-top: 2.25rem;
  }
}

.promo {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: var(--radio-lg);
  overflow: hidden;
  @include borde-dorado(0.16);
  transition:
    transform var(--dur-media) var(--ease-suave),
    border-color var(--dur-media) ease,
    box-shadow var(--dur-media) var(--ease-suave);

  :deep(.cld-imagen) {
    height: 100%;
  }

  :deep(img) {
    transition: transform var(--dur-lenta) var(--ease-suave);
  }

  @include puede-hover {
    &:hover {
      transform: translateY(-6px);
      border-color: rgba($primary, 0.5);
      box-shadow: 0 24px 48px -24px rgba($primary, 0.5);
    }

    &:hover :deep(img) {
      transform: scale(1.06);
    }

    &:hover .promo__lupa {
      opacity: 1;
      transform: scale(1);
    }
  }

  &__lupa {
    position: absolute;
    right: 0.75rem;
    bottom: 0.75rem;
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: rgba($primary, 0.92);
    color: $ink;
    opacity: 0;
    transform: scale(0.8);
    transition:
      opacity var(--dur-media) ease,
      transform var(--dur-media) var(--ease-suave);

    @include movil {
      opacity: 1;
      transform: scale(1);
    }
  }
}

.lightbox {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  :deep(.cld-imagen) {
    border-radius: var(--radio-md);
    background: transparent;
  }
}
</style>
