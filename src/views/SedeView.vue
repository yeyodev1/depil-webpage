<script setup lang="ts">
/** Landing local por sede: /sedes/:slug — la pieza central del SEO geográfico. */
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import CldImage from '@/components/ui/CldImage.vue'
import PageHero from '@/components/ui/PageHero.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useSeo } from '@/composables/useSeo'
import { faqLd, migasLd, sedeLd } from '@/config/seo'
import { SEDES, SITE, whatsappUrl } from '@/config/site'
import { ZONAS } from '@/config/zonas'
import { FAQ } from '@/config/faq'

/** Códigos ISO 3166-2:EC de las provincias donde hay sede. */
const REGION_ISO: Record<string, string> = {
  Quito: 'P', // Pichincha
  Guayaquil: 'G', // Guayas
  Samborondón: 'G',
  Manta: 'M', // Manabí
}

const route = useRoute()
const sede = computed(() => SEDES.find((s) => s.id === route.params.slug) ?? SEDES[0])
const otras = computed(() => SEDES.filter((s) => s.id !== sede.value.id))

const migas = computed(() => [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Sedes', ruta: '/sedes' },
  { nombre: sede.value.nombre, ruta: `/sedes/${sede.value.id}` },
])

const mapsUrl = computed(
  () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sede.value.mapsQuery)}`,
)

useSeo(() => ({
  titulo: `Depilación Láser en ${sede.value.ciudad} | ${sede.value.nombre}`,
  descripcion: `${sede.value.nombre}: depilación láser definitiva Tri-Laser & 4D en ${sede.value.ciudad}. ${sede.value.direccion}. Atención de lunes a sábado de 09H00 a 19H00. Agenda tu valoración.`,
  ruta: `/sedes/${sede.value.id}`,
  geo: {
    lat: sede.value.geo.lat,
    lng: sede.value.geo.lng,
    lugar: `${sede.value.nombre}, ${sede.value.ciudad}`,
    region: REGION_ISO[sede.value.ciudad] ?? 'P',
  },
  jsonLd: [
    sedeLd(sede.value.id) ?? {},
    migasLd(migas.value),
    faqLd(FAQ.slice(0, 4).map((f) => ({ pregunta: f.pregunta, respuesta: f.respuesta }))),
  ],
}))
</script>

<template>
  <div class="pagina">
    <PageHero
      :titulo="`Depilación láser en ${sede.ciudad}`"
      :kicker="sede.nombre"
      :descripcion="sede.direccion"
      :imagen-fondo="sede.imagen"
      :migas="migas"
    />

    <section class="sede-info">
      <div class="contenedor sede-info__grid">
        <div class="sede-info__imagen">
          <CldImage
            :public-id="sede.imagen"
            :alt="sede.nombre"
            :ancho="1000"
            aspecto="4:3"
            sizes="(max-width: 1023px) 92vw, 520px"
          />
        </div>

        <div class="sede-info__datos">
          <h2>Visítanos en {{ sede.ciudad }}</h2>

          <dl>
            <div>
              <dt><i class="fa-solid fa-location-dot" aria-hidden="true" /> Dirección</dt>
              <dd>{{ sede.direccion }}</dd>
            </div>
            <div>
              <dt><i class="fa-solid fa-phone" aria-hidden="true" /> Teléfono</dt>
              <dd><a :href="`tel:${SITE.telefonoRaw}`">{{ SITE.telefono }}</a></dd>
            </div>
            <div>
              <dt><i class="fa-solid fa-envelope" aria-hidden="true" /> Email</dt>
              <dd><a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a></dd>
            </div>
            <div>
              <dt><i class="fa-regular fa-clock" aria-hidden="true" /> Horario</dt>
              <dd>
                <span v-for="h in SITE.horarios" :key="h.dias">{{ h.dias }}: {{ h.horas }}</span>
              </dd>
            </div>
          </dl>

          <div class="sede-info__acciones">
            <BaseButton variante="dorado" icono="fa-solid fa-map" :href="mapsUrl">
              Cómo llegar
            </BaseButton>
            <BaseButton
              variante="whatsapp"
              icono="fa-brands fa-whatsapp"
              :href="whatsappUrl(`Hola 😁, quiero agendar una cita en ${sede.nombre}.`)"
            >
              Agendar cita
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="sede-zonas">
      <div class="contenedor">
        <SectionHeader
          kicker="Tratamientos disponibles"
          :titulo="`Todas las zonas en`"
          :resaltado="sede.ciudad"
          descripcion="Las 16 zonas se atienden en esta sede con el mismo equipo Tri-Laser & 4D y el mismo estándar de protocolo."
        />
        <ul class="sede-zonas__lista">
          <li v-for="z in ZONAS" :key="z.id">
            <RouterLink :to="`/depilacion-laser/${z.id}`">
              <i :class="z.icono" aria-hidden="true" /> {{ z.nombre }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="otras-sedes">
      <div class="contenedor">
        <h2>Otras sedes de Depil Ec</h2>
        <ul>
          <li v-for="s in otras" :key="s.id">
            <RouterLink :to="`/sedes/${s.id}`">
              <CldImage :public-id="s.imagen" :alt="s.nombre" :ancho="480" aspecto="16:9" sizes="30vw" />
              <span><strong>{{ s.nombre }}</strong><em>{{ s.ciudad }}</em></span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.sede-info {
  @include seccion(3.5rem, 5rem);
  background: var(--bg);

  &__grid {
    display: grid;
    gap: 2rem;

    @include desde($bp-lg) {
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }
  }

  &__imagen {
    border-radius: var(--radio-lg);
    overflow: hidden;
    @include borde-dorado(0.2);
  }

  &__datos {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    h2 {
      font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2rem);
    }

    dl {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    dt {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.2rem;
      color: $primary;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    dd {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      color: var(--text-muted);
      font-size: 0.9375rem;
    }
  }

  &__acciones {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
}

.sede-zonas {
  @include seccion(3.5rem, 5rem);
  background: var(--bg-alt);

  &__lista {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
    list-style: none;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.1rem;
      border-radius: 99px;
      border: 1px solid var(--border);
      background: var(--surface);
      font-size: 0.8125rem;
      transition: all var(--dur-media) ease;

      i {
        color: $primary;
        font-size: 0.75rem;
      }

      @include puede-hover {
        &:hover {
          border-color: $primary;
          color: $primary;
          transform: translateY(-2px);
        }
      }
    }
  }
}

.otras-sedes {
  @include seccion(3.5rem, 5rem);
  background: var(--bg);

  h2 {
    margin-bottom: 1.75rem;
    font-size: 1.35rem;
    text-align: center;
  }

  ul {
    display: grid;
    gap: 1rem;
    list-style: none;

    @include desde($bp-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desde($bp-lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  a {
    display: block;
    border-radius: var(--radio-lg);
    overflow: hidden;
    @include borde-dorado(0.14);
    transition: border-color var(--dur-media) ease, transform var(--dur-media) var(--ease-suave);

    span {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      padding: 0.85rem 1rem 1rem;
    }

    strong {
      font-size: 0.9375rem;
    }

    em {
      color: var(--text-muted);
      font-size: 0.8125rem;
      font-style: normal;
    }

    @include puede-hover {
      &:hover {
        transform: translateY(-4px);
        border-color: rgba($primary, 0.5);
      }
    }
  }
}
</style>
