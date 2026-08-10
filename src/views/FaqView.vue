<script setup lang="ts">
/**
 * /preguntas-frecuentes
 *
 * Página clave para GEO: cada respuesta es autocontenida (se entiende sin leer
 * la pregunta ni el resto de la página), que es lo que los motores generativos
 * extraen y citan. El JSON-LD FAQPage habilita además el rich result de Google.
 */
import BaseButton from '@/components/ui/BaseButton.vue'
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { faqLd, migasLd } from '@/config/seo'
import { FAQ } from '@/config/faq'
import { whatsappUrl } from '@/config/site'

const migas = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Preguntas frecuentes', ruta: '/preguntas-frecuentes' },
]

useSeo(() => ({
  titulo: 'Preguntas Frecuentes sobre Depilación Láser | Depil Ec',
  descripcion:
    '¿Duele la depilación láser? ¿Cuántas sesiones necesito? ¿Sirve en piel oscura o con tatuajes? Respuestas claras de nuestras especialistas sobre el tratamiento Tri-Laser & 4D.',
  ruta: '/preguntas-frecuentes',
  jsonLd: [faqLd(), migasLd(migas)],
}))
</script>

<template>
  <div class="pagina">
    <PageHero
      titulo="Preguntas frecuentes"
      kicker="Resolvemos tus dudas"
      descripcion="Todo lo que necesitas saber antes de tu primera sesión de depilación láser."
      imagen-fondo="depil/features/protocolos"
      :migas="migas"
    />

    <section class="faq-pagina">
      <div class="contenedor">
        <!-- <details> nativo: accesible, funciona sin JS y el texto queda en el HTML
             para los crawlers y los motores generativos. -->
        <details v-for="(item, i) in FAQ" :key="item.id" class="pregunta" :open="i === 0">
          <summary>
            <h2>{{ item.pregunta }}</h2>
            <i class="fa-solid fa-plus" aria-hidden="true" />
          </summary>
          <p>{{ item.respuesta }}</p>
        </details>

        <div class="faq-pagina__cta">
          <p>¿Tu pregunta no está aquí?</p>
          <BaseButton
            variante="whatsapp"
            icono="fa-brands fa-whatsapp"
            :href="whatsappUrl('Hola 😁, tengo una duda sobre la depilación láser.')"
          >
            Pregúntale a una especialista
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.faq-pagina {
  @include seccion;
  background: var(--bg);

  .contenedor {
    max-width: 52rem;
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
    margin-top: 2.5rem;
    text-align: center;

    p {
      color: var(--text-muted);
    }
  }
}

.pregunta {
  margin-bottom: 0.65rem;
  border-radius: var(--radio-md);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  transition: border-color var(--dur-media) ease;

  &[open] {
    border-color: rgba($primary, 0.45);
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.05rem 1.15rem;
    cursor: pointer;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    @include desde($bp-md) {
      padding: 1.25rem 1.5rem;
    }

    h2 {
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.4;

      @include desde($bp-md) {
        font-size: 1rem;
      }
    }

    i {
      flex-shrink: 0;
      display: grid;
      place-items: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      background: var(--accent-soft);
      color: $primary;
      font-size: 0.7rem;
      transition: transform var(--dur-media) var(--ease-suave);
    }
  }

  &[open] summary {
    color: $primary;

    i {
      transform: rotate(135deg);
    }
  }

  p {
    padding: 0 1.15rem 1.2rem;
    color: var(--text-muted);
    font-size: 0.875rem;
    line-height: 1.7;

    @include desde($bp-md) {
      padding: 0 1.5rem 1.4rem;
      font-size: 0.9375rem;
    }
  }
}
</style>
