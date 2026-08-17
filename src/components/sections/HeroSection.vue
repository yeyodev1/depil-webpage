<script setup lang="ts">
/** Hero: título en cascada GSAP, fondo con parallax y sello FDA. */
import { onMounted, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CldImage from '@/components/ui/CldImage.vue'
import { cldSrcset, cldUrl } from '@/composables/useCloudinary'
import { gsap, SIN_MOVIMIENTO, BREAKPOINT_DESKTOP } from '@/composables/useScrollReveal'
import { SITE, whatsappUrl } from '@/config/site'

const raiz = ref<HTMLElement | null>(null)
const fondo = ref<HTMLElement | null>(null)

// El hero es el recurso LCP: con srcset el móvil baja ~12 KB en vez de 68 KB.
const fondoUrl = cldUrl(SITE.portada, { ancho: 1920, recorte: 'fill', gravedad: 'auto' })
const fondoSrcset = cldSrcset(
  SITE.portada,
  { recorte: 'fill', gravedad: 'auto' },
  [640, 960, 1280, 1600, 1920],
)

onMounted(() => {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add({ desktop: BREAKPOINT_DESKTOP, reducido: SIN_MOVIMIENTO }, (contexto) => {
      const { desktop, reducido } = contexto.conditions as Record<string, boolean>
      if (reducido) return

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-fondo]', { scale: 1.15, duration: 1.8 })
        .from('[data-hero-kicker]', { autoAlpha: 0, y: 20, duration: 0.7 }, 0.25)
        .from('[data-hero-linea]', { autoAlpha: 0, y: 40, duration: 0.9, stagger: 0.12 }, 0.4)
        .from('[data-hero-texto]', { autoAlpha: 0, y: 24, duration: 0.7 }, 0.8)
        .from('[data-hero-cta]', { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.1 }, 0.95)
        .from('[data-hero-sello]', { autoAlpha: 0, scale: 0.85, duration: 0.8 }, 1.05)
        .from('[data-hero-scroll]', { autoAlpha: 0, y: -12, duration: 0.6 }, 1.2)

      if (desktop) {
        gsap.to(fondo.value, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: raiz.value, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
    })
  }, raiz.value ?? undefined)

  return () => ctx.revert()
})
</script>

<template>
  <section id="inicio" ref="raiz" class="hero">
    <div ref="fondo" class="hero__fondo" data-hero-fondo aria-hidden="true">
      <img :src="fondoUrl" :srcset="fondoSrcset" sizes="100vw" alt="" fetchpriority="high" />
    </div>
    <div class="hero__velo" aria-hidden="true" />

    <div class="hero__contenido contenedor">
      <p class="hero__kicker" data-hero-kicker>
        <i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
        Depilación definitiva
      </p>

      <!--
        El H1 debe contener la keyword principal ("depilación láser"), no solo
        el nombre de la tecnología: es la señal más fuerte de la página.
        El tamaño tipográfico se escalona por línea para no perder el impacto.
      -->
      <h1 class="hero__titulo">
        <span class="hero__linea hero__linea--sm" data-hero-linea>Depilación láser</span>
        <!-- Espacio explícito: los <span> son `block`, así que sin él el texto
             plano que leen los crawlers quedaría "láserTri-Laser". -->
        {{ ' ' }}
        <span class="hero__linea texto-dorado" data-hero-linea>Tri-Laser &amp; 4D</span>
      </h1>

      <p class="hero__texto" data-hero-texto>
        Elimina el vello de forma definitiva en todo tipo de piel. Tratamiento seguro, indoloro y
        con resultados visibles desde la primera sesión.
      </p>

      <div class="hero__acciones">
        <BaseButton
          variante="dorado"
          tamano="lg"
          icono="fa-brands fa-whatsapp"
          :href="whatsappUrl()"
          data-hero-cta
        >
          Habla con una especialista
        </BaseButton>
        <BaseButton
          variante="contorno"
          tamano="lg"
          icono-derecha="fa-solid fa-arrow-down-long"
          href="#zonas"
          :externo="false"
          data-hero-cta
        >
          Ver zonas
        </BaseButton>
      </div>

      <div class="hero__sello" data-hero-sello>
        <CldImage
          :public-id="SITE.selloFda"
          alt="Certificación FDA"
          :ancho="120"
          recorte="fit"
          sizes="72px"
        />
        <p>Aprobados y certificados por la <strong>FDA</strong></p>
      </div>
    </div>

    <a class="hero__scroll" href="#nosotros" aria-label="Ir a la siguiente sección" data-hero-scroll>
      <span class="hero__raton" aria-hidden="true"><span /></span>
    </a>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding-block: calc(var(--alto-header) + 3rem) 5rem;
  overflow: hidden;
  isolation: isolate;

  &__fondo {
    position: absolute;
    inset: -8% 0;
    z-index: -2;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
    }
  }

  &__velo {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(180deg, rgba($ink, 0.9) 0%, rgba($ink, 0.55) 45%, rgba($ink, 0.97) 100%),
      radial-gradient(65% 50% at 50% 42%, rgba($primary, 0.18), transparent 72%);
  }

  &__contenido {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    text-align: center;
  }

  &__kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.42rem 0.95rem;
    border-radius: 99px;
    border: 1px solid rgba($primary, 0.4);
    background: rgba($primary, 0.1);
    color: $primary;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  &__titulo {
    margin: 0;
    font-size: clamp(2.75rem, 1.5rem + 9vw, 7rem);
    line-height: 0.95;
    letter-spacing: -0.03em;
  }

  &__linea {
    display: block;

    &--sm {
      font-size: 0.52em;
      letter-spacing: -0.02em;
    }
  }

  &__texto {
    max-width: 46ch;
    margin-inline: auto;
    color: var(--text-muted);
    font-size: clamp(1rem, 0.95rem + 0.4vw, 1.1875rem);
  }

  &__acciones {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.85rem;
    margin-top: 0.5rem;

    @include hasta($bp-sm) {
      width: 100%;

      :deep(.btn) {
        flex: 1 1 100%;
      }
    }
  }

  &__sello {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-top: 1.5rem;
    padding: 0.65rem 1.1rem 0.65rem 0.65rem;
    border-radius: 99px;
    @include vidrio(0.05, 10px);
    border: 1px solid var(--border);

    :deep(.cld-imagen) {
      width: 3.25rem;
      height: 2rem;
      flex-shrink: 0;
      background: transparent;

      img {
        object-fit: contain;
      }
    }

    p {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.8125rem;

      strong {
        color: $primary;
      }
    }
  }

  &__scroll {
    position: absolute;
    left: 50%;
    bottom: 1.75rem;
    transform: translateX(-50%);
    display: none;

    @include desde($bp-md) {
      display: block;
    }
  }

  &__raton {
    display: block;
    width: 1.6rem;
    height: 2.65rem;
    border: 1.5px solid rgba($primary, 0.6);
    border-radius: 99px;
    position: relative;

    span {
      position: absolute;
      left: 50%;
      top: 0.5rem;
      width: 3px;
      height: 0.55rem;
      margin-left: -1.5px;
      border-radius: 99px;
      background: $primary;
      animation: rueda 1.9s var(--ease-suave) infinite;
    }
  }
}

@keyframes rueda {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(0.95rem);
  }
}
</style>
