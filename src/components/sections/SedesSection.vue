<script setup lang="ts">
/** Sedes: mapa de Ecuador + tarjetas seleccionables. */
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CldImage from '@/components/ui/CldImage.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { SEDES, SITE, whatsappUrl } from '@/config/site'

const raiz = ref<HTMLElement | null>(null)
const activa = ref(SEDES[0].id)

useScrollReveal(raiz, { hijos: '[data-reveal]', cascada: 0.08, desplazamiento: 40 })

const sedeActiva = computed(() => SEDES.find((s) => s.id === activa.value) ?? SEDES[0])
const mapsUrl = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sedeActiva.value.mapsQuery)}`,
)
</script>

<template>
  <section id="sedes" ref="raiz" class="sedes">
    <div class="contenedor">
      <SectionHeader
        kicker="Nuestras sedes"
        titulo="Estamos cerca"
        resaltado="de ti"
        descripcion="Centros en Quito, Guayaquil, Samborondón, Ceibos y Manta, operando bajo un mismo estándar de calidad."
      />

      <div class="sedes__layout">
        <div class="sedes__mapa" data-reveal>
          <CldImage
            :public-id="SITE.mapaEcuador"
            alt="Mapa del Ecuador con las sedes de Depil"
            :ancho="720"
            recorte="fit"
            sizes="(max-width: 1023px) 60vw, 380px"
          />
          <ul class="sedes__pastillas">
            <li v-for="sede in SEDES" :key="sede.id">
              <button
                type="button"
                :class="{ 'is-activa': activa === sede.id }"
                @click="activa = sede.id"
              >
                <i class="fa-solid fa-location-dot" aria-hidden="true" />
                {{ sede.nombre.replace('Depil ', '') }}
              </button>
            </li>
          </ul>
        </div>

        <div class="sedes__detalle" data-reveal>
          <Transition name="subir" mode="out-in">
            <article :key="sedeActiva.id" class="sede">
              <div class="sede__imagen">
                <CldImage
                  :public-id="sedeActiva.imagen"
                  :alt="sedeActiva.nombre"
                  :ancho="900"
                  aspecto="4:3"
                  sizes="(max-width: 1023px) 92vw, 620px"
                />
              </div>

              <div class="sede__cuerpo">
                <h3 class="sede__titulo">{{ sedeActiva.nombre }}</h3>
                <p class="sede__direccion">
                  <i class="fa-solid fa-location-dot" aria-hidden="true" />
                  {{ sedeActiva.direccion }}
                </p>

                <div class="sede__acciones">
                  <BaseButton
                    variante="dorado"
                    tamano="sm"
                    icono-derecha="fa-solid fa-arrow-right-long"
                    :to="`/sedes/${sedeActiva.id}`"
                  >
                    Ver esta sede
                  </BaseButton>
                  <BaseButton variante="contorno" tamano="sm" icono="fa-solid fa-map" :href="mapsUrl">
                    Cómo llegar
                  </BaseButton>
                  <BaseButton
                    variante="whatsapp"
                    tamano="sm"
                    icono="fa-brands fa-whatsapp"
                    :href="whatsappUrl(`Hola 😁, quiero agendar una cita en ${sedeActiva.nombre}.`)"
                  >
                    Agendar aquí
                  </BaseButton>
                </div>
              </div>
            </article>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.sedes {
  @include seccion;
  background: linear-gradient(180deg, var(--bg-alt) 0%, var(--bg) 100%);

  &__layout {
    display: grid;
    gap: 2rem;

    @include desde($bp-lg) {
      grid-template-columns: 0.85fr 1.15fr;
      gap: 3rem;
      align-items: center;
    }
  }

  &__mapa {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;

    :deep(.cld-imagen) {
      width: min(60%, 15rem);
      background: transparent;

      @include desde($bp-lg) {
        width: 100%;
      }

      img {
        object-fit: contain;
        filter: drop-shadow(0 18px 34px rgba($primary, 0.28));
      }
    }
  }

  &__pastillas {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    list-style: none;

    button {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.45rem 0.9rem;
      border-radius: 99px;
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.8125rem;
      transition:
        background var(--dur-media) ease,
        color var(--dur-media) ease,
        border-color var(--dur-media) ease,
        transform var(--dur-rapida) var(--ease-suave);

      i {
        font-size: 0.7rem;
        color: $primary;
      }

      @include puede-hover {
        &:hover {
          transform: translateY(-2px);
          border-color: rgba($primary, 0.5);
          color: var(--text);
        }
      }

      &.is-activa {
        background: rgba($primary, 0.16);
        border-color: $primary;
        color: $primary;
        font-weight: 600;
      }
    }
  }
}

.sede {
  @include tarjeta;

  &__imagen {
    aspect-ratio: 4 / 3;
    overflow: hidden;

    @include desde($bp-md) {
      aspect-ratio: 16 / 9;
    }
  }

  &__cuerpo {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;

    @include desde($bp-md) {
      padding: 1.75rem;
    }
  }

  &__titulo {
    margin: 0;
    font-size: 1.25rem;

    @include desde($bp-md) {
      font-size: 1.5rem;
    }
  }

  &__direccion {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;

    i {
      margin-top: 0.25rem;
      color: $primary;
    }
  }

  &__acciones {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-top: 0.35rem;
  }
}
</style>
