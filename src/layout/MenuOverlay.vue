<script setup lang="ts">
/**
 * Menú fullscreen estilo Awwwards.
 *
 * Secuencia de apertura (GSAP, timeline pausado creado una sola vez):
 *   1. tres paneles barren la pantalla de abajo a arriba, escalonados
 *   2. los enlaces suben desde debajo de su máscara (`overflow: hidden`)
 *   3. columnas laterales y pie aparecen al final
 * Cerrar reproduce la misma timeline en reversa, más rápido.
 *
 * Con `prefers-reduced-motion` se sustituye por un fundido simple.
 */
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MenuLateral from './MenuLateral.vue'
import MenuPreview from './MenuPreview.vue'
import { bloquearScroll, liberarScroll, liberarTodo } from '@/composables/useBloqueoScroll'
import { enNavegador, gsap } from '@/composables/useScrollReveal'
import { NAV_LINKS, REDES, SITE, type EnlaceNav } from '@/config/site'

const props = defineProps<{ abierto: boolean }>()
const emit = defineEmits<{ cerrar: [] }>()

const router = useRouter()
const raiz = ref<HTMLElement | null>(null)
const previewId = ref<string | null>(null)

/** Imagen que se muestra al pasar por cada enlace principal. */
const IMAGEN_POR_ENLACE: Record<string, string> = {
  inicio: SITE.portada,
  nosotros: 'depil/features/experiencia-premium',
  zonas: 'depil/zonas/axilas-completas',
  sedes: 'depil/sedes/quito',
  promociones: 'depil/promos/promo-1',
  testimonios: 'depil/testimonios/paula',
  faq: 'depil/features/protocolos',
  contacto: 'depil/sedes/guayaquil',
}

let tl: gsap.core.Timeline | null = null
let ctx: gsap.Context | null = null
let reducido = false

function construirTimeline() {
  if (!raiz.value) return
  ctx?.revert()

  ctx = gsap.context(() => {
    reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducido) {
      tl = gsap
        .timeline({ paused: true })
        .to('[data-menu-fondo]', { autoAlpha: 1, duration: 0.2 })
        .to('[data-menu-contenido]', { autoAlpha: 1, duration: 0.2 }, 0)
      return
    }

    tl = gsap
      .timeline({ paused: true, defaults: { ease: 'power4.inOut' } })
      .set('[data-menu-contenido]', { autoAlpha: 1 })
      .to('[data-menu-panel]', { scaleY: 1, duration: 0.72, stagger: 0.075 })
      .fromTo(
        '[data-menu-linea]',
        { yPercent: 118, rotate: 3 },
        { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.055, ease: 'power4.out' },
        '-=0.34',
      )
      .fromTo(
        '[data-menu-lateral]',
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.55',
      )
      .fromTo(
        '[data-menu-pie]',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.4',
      )
  }, raiz.value)
}

function alTeclear(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('cerrar')
}

async function abrir() {
  bloquearScroll()
  document.addEventListener('keydown', alTeclear)
  await nextTick()
  if (!tl) construirTimeline()
  tl?.timeScale(1).play()
}

function cerrar() {
  liberarScroll()
  document.removeEventListener('keydown', alTeclear)
  previewId.value = null
  tl?.timeScale(1.85).reverse()
}

async function navegar(link: EnlaceNav) {
  emit('cerrar')
  const [ruta, hash] = link.ruta.split('#')
  // Espera a que el overlay salga para que la transición de página no se solape.
  await new Promise((r) => setTimeout(r, 320))
  if (hash) {
    if (router.currentRoute.value.path === (ruta || '/')) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    await router.push({ path: ruta || '/', hash: `#${hash}` })
    return
  }
  await router.push(link.ruta)
}

watch(
  () => props.abierto,
  (v) => {
    if (!enNavegador) return
    v ? abrir() : cerrar()
  },
)

onMounted(() => {
  if (enNavegador) construirTimeline()
})

onUnmounted(() => {
  document.removeEventListener('keydown', alTeclear)
  if (enNavegador) liberarTodo()
  ctx?.revert()
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="raiz"
      class="menu"
      :class="{ 'menu--abierto': abierto }"
      :aria-hidden="!abierto"
      :inert="!abierto || undefined"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
    >
      <!-- Tres capas escalonadas: el barrido que da el carácter Awwwards -->
      <div class="menu__paneles" data-menu-fondo aria-hidden="true">
        <span data-menu-panel />
        <span data-menu-panel />
        <span data-menu-panel />
      </div>

      <MenuPreview :public-id="previewId" :activo="abierto" />

      <div class="menu__contenido" data-menu-contenido>
        <div class="menu__grid contenedor">
          <nav class="principal" aria-label="Navegación del menú">
            <ul>
              <li v-for="(link, i) in NAV_LINKS" :key="link.id">
                <span class="principal__mascara">
                  <a
                    :href="link.ruta"
                    data-menu-linea
                    @click.prevent="navegar(link)"
                    @mouseenter="previewId = IMAGEN_POR_ENLACE[link.id] ?? null"
                    @focus="previewId = IMAGEN_POR_ENLACE[link.id] ?? null"
                    @mouseleave="previewId = null"
                  >
                    <em class="principal__num">0{{ i + 1 }}</em>
                    <span class="principal__texto">{{ link.label }}</span>
                    <i class="fa-solid fa-arrow-right-long principal__flecha" aria-hidden="true" />
                  </a>
                </span>
              </li>
            </ul>
          </nav>

          <MenuLateral @cerrar="emit('cerrar')" @previsualizar="previewId = $event" />
        </div>

        <footer class="menu__pie contenedor" data-menu-pie>
          <p>{{ SITE.claim }} · Tri-Laser &amp; 4D certificado por la FDA</p>
          <ul>
            <li v-for="r in REDES" :key="r.id">
              <a :href="r.url" target="_blank" rel="noopener noreferrer" :aria-label="r.nombre">
                <i :class="r.icono" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.menu {
  position: fixed;
  inset: 0;
  z-index: 950;
  // `visibility` en vez de `display`: permite animar y mantiene el foco fuera
  // del árbol cuando está cerrado (junto con `inert`).
  visibility: hidden;
  pointer-events: none;

  &--abierto {
    visibility: visible;
    pointer-events: auto;
  }

  &__paneles {
    position: absolute;
    inset: 0;

    span {
      position: absolute;
      inset: 0;
      transform: scaleY(0);
      transform-origin: bottom;
      will-change: transform;
    }

    span:nth-child(1) {
      background: rgba($primary, 0.9);
    }
    span:nth-child(2) {
      background: rgba($primary-light, 0.55);
    }
    span:nth-child(3) {
      background: $ink;
    }
  }

  &__contenido {
    // El overlay tiene su propio contexto de scroll. `both-edges` reserva el
    // hueco de la barra a ambos lados para que el contenido siga centrado
    // cuando aparece. No hay que sumar aquí `--ancho-scrollbar`: ese hueco ya
    // lo compensa `bloquearScroll()` en el body, y contarlo dos veces
    // descuadraba el menú 20 px.
    scrollbar-gutter: stable both-edges;
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding-block: calc(var(--alto-header) + 1.5rem) 1.5rem;
    overflow-y: auto;
    visibility: hidden;
  }

  &__grid {
    display: grid;
    gap: 2.5rem;
    align-items: start;
    flex: 1;

    @include desde($bp-lg) {
      grid-template-columns: 1.15fr 0.85fr;
      gap: 4rem;
      align-content: center;
    }
  }

  &__pie {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: 1.5rem;
    margin-top: 1.5rem;
    border-top: 1px solid rgba($primary, 0.18);
    color: var(--text-muted);
    font-size: 0.78rem;
    text-align: center;

    @include desde($bp-md) {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }

    ul {
      display: flex;
      gap: 0.6rem;
      list-style: none;
    }

    a {
      display: grid;
      place-items: center;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid rgba($primary, 0.28);
      color: $primary;
      transition: background var(--dur-media) ease, transform var(--dur-media) var(--ease-suave);

      @include puede-hover {
        &:hover {
          background: rgba($primary, 0.16);
          transform: translateY(-3px);
        }
      }
    }
  }
}

.principal {
  ul {
    list-style: none;
  }

  &__mascara {
    display: block;
    overflow: hidden;
    padding-block: 0.12em;
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding-block: 0.05em;
    line-height: 1;
    will-change: transform;
  }

  &__num {
    flex-shrink: 0;
    width: 1.6rem;
    // Alineado con la parte alta de la mayúscula, no con la línea base.
    align-self: flex-start;
    margin-top: 0.35em;
    color: rgba($primary, 0.55);
    font-size: 0.7rem;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.14em;
  }

  &__texto {
    position: relative;
    font-size: clamp(2.1rem, 1rem + 7.4vw, 5.5rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    transition: color var(--dur-media) var(--ease-suave);
  }

  &__flecha {
    color: $primary;
    font-size: clamp(0.9rem, 0.6rem + 1vw, 1.5rem);
    opacity: 0;
    transform: translateX(-1.5rem);
    transition:
      opacity var(--dur-media) var(--ease-suave),
      transform var(--dur-media) var(--ease-suave);
  }

  @include puede-hover {
    // Los demás enlaces se apagan al señalar uno: foco por contraste.
    ul:hover a .principal__texto {
      color: rgba($text-muted, 0.45);
    }

    // Debe repetir `ul:hover` para ganar en especificidad a la regla de arriba;
    // con solo `a:hover .principal__texto` el enlace señalado también se apaga.
    ul:hover a:hover .principal__texto {
      color: $primary;
    }

    a:hover .principal__flecha {
      opacity: 1;
      transform: translateX(0);
    }
  }

  a:focus-visible .principal__texto {
    color: $primary;
  }
}

</style>
