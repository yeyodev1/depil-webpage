<script setup lang="ts">
/** Acordeón de preguntas frecuentes con transición de altura suave. */
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { FAQ } from '@/config/faq'
import { whatsappUrl } from '@/config/site'

const raiz = ref<HTMLElement | null>(null)
const abierta = ref<string | null>(FAQ[0]?.id ?? null)

useScrollReveal(raiz, { hijos: '[data-reveal]', cascada: 0.05, desplazamiento: 32 })

function alternar(id: string) {
  abierta.value = abierta.value === id ? null : id
}

// Transición de altura: se mide el contenido real en cada apertura/cierre.
function antesDeEntrar(el: Element) {
  ;(el as HTMLElement).style.height = '0'
}
function alEntrar(el: Element) {
  const nodo = el as HTMLElement
  nodo.style.height = `${nodo.scrollHeight}px`
}
function despuesDeEntrar(el: Element) {
  ;(el as HTMLElement).style.height = 'auto'
}
function antesDeSalir(el: Element) {
  const nodo = el as HTMLElement
  nodo.style.height = `${nodo.scrollHeight}px`
  void nodo.offsetHeight
}
function alSalir(el: Element) {
  ;(el as HTMLElement).style.height = '0'
}
</script>

<template>
  <section id="faq" ref="raiz" class="faq">
    <div class="contenedor faq__layout">
      <div class="faq__lateral">
        <SectionHeader
          kicker="Preguntas frecuentes"
          titulo="Resolvemos"
          resaltado="todas tus dudas"
          alineacion="izquierda"
          descripcion="Y si te queda alguna, una especialista te responde al instante."
        />
        <div class="faq__acciones">
          <BaseButton
            variante="whatsapp"
            icono="fa-brands fa-whatsapp"
            :href="whatsappUrl('Hola 😁, tengo una duda sobre la depilación láser.')"
          >
            Preguntar por WhatsApp
          </BaseButton>
          <BaseButton
            variante="contorno"
            icono-derecha="fa-solid fa-arrow-right-long"
            to="/preguntas-frecuentes"
          >
            Ver todas las preguntas
          </BaseButton>
        </div>
      </div>

      <ul class="faq__lista">
        <li v-for="item in FAQ" :key="item.id" class="acordeon" data-reveal>
          <h3>
            <button
              class="acordeon__boton"
              :class="{ 'acordeon__boton--abierto': abierta === item.id }"
              type="button"
              :aria-expanded="abierta === item.id"
              :aria-controls="`faq-${item.id}`"
              @click="alternar(item.id)"
            >
              <span>{{ item.pregunta }}</span>
              <i class="fa-solid fa-plus acordeon__mas" aria-hidden="true" />
            </button>
          </h3>

          <Transition
            name="desplegar"
            @before-enter="antesDeEntrar"
            @enter="alEntrar"
            @after-enter="despuesDeEntrar"
            @before-leave="antesDeSalir"
            @leave="alSalir"
          >
            <div v-if="abierta === item.id" :id="`faq-${item.id}`" class="acordeon__panel">
              <p>{{ item.respuesta }}</p>
            </div>
          </Transition>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  @include seccion;
  background: var(--bg-alt);

  &__layout {
    display: grid;
    gap: 2rem;

    @include desde($bp-lg) {
      grid-template-columns: 0.85fr 1.15fr;
      gap: 3.5rem;
      align-items: start;
    }
  }

  &__lateral {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @include desde($bp-lg) {
      position: sticky;
      top: calc(var(--alto-header) + 2rem);
    }

    :deep(.encabezado) {
      margin-bottom: 1.5rem;
    }
  }

  &__acciones {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  &__lista {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    list-style: none;
  }
}

.acordeon {
  border-radius: var(--radio-md);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  transition: border-color var(--dur-media) ease, background var(--dur-media) ease;

  &:has(.acordeon__boton--abierto) {
    border-color: rgba($primary, 0.45);
  }

  h3 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  &__boton {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    padding: 1.05rem 1.15rem;
    text-align: left;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.4;
    transition: color var(--dur-rapida) ease;

    @include desde($bp-md) {
      padding: 1.25rem 1.5rem;
      font-size: 1rem;
    }

    @include puede-hover {
      &:hover {
        color: $primary;
      }
    }

    &--abierto {
      color: $primary;
    }
  }

  &__mas {
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

  &__boton--abierto &__mas {
    transform: rotate(135deg);
  }

  &__panel {
    overflow: hidden;

    p {
      margin: 0;
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
}

.desplegar-enter-active,
.desplegar-leave-active {
  transition:
    height var(--dur-media) var(--ease-suave),
    opacity var(--dur-rapida) ease;
}

.desplegar-enter-from,
.desplegar-leave-to {
  opacity: 0;
}
</style>
