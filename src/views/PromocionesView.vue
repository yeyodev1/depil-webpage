<script setup lang="ts">
/** /promociones */
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import CldImage from '@/components/ui/CldImage.vue'
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { migasLd } from '@/config/seo'
import { PROMOCIONES, type Promocion } from '@/config/testimonios'
import { whatsappUrl } from '@/config/site'

const activa = ref<Promocion | null>(null)

const migas = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Promociones', ruta: '/promociones' },
]

useSeo(() => ({
  titulo: 'Promociones de Depilación Láser | Depil Ec Ecuador',
  descripcion:
    'Conoce las promociones vigentes de depilación láser Tri-Laser & 4D en Depil Ec. Paquetes por zona y combos para Quito, Guayaquil, Samborondón, Ceibos y Manta.',
  ruta: '/promociones',
  jsonLd: [migasLd(migas)],
}))
</script>

<template>
  <div class="pagina">
    <PageHero
      titulo="Promociones vigentes"
      kicker="Ofertas"
      descripcion="Aprovecha nuestros paquetes por zona. Toca una promoción para verla en grande y cotizarla al instante."
      imagen-fondo="depil/promos/promo-1"
      :migas="migas"
    />

    <section class="promos-pagina">
      <div class="contenedor">
        <ul class="promos-pagina__grid">
          <li v-for="p in PROMOCIONES" :key="p.id">
            <button type="button" @click="activa = p">
              <CldImage
                :public-id="p.imagen"
                :alt="p.alt"
                :ancho="700"
                aspecto="4:5"
                sizes="(max-width: 575px) 92vw, (max-width: 1023px) 45vw, 30vw"
              />
              <span class="promos-pagina__lupa" aria-hidden="true">
                <i class="fa-solid fa-magnifying-glass-plus" />
              </span>
            </button>
          </li>
        </ul>

        <div class="promos-pagina__cta">
          <BaseButton
            variante="dorado"
            tamano="lg"
            icono="fa-solid fa-tags"
            :href="whatsappUrl('Hola 😁, quiero obtener una promoción de Depil.')"
          >
            ¡Obtén tu promoción!
          </BaseButton>
        </div>
      </div>
    </section>

    <BaseModal :abierto="!!activa" ancho="md" @cerrar="activa = null">
      <div v-if="activa" class="lightbox">
        <CldImage
          :public-id="activa.imagen"
          :alt="activa.alt"
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
  </div>
</template>

<style scoped lang="scss">
.promos-pagina {
  @include seccion;
  background: var(--bg);

  &__grid {
    display: grid;
    gap: 1rem;
    list-style: none;

    @include desde($bp-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desde($bp-lg) {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    button {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: 4 / 5;
      border-radius: var(--radio-lg);
      overflow: hidden;
      @include borde-dorado(0.16);
      transition:
        transform var(--dur-media) var(--ease-suave),
        border-color var(--dur-media) ease;

      @include puede-hover {
        &:hover {
          transform: translateY(-6px);
          border-color: rgba($primary, 0.5);
        }
      }
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
  }

  &__cta {
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
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
