<script setup lang="ts">
/** /contacto — formulario, datos de las 5 sedes y accesos directos. */
import { RouterLink } from 'vue-router'
import ContactoSection from '@/components/sections/ContactoSection.vue'
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { mapsUrl, migasLd, sedeLd } from '@/config/seo'
import { SEDES, SITE } from '@/config/site'

const migas = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Contacto', ruta: '/contacto' },
]

useSeo(() => ({
  titulo: 'Contacto Depil Ec | Agenda tu Valoración de Depilación Láser',
  descripcion: `Escríbenos al ${SITE.telefono} o déjanos tus datos. Atendemos en Quito, Guayaquil, Ceibos, Samborondón y Manta de lunes a sábado de 09H00 a 19H00.`,
  ruta: '/contacto',
  jsonLd: [
    migasLd(migas),
    ...SEDES.map((s) => sedeLd(s.id)).filter((x): x is Record<string, unknown> => x !== null),
  ],
}))
</script>

<template>
  <div class="pagina">
    <PageHero
      titulo="Hablemos"
      kicker="Contacto"
      descripcion="Una asesora te responde al instante por WhatsApp, o déjanos tus datos y te llamamos."
      imagen-fondo="depil/sedes/guayaquil"
      :migas="migas"
    />

    <ContactoSection />

    <section class="directorio">
      <div class="contenedor">
        <h2>Dónde estamos</h2>
        <ul class="directorio__grid">
          <li v-for="s in SEDES" :key="s.id">
            <h3><RouterLink :to="`/sedes/${s.id}`">{{ s.nombre }}</RouterLink></h3>
            <p>{{ s.direccion }}</p>
            <p class="directorio__ciudad">{{ s.ciudad }}, Ecuador</p>
            <a :href="mapsUrl(s)" target="_blank" rel="noopener noreferrer">
              <i class="fa-solid fa-map" aria-hidden="true" /> Cómo llegar
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.directorio {
  @include seccion(3rem, 4.5rem);
  background: var(--bg);

  h2 {
    margin-bottom: 1.75rem;
    font-size: clamp(1.35rem, 1.1rem + 1.2vw, 1.9rem);
    text-align: center;
  }

  &__grid {
    display: grid;
    gap: 1rem;
    list-style: none;

    @include desde($bp-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desde($bp-xl) {
      grid-template-columns: repeat(3, 1fr);
    }

    li {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding: 1.35rem;
      border-radius: var(--radio-lg);
      background: var(--surface);
      @include borde-dorado(0.14);
    }

    h3 {
      font-size: 1.0625rem;
    }

    p {
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      margin-top: auto;
      padding-top: 0.6rem;
      color: $primary;
      font-size: 0.8125rem;
      font-weight: 600;
    }
  }

  &__ciudad {
    color: rgba($primary, 0.75) !important;
    font-size: 0.78rem !important;
  }
}
</style>
