<script setup lang="ts">
/** Columnas secundarias del menú fullscreen: zonas, sedes y contacto. */
import { RouterLink } from 'vue-router'
import { SEDES, SITE, whatsappUrl } from '@/config/site'
import { ZONAS } from '@/config/zonas'

defineEmits<{ cerrar: []; previsualizar: [publicId: string | null] }>()

const ZONAS_MENU = ZONAS.slice(0, 6)

/** La ciudad solo se muestra cuando aporta algo (Ceibos → Guayaquil). */
const nombreCorto = (nombre: string) => nombre.replace('Depil ', '')
</script>

<template>
  <div class="lateral">
    <section class="lateral__bloque" data-menu-lateral>
      <h2>Zonas destacadas</h2>
      <ul>
        <li v-for="z in ZONAS_MENU" :key="z.id">
          <RouterLink
            :to="`/depilacion-laser/${z.id}`"
            @click="$emit('cerrar')"
            @mouseenter="$emit('previsualizar', z.imagen)"
            @mouseleave="$emit('previsualizar', null)"
          >
            {{ z.nombre }}
          </RouterLink>
        </li>
        <li>
          <RouterLink class="lateral__todas" to="/depilacion-laser" @click="$emit('cerrar')">
            Ver las {{ ZONAS.length }} zonas
            <i class="fa-solid fa-arrow-right-long" aria-hidden="true" />
          </RouterLink>
        </li>
      </ul>
    </section>

    <section class="lateral__bloque" data-menu-lateral>
      <h2>Sedes</h2>
      <ul>
        <li v-for="s in SEDES" :key="s.id">
          <RouterLink
            :to="`/sedes/${s.id}`"
            @click="$emit('cerrar')"
            @mouseenter="$emit('previsualizar', s.imagen)"
            @mouseleave="$emit('previsualizar', null)"
          >
            {{ nombreCorto(s.nombre) }}
            <em v-if="nombreCorto(s.nombre) !== s.ciudad">{{ s.ciudad }}</em>
          </RouterLink>
        </li>
      </ul>
    </section>

    <section class="lateral__bloque" data-menu-lateral>
      <h2>Contacto</h2>
      <ul>
        <li><a :href="`tel:${SITE.telefonoRaw}`">{{ SITE.telefono }}</a></li>
        <li><a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a></li>
        <li>
          <a :href="whatsappUrl()" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-whatsapp" aria-hidden="true" /> Agenda por WhatsApp
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
.lateral {
  display: grid;
  gap: 1.75rem;

  @include desde($bp-sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include desde($bp-lg) {
    padding-left: 2rem;
    border-left: 1px solid rgba($primary, 0.16);
  }

  &__bloque {
    h2 {
      margin-bottom: 0.85rem;
      color: $primary;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      list-style: none;
    }

    a {
      display: flex;
      align-items: baseline;
      gap: 0.4rem;
      color: var(--text-muted);
      font-size: 0.9rem;
      transition:
        color var(--dur-rapida) ease,
        transform var(--dur-rapida) var(--ease-suave);

      em {
        color: rgba($primary, 0.6);
        font-size: 0.72rem;
        font-style: normal;
      }

      i {
        color: $primary;
        font-size: 0.75rem;
      }

      @include puede-hover {
        &:hover {
          color: var(--text);
          transform: translateX(4px);
        }
      }
    }

    &:last-child {
      @include desde($bp-sm) {
        grid-column: 1 / -1;
      }
    }
  }

  &__todas {
    margin-top: 0.25rem;
    color: $primary !important;
    font-weight: 600;
  }
}
</style>
