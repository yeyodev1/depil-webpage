<script setup lang="ts">
/** ¿Quiénes somos? + diferenciadores + video institucional en modal. */
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import CldImage from '@/components/ui/CldImage.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { cldVideoPoster, cldVideoUrl } from '@/composables/useCloudinary'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { DIFERENCIADORES, SITE } from '@/config/site'

const raiz = ref<HTMLElement | null>(null)
const videoAbierto = ref(false)

useScrollReveal(raiz, { hijos: '[data-reveal]', cascada: 0.1, desplazamiento: 44 })

const videoSrc = cldVideoUrl(SITE.videoIntro, 720)
const videoPoster = cldVideoPoster(SITE.videoIntro, 720)
</script>

<template>
  <section id="nosotros" ref="raiz" class="nosotros">
    <div class="contenedor">
      <SectionHeader
        kicker="¿Quiénes somos?"
        titulo="Resultados reales,"
        resaltado="tecnología de vanguardia"
      />

      <div class="nosotros__intro">
        <div class="nosotros__texto" data-reveal>
          <p>
            En Depil transformamos la depilación láser en una experiencia exclusiva con tecnología
            <strong>TriLaser &amp; 4D</strong>, que combina tres longitudes de onda para eliminar el
            vello en todo tipo de piel, asegurando un tratamiento seguro, indoloro y efectivo.
          </p>
          <p>
            Nuestro equipo de especialistas te acompaña en cada sesión, garantizando un servicio de
            calidad en un ambiente de lujo diseñado para tu comodidad, con resultados visibles desde
            la primera sesión.
          </p>

          <BaseButton
            variante="contorno"
            icono="fa-solid fa-circle-play"
            :externo="false"
            @click="videoAbierto = true"
          >
            Ver video
          </BaseButton>
        </div>

        <button class="nosotros__video" type="button" data-reveal @click="videoAbierto = true">
          <img :src="videoPoster" alt="Video: lo que necesitas saber antes de tu depilación láser" loading="lazy" />
          <span class="nosotros__play" aria-hidden="true"><i class="fa-solid fa-play" /></span>
          <span class="solo-lectores">Reproducir video institucional</span>
        </button>
      </div>

      <ul class="nosotros__grid">
        <li v-for="item in DIFERENCIADORES" :key="item.id" class="tarjeta" data-reveal>
          <div class="tarjeta__imagen">
            <CldImage
              :public-id="item.imagen"
              :alt="item.titulo"
              :ancho="480"
              aspecto="3:4"
              sizes="(max-width: 767px) 45vw, 22vw"
            />
          </div>
          <div class="tarjeta__pie">
            <span class="tarjeta__icono"><i :class="item.icono" aria-hidden="true" /></span>
            <h3>{{ item.titulo }}</h3>
          </div>
        </li>
      </ul>
    </div>

    <BaseModal
      :abierto="videoAbierto"
      titulo="Lo que necesitas saber"
      descripcion="Antes de iniciar tu depilación láser"
      ancho="lg"
      @cerrar="videoAbierto = false"
    >
      <video
        v-if="videoAbierto"
        class="nosotros__reproductor"
        :src="videoSrc"
        :poster="videoPoster"
        controls
        playsinline
        preload="metadata"
      />
    </BaseModal>
  </section>
</template>

<style scoped lang="scss">
.nosotros {
  @include seccion;
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%);

  &__intro {
    display: grid;
    gap: 2rem;
    margin-bottom: 3rem;

    @include desde($bp-lg) {
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 3.5rem;
      margin-bottom: 4.5rem;
    }
  }

  &__texto {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.1rem;
    color: var(--text-muted);
    font-size: 1rem;

    strong {
      color: $primary;
      font-weight: 600;
    }
  }

  &__video {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 11;
    border-radius: var(--radio-lg);
    overflow: hidden;
    @include borde-dorado(0.22);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--dur-lenta) var(--ease-suave);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba($ink, 0.1), rgba($ink, 0.65));
    }

    @include puede-hover {
      &:hover img {
        transform: scale(1.06);
      }

      &:hover .nosotros__play {
        transform: translate(-50%, -50%) scale(1.12);
      }
    }
  }

  &__play {
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    width: 4.25rem;
    height: 4.25rem;
    border-radius: 50%;
    background: linear-gradient(120deg, $gold-gradient-from, $gold-gradient-mid);
    color: $ink;
    font-size: 1.35rem;
    padding-left: 0.2rem;
    box-shadow: 0 16px 40px -14px rgba($primary, 0.9);
    transition: transform var(--dur-media) var(--ease-suave);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    list-style: none;

    @include desde($bp-lg) {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
  }

  &__reproductor {
    width: 100%;
    max-height: 70dvh;
    border-radius: var(--radio-md);
    background: #000;
  }
}

.tarjeta {
  @include tarjeta;
  display: flex;
  flex-direction: column;

  &__imagen {
    aspect-ratio: 3 / 4;
    overflow: hidden;

    :deep(img) {
      transition: transform var(--dur-lenta) var(--ease-suave);
    }
  }

  @include puede-hover {
    &:hover &__imagen :deep(img) {
      transform: scale(1.07);
    }
  }

  &__pie {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.9rem 1rem 1.1rem;

    h3 {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.35;

      @include desde($bp-md) {
        font-size: 0.9375rem;
      }
    }
  }

  &__icono {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background: var(--accent-soft);
    color: $primary;
    font-size: 0.85rem;
  }
}
</style>
