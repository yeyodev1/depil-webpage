<script setup lang="ts">
/** Grid de zonas con filtro por grupo y modal de detalle. */
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ZonaCard from './zonas/ZonaCard.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { GRUPOS_ZONA, ZONAS, type GrupoZona } from '@/config/zonas'

const raiz = ref<HTMLElement | null>(null)
const filtro = ref<GrupoZona | 'Todas'>('Todas')

useScrollReveal(raiz, { hijos: '[data-reveal]', cascada: 0.06, desplazamiento: 40 })

const zonasVisibles = computed(() =>
  filtro.value === 'Todas' ? ZONAS : ZONAS.filter((z) => z.grupo === filtro.value),
)
</script>

<template>
  <section id="zonas" ref="raiz" class="zonas">
    <div class="contenedor">
      <SectionHeader
        kicker="Zonas"
        titulo="Trata cualquier zona"
        resaltado="de tu cuerpo"
        descripcion="Protocolos personalizados para cada área. Entra a una zona para ver qué incluye el tratamiento, cómo prepararte y cuántas sesiones necesitas."
      />

      <div class="zonas__filtros" role="tablist" aria-label="Filtrar zonas por grupo" data-reveal>
        <button
          v-for="grupo in GRUPOS_ZONA"
          :key="grupo.id"
          class="zonas__filtro"
          :class="{ 'zonas__filtro--activo': filtro === grupo.id }"
          type="button"
          role="tab"
          :aria-selected="filtro === grupo.id"
          @click="filtro = grupo.id"
        >
          <i :class="grupo.icono" aria-hidden="true" />
          {{ grupo.label }}
        </button>
      </div>

      <TransitionGroup tag="ul" name="lista" class="zonas__grid">
        <li v-for="zona in zonasVisibles" :key="zona.id" data-reveal>
          <ZonaCard :zona="zona" />
        </li>
      </TransitionGroup>

      <div class="zonas__pie" data-reveal>
        <BaseButton
          variante="contorno"
          tamano="lg"
          icono-derecha="fa-solid fa-arrow-right-long"
          to="/depilacion-laser"
        >
          Ver las {{ ZONAS.length }} zonas en detalle
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.zonas {
  @include seccion;
  background: var(--bg-alt);

  &__filtros {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.75rem;
    padding-bottom: 0.35rem;
    overflow-x: auto;
    @include scroll-oculto;

    @include desde($bp-md) {
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
      overflow: visible;
    }
  }

  &__filtro {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    padding: 0.55rem 1.05rem;
    border-radius: 99px;
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.8125rem;
    font-weight: 500;
    white-space: nowrap;
    transition:
      background var(--dur-media) ease,
      color var(--dur-media) ease,
      border-color var(--dur-media) ease,
      transform var(--dur-rapida) var(--ease-suave);

    i {
      font-size: 0.75rem;
    }

    @include puede-hover {
      &:hover {
        color: var(--text);
        border-color: rgba($primary, 0.45);
      }
    }

    &--activo {
      background: linear-gradient(100deg, $gold-gradient-from, $gold-gradient-mid);
      border-color: transparent;
      color: $ink;
      font-weight: 600;
    }
  }

  &__pie {
    display: flex;
    justify-content: center;
    margin-top: 2.25rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    list-style: none;

    @include desde($bp-sm) {
      gap: 1rem;
    }

    @include desde($bp-md) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include desde($bp-lg) {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }
  }
}
</style>
