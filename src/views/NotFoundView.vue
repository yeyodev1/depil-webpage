<script setup lang="ts">
/**
 * 404 útil: en vez de un callejón sin salida, ofrece un buscador local sobre
 * zonas y sedes (todo el catálogo está en el bundle, no hace falta backend) y
 * los accesos directos más pedidos.
 *
 * Va marcada `noindex` para no gastar presupuesto de rastreo.
 */
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import CldImage from '@/components/ui/CldImage.vue'
import { useSeo } from '@/composables/useSeo'
import { ZONAS } from '@/config/zonas'
import { SEDES, whatsappUrl } from '@/config/site'

useSeo(() => ({
  titulo: 'Página no encontrada | Depil Ec',
  descripcion: 'La página que buscas no existe o cambió de dirección.',
  ruta: '/404',
  indexable: false,
}))

const consulta = ref('')

/** Normaliza para que "axila" encuentre "Axilas" y "bikini" ignore acentos. */
const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

interface Resultado {
  tipo: 'Zona' | 'Sede'
  nombre: string
  detalle: string
  ruta: string
  imagen: string
  icono: string
}

const catalogo = computed<Resultado[]>(() => [
  ...ZONAS.map((z) => ({
    tipo: 'Zona' as const,
    nombre: z.nombre,
    detalle: z.descripcion,
    ruta: `/depilacion-laser/${z.id}`,
    imagen: z.imagen,
    icono: z.icono,
  })),
  ...SEDES.map((s) => ({
    tipo: 'Sede' as const,
    nombre: s.nombre,
    detalle: `${s.ciudad} · ${s.direccion}`,
    ruta: `/sedes/${s.id}`,
    imagen: s.imagen,
    icono: 'fa-solid fa-location-dot',
  })),
])

const resultados = computed(() => {
  const q = normalizar(consulta.value.trim())
  if (q.length < 2) return []
  return catalogo.value
    .filter((r) => normalizar(`${r.nombre} ${r.detalle}`).includes(q))
    .slice(0, 8)
})

const buscando = computed(() => consulta.value.trim().length >= 2)

const ATAJOS = [
  { icono: 'fa-solid fa-grip', titulo: 'Todas las zonas', texto: '16 tratamientos', ruta: '/depilacion-laser' },
  { icono: 'fa-solid fa-location-dot', titulo: 'Nuestras sedes', texto: '5 ciudades', ruta: '/sedes' },
  { icono: 'fa-solid fa-tags', titulo: 'Promociones', texto: 'Ofertas vigentes', ruta: '/promociones' },
  { icono: 'fa-regular fa-circle-question', titulo: 'Preguntas frecuentes', texto: 'Resuelve tus dudas', ruta: '/preguntas-frecuentes' },
]
</script>

<template>
  <div class="pagina">
    <section class="e404">
      <div class="e404__aura" aria-hidden="true" />

      <div class="contenedor e404__inner">
        <p class="e404__codigo" aria-hidden="true">404</p>

        <h1 class="e404__titulo">Esta página se depiló para siempre</h1>
        <p class="e404__texto">
          El enlace que seguiste no existe o cambió de dirección. Busca lo que necesitas o usa los
          accesos directos.
        </p>

        <!-- Buscador local: filtra las 16 zonas y las 5 sedes ya cargadas. -->
        <div class="buscador" role="search">
          <i class="fa-solid fa-magnifying-glass buscador__icono" aria-hidden="true" />
          <input
            v-model="consulta"
            type="search"
            placeholder="Busca una zona o una sede: axilas, bikini, Quito…"
            aria-label="Buscar zonas y sedes"
          />
          <button
            v-if="consulta"
            class="buscador__limpiar"
            type="button"
            aria-label="Limpiar búsqueda"
            @click="consulta = ''"
          >
            <i class="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <Transition name="subir" mode="out-in">
          <ul v-if="resultados.length" key="hay" class="resultados">
            <li v-for="r in resultados" :key="r.ruta">
              <RouterLink :to="r.ruta">
                <span class="resultados__img">
                  <CldImage :public-id="r.imagen" :alt="r.nombre" :ancho="120" aspecto="1:1" sizes="56px" />
                </span>
                <span class="resultados__texto">
                  <strong>{{ r.nombre }}</strong>
                  <em>{{ r.detalle }}</em>
                </span>
                <span class="resultados__tipo">{{ r.tipo }}</span>
                <i class="fa-solid fa-arrow-right-long" aria-hidden="true" />
              </RouterLink>
            </li>
          </ul>

          <p v-else-if="buscando" key="vacio" class="sin-resultados">
            <i class="fa-regular fa-face-frown" aria-hidden="true" />
            Nada coincide con “{{ consulta }}”. Escríbenos y te ayudamos.
          </p>
        </Transition>

        <ul class="atajos">
          <li v-for="a in ATAJOS" :key="a.ruta">
            <RouterLink :to="a.ruta">
              <i :class="a.icono" aria-hidden="true" />
              <strong>{{ a.titulo }}</strong>
              <em>{{ a.texto }}</em>
            </RouterLink>
          </li>
        </ul>

        <div class="e404__acciones">
          <BaseButton variante="dorado" to="/" icono="fa-solid fa-house">Volver al inicio</BaseButton>
          <BaseButton
            variante="whatsapp"
            icono="fa-brands fa-whatsapp"
            :href="whatsappUrl('Hola 😁, no encontré lo que buscaba en la web.')"
          >
            Escríbenos
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.e404 {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding-block: calc(var(--alto-header) + 3rem) 4rem;
  background: var(--bg);
  overflow: hidden;
  isolation: isolate;

  &__aura {
    position: absolute;
    inset: -30% 0 auto;
    height: 70%;
    z-index: -1;
    background: radial-gradient(50% 60% at 50% 40%, rgba($primary, 0.16), transparent 70%);
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }

  &__codigo {
    font-size: clamp(5rem, 3rem + 16vw, 12rem);
    font-weight: 800;
    line-height: 0.85;
    letter-spacing: -0.04em;
    @include texto-dorado;
  }

  &__titulo {
    margin: 0;
    font-size: clamp(1.4rem, 1.1rem + 1.8vw, 2.25rem);
  }

  &__texto {
    max-width: 52ch;
    margin: 0;
    color: var(--text-muted);
  }

  &__acciones {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }
}

.buscador {
  position: relative;
  width: min(100%, 34rem);
  margin-top: 1rem;

  input {
    width: 100%;
    padding: 0.9rem 2.75rem;
    border-radius: 99px;
    border: 1px solid var(--border);
    background: var(--surface);
    font-size: 0.9375rem;

    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba($primary, 0.16);
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  &__icono {
    position: absolute;
    left: 1.1rem;
    top: 50%;
    transform: translateY(-50%);
    color: $primary;
    font-size: 0.85rem;
  }

  &__limpiar {
    position: absolute;
    right: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
  }
}

.resultados {
  width: min(100%, 34rem);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  list-style: none;
  text-align: left;

  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.55rem 0.85rem 0.55rem 0.55rem;
    border-radius: var(--radio-md);
    border: 1px solid var(--border);
    background: var(--surface);
    transition:
      border-color var(--dur-rapida) ease,
      transform var(--dur-rapida) var(--ease-suave);

    @include puede-hover {
      &:hover {
        border-color: rgba($primary, 0.55);
        transform: translateX(3px);
      }
    }

    > i {
      color: $primary;
      font-size: 0.8rem;
    }
  }

  &__img {
    flex-shrink: 0;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.6rem;
    overflow: hidden;
  }

  &__texto {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;

    strong {
      font-size: 0.875rem;
    }

    em {
      color: var(--text-muted);
      font-size: 0.75rem;
      font-style: normal;
      @include lineas(1);
    }
  }

  &__tipo {
    flex-shrink: 0;
    padding: 0.15rem 0.5rem;
    border-radius: 99px;
    background: var(--accent-soft);
    color: $primary;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}

.sin-resultados {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--text-muted);
  font-size: 0.875rem;

  i {
    color: $primary;
  }
}

.atajos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  width: min(100%, 46rem);
  margin-top: 1.5rem;
  list-style: none;

  @include desde($bp-md) {
    grid-template-columns: repeat(4, 1fr);
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    height: 100%;
    padding: 1.1rem 0.85rem;
    border-radius: var(--radio-lg);
    border: 1px solid var(--border);
    background: var(--surface);
    transition:
      border-color var(--dur-media) ease,
      transform var(--dur-media) var(--ease-suave);

    @include puede-hover {
      &:hover {
        border-color: rgba($primary, 0.55);
        transform: translateY(-4px);
      }
    }

    i {
      margin-bottom: 0.3rem;
      color: $primary;
      font-size: 1.15rem;
    }

    strong {
      font-size: 0.8125rem;
    }

    em {
      color: var(--text-muted);
      font-size: 0.72rem;
      font-style: normal;
    }
  }
}
</style>
