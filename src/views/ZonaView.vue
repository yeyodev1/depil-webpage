<script setup lang="ts">
/** Landing por zona: /depilacion-laser/:slug — 16 páginas indexables. */
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import CldImage from '@/components/ui/CldImage.vue'
import PageHero from '@/components/ui/PageHero.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useSeo } from '@/composables/useSeo'
import { migasLd, zonaLd } from '@/config/seo'
import { SEDES, whatsappUrl } from '@/config/site'
import { ZONAS } from '@/config/zonas'

const route = useRoute()
const zona = computed(() => ZONAS.find((z) => z.id === route.params.slug) ?? ZONAS[0]!)
const relacionadas = computed(() =>
  ZONAS.filter((z) => z.grupo === zona.value.grupo && z.id !== zona.value.id).slice(0, 4),
)

const migas = computed(() => [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Zonas', ruta: '/depilacion-laser' },
  { nombre: zona.value.nombre, ruta: `/depilacion-laser/${zona.value.id}` },
])

useSeo(() => ({
  titulo: `Depilación Láser ${zona.value.nombre} en Ecuador | Depil Ec`,
  // ≤160 caracteres, keyword y ciudades al inicio; la descripción larga de la
  // zona vive en el cuerpo de la página, no en la meta.
  descripcion: `Depilación láser definitiva de ${zona.value.nombre.toLowerCase()} con Tri-Laser & 4D en Quito, Guayaquil, Samborondón, Ceibos y Manta. Agenda tu valoración gratuita.`,
  ruta: `/depilacion-laser/${zona.value.id}`,
  imagen: undefined,
  // Sin faqLd: el FAQPage vive solo en /preguntas-frecuentes.
  jsonLd: [zonaLd(zona.value), migasLd(migas.value)],
}))

const PASOS = [
  { icono: 'fa-solid fa-comments', titulo: 'Valoración gratuita', texto: 'Analizamos tu tipo de piel y grosor del vello para definir el protocolo.' },
  { icono: 'fa-solid fa-razor', titulo: 'Preparación', texto: 'Rasura la zona 24 horas antes y evita la exposición solar directa.' },
  { icono: 'fa-solid fa-bolt', titulo: 'Sesión Tri-Laser', texto: 'Tres longitudes de onda en un disparo, con enfriamiento continuo.' },
  { icono: 'fa-solid fa-spa', titulo: 'Cuidado posterior', texto: 'Protector solar, hidratación y nada de sauna por 48 horas.' },
]
</script>

<template>
  <div class="pagina">
    <PageHero
      :titulo="`Depilación Láser ${zona.nombre}`"
      kicker="Zona de tratamiento"
      :descripcion="zona.descripcion"
      :imagen-fondo="zona.imagen"
      :migas="migas"
    />

    <section class="zona-detalle">
      <div class="contenedor zona-detalle__grid">
        <div class="zona-detalle__imagen">
          <CldImage
            :public-id="zona.imagen"
            :alt="`Depilación láser ${zona.nombre}`"
            :ancho="900"
            aspecto="1:1"
            sizes="(max-width: 1023px) 92vw, 460px"
          />
        </div>

        <div class="zona-detalle__texto">
          <h2>¿Qué incluye el tratamiento de {{ zona.nombre.toLowerCase() }}?</h2>
          <p>{{ zona.descripcion }}</p>
          <p>
            Trabajamos con equipos <strong>Tri-Laser &amp; 4D</strong> aprobados por la FDA, que
            combinan tres y cuatro longitudes de onda en un solo disparo para atacar el folículo a
            distintas profundidades. Por eso el tratamiento es efectivo en pieles claras, oscuras y
            bronceadas, y prácticamente indoloro gracias al sistema de enfriamiento.
          </p>
          <p>
            Para una reducción definitiva recomendamos entre <strong>6 y 8 sesiones</strong>, aunque
            la disminución del vello se nota desde la primera.
          </p>

          <div class="zona-detalle__acciones">
            <BaseButton
              variante="whatsapp"
              icono="fa-brands fa-whatsapp"
              :href="whatsappUrl(`Hola 😁, quiero cotizar depilación láser de ${zona.nombre}.`)"
            >
              Cotizar {{ zona.nombre }}
            </BaseButton>
            <BaseButton variante="contorno" to="/#contacto">
              Agendar valoración
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="pasos">
      <div class="contenedor">
        <SectionHeader kicker="Cómo funciona" titulo="Tu tratamiento," resaltado="paso a paso" />
        <ol class="pasos__lista">
          <li v-for="(p, i) in PASOS" :key="p.titulo">
            <span class="pasos__num">{{ i + 1 }}</span>
            <i :class="p.icono" aria-hidden="true" />
            <h3>{{ p.titulo }}</h3>
            <p>{{ p.texto }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section v-if="relacionadas.length" class="relacionadas">
      <div class="contenedor">
        <SectionHeader kicker="También te puede interesar" titulo="Otras zonas" :resaltado="zona.grupo" />
        <ul class="relacionadas__grid">
          <li v-for="r in relacionadas" :key="r.id">
            <RouterLink :to="`/depilacion-laser/${r.id}`">
              <CldImage :public-id="r.imagen" :alt="r.nombre" :ancho="480" aspecto="1:1" sizes="45vw" />
              <span>{{ r.nombre }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="sedes-mini">
      <div class="contenedor">
        <h2>Disponible en nuestras {{ SEDES.length }} sedes</h2>
        <ul>
          <li v-for="s in SEDES" :key="s.id">
            <RouterLink :to="`/sedes/${s.id}`">
              <i class="fa-solid fa-location-dot" aria-hidden="true" /> {{ s.nombre }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.zona-detalle {
  @include seccion(3.5rem, 5rem);
  background: var(--bg);

  &__grid {
    display: grid;
    gap: 2rem;

    @include desde($bp-lg) {
      grid-template-columns: 0.85fr 1.15fr;
      gap: 3rem;
      align-items: center;
    }
  }

  &__imagen {
    border-radius: var(--radio-lg);
    overflow: hidden;
    aspect-ratio: 1;
    @include borde-dorado(0.2);
  }

  &__texto {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2rem);
    }

    p {
      color: var(--text-muted);
    }

    strong {
      color: $primary;
      font-weight: 600;
    }
  }

  &__acciones {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
}

.pasos {
  @include seccion(3.5rem, 5rem);
  background: var(--bg-alt);

  &__lista {
    display: grid;
    gap: 1rem;
    list-style: none;
    counter-reset: paso;

    @include desde($bp-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desde($bp-lg) {
      grid-template-columns: repeat(4, 1fr);
    }

    li {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
      padding: 1.5rem 1.25rem 1.35rem;
      border-radius: var(--radio-lg);
      background: var(--surface);
      @include borde-dorado(0.14);
    }

    h3 {
      font-size: 1rem;
    }

    p {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    i {
      color: $primary;
      font-size: 1.25rem;
    }
  }

  &__num {
    position: absolute;
    top: 0.9rem;
    right: 1.1rem;
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 1;
    color: rgba($primary, 0.16);
  }
}

.relacionadas {
  @include seccion(3.5rem, 5rem);
  background: var(--bg);

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
    list-style: none;

    @include desde($bp-lg) {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }

    a {
      position: relative;
      display: block;
      aspect-ratio: 1;
      border-radius: var(--radio-lg);
      overflow: hidden;
      @include borde-dorado(0.14);

      span {
        position: absolute;
        inset: auto 0 0;
        padding: 2.5rem 1rem 1rem;
        background: linear-gradient(180deg, transparent, rgba($ink, 0.92));
        font-weight: 600;
        font-size: 0.9rem;
      }

      @include puede-hover {
        &:hover {
          border-color: rgba($primary, 0.5);
        }
      }
    }
  }
}

.sedes-mini {
  @include seccion(2.5rem, 3.5rem);
  background: var(--bg-alt);
  text-align: center;

  h2 {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
    list-style: none;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.5rem 1rem;
    border-radius: 99px;
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.8125rem;
    transition: all var(--dur-media) ease;

    i {
      color: $primary;
      font-size: 0.7rem;
    }

    @include puede-hover {
      &:hover {
        border-color: $primary;
        color: $primary;
      }
    }
  }
}
</style>
