<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { cldUrl } from '@/composables/useCloudinary'
import { NAV_LEGAL, NAV_LINKS, REDES, SEDES, SITE } from '@/config/site'
import { ZONAS } from '@/config/zonas'

const logo = cldUrl(SITE.logoBlanco, { ancho: 420, recorte: 'fit' })
const anio = new Date().getFullYear()

/** Enlazado interno hacia las zonas de mayor volumen de búsqueda. */
const ZONAS_DESTACADAS = ZONAS.filter((z) =>
  ['axilas-completas', 'bikini-full', 'pierna-completa', 'rostro', 'bigote'].includes(z.id),
)
</script>

<template>
  <footer class="pie">
    <div class="pie__grid contenedor">
      <div class="pie__marca">
        <img :src="logo" alt="Depil Ec" width="160" height="58" loading="lazy" />
        <p class="pie__lema">
          Depilación láser definitiva con tecnología {{ SITE.tecnologia }}, certificada y aprobada
          por la FDA.
        </p>
        <ul class="pie__redes">
          <li v-for="red in REDES" :key="red.id">
            <a :href="red.url" target="_blank" rel="noopener noreferrer" :aria-label="red.nombre">
              <i :class="red.icono" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>

      <nav class="pie__columna" aria-label="Enlaces del sitio">
        <h3 class="pie__titulo">Enlaces importantes</h3>
        <ul>
          <li v-for="link in NAV_LINKS" :key="link.id">
            <RouterLink :to="link.ruta">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <nav class="pie__columna" aria-label="Zonas de tratamiento">
        <h3 class="pie__titulo">Zonas más buscadas</h3>
        <ul>
          <li v-for="zona in ZONAS_DESTACADAS" :key="zona.id">
            <RouterLink :to="`/depilacion-laser/${zona.id}`">
              Depilación láser {{ zona.nombre }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/depilacion-laser"><strong>Ver las 16 zonas</strong></RouterLink>
          </li>
        </ul>
      </nav>

      <nav class="pie__columna" aria-label="Sedes">
        <h3 class="pie__titulo">Nuestras sedes</h3>
        <ul>
          <li v-for="sede in SEDES" :key="sede.id" class="pie__sede">
            <RouterLink :to="`/sedes/${sede.id}`">
              <strong>{{ sede.ciudad }}:</strong> {{ sede.direccion }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="pie__columna">
        <h3 class="pie__titulo">Contacto</h3>
        <ul>
          <li>
            <a :href="`tel:${SITE.telefonoRaw}`">
              <i class="fa-solid fa-phone" aria-hidden="true" /> {{ SITE.telefono }}
            </a>
          </li>
          <li>
            <a :href="`mailto:${SITE.email}`">
              <i class="fa-solid fa-envelope" aria-hidden="true" /> {{ SITE.email }}
            </a>
          </li>
        </ul>

        <h3 class="pie__titulo pie__titulo--espacio">Horario de atención</h3>
        <ul>
          <li v-for="h in SITE.horarios" :key="h.dias" class="pie__horario">
            <span>{{ h.dias }}</span>
            <span>{{ h.horas }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="pie__legal">
      <div class="contenedor pie__legal-inner">
        <p>
          Copyright © {{ anio }} {{ SITE.nombre }}. Todos los derechos reservados.
          <RouterLink v-for="l in NAV_LEGAL" :key="l.id" class="pie__legal-link" :to="l.ruta">
            {{ l.label }}
          </RouterLink>
        </p>
        <p class="pie__pago">
          <i class="fa-regular fa-credit-card" aria-hidden="true" />
          Aceptamos todas las tarjetas de crédito sin recargo adicional
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.pie {
  position: relative;
  background: linear-gradient(180deg, var(--bg) 0%, #050506 100%);
  border-top: 1px solid var(--border);

  &__grid {
    display: grid;
    gap: 2.5rem;
    padding-block: 3.5rem 2.5rem;

    @include desde($bp-md) {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem 2.5rem;
    }

    @include desde($bp-lg) {
      grid-template-columns: 1.4fr 0.8fr 1.2fr 1.2fr;
      padding-block: 5rem 3rem;
    }
  }

  &__marca img {
    width: auto;
    height: 3rem;
    object-fit: contain;
  }

  &__lema {
    margin: 1.1rem 0 1.5rem;
    max-width: 34ch;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  &__redes {
    display: flex;
    gap: 0.65rem;
    list-style: none;

    a {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--border);
      color: $primary;
      transition:
        background var(--dur-media) ease,
        transform var(--dur-media) var(--ease-suave),
        border-color var(--dur-media) ease;

      @include puede-hover {
        &:hover {
          background: rgba($primary, 0.16);
          border-color: $primary;
          transform: translateY(-3px);
        }
      }
    }
  }

  &__columna ul {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    list-style: none;
    color: var(--text-muted);
    font-size: 0.875rem;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: color var(--dur-rapida) ease;

      i {
        color: $primary;
        font-size: 0.8rem;
      }

      @include puede-hover {
        &:hover {
          color: $primary;
        }
      }
    }
  }

  &__titulo {
    margin-bottom: 1.1rem;
    color: var(--text);
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;

    &--espacio {
      margin-top: 1.75rem;
    }
  }

  &__sede strong {
    color: var(--text);
    font-weight: 600;
  }

  &__horario {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    max-width: 18rem;
  }

  &__legal {
    border-top: 1px solid var(--border);
    font-size: 0.8125rem;
    color: var(--text-muted);
  }

  &__legal-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    padding-block: 1.25rem;
    text-align: center;

    @include desde($bp-md) {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  &__legal-link {
    margin-left: 0.9rem;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color var(--dur-rapida) ease;

    @include puede-hover {
      &:hover {
        color: $primary;
      }
    }
  }

  &__pago {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: $primary;
    }
  }
}
</style>
