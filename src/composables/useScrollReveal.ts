/**
 * Animaciones de scroll con GSAP + ScrollTrigger.
 *
 * Reglas del proyecto:
 *  - Toda animación se declara dentro de `gsap.matchMedia()` para separar mobile / desktop.
 *  - `prefers-reduced-motion` desactiva todo y deja el contenido visible.
 *  - Cada composable limpia sus ScrollTriggers en `onUnmounted`.
 */
import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * El registro va condicionado: durante el prerender estático esto corre en Node
 * y `ScrollTrigger.register()` llama a `window.matchMedia`, que no existe.
 *
 * Se comprueba `import.meta.env.SSR` y no `typeof window`: vite-ssg corre con
 * `mock: true`, que inyecta un `window` falso, así que la comprobación clásica
 * daría verdadero en el servidor.
 */
export const enNavegador = !import.meta.env.SSR

if (enNavegador) {
  gsap.registerPlugin(ScrollTrigger)
}

export const BREAKPOINT_DESKTOP = '(min-width: 768px)'
export const BREAKPOINT_MOBILE = '(max-width: 767px)'
export const SIN_MOVIMIENTO = '(prefers-reduced-motion: reduce)'

export interface OpcionesReveal {
  /** Selector de los hijos a animar en cascada. Si se omite, anima el contenedor. */
  hijos?: string
  /** Desplazamiento vertical inicial en px (desktop). */
  desplazamiento?: number
  /** Separación entre elementos de la cascada, en segundos. */
  cascada?: number
  /** Duración de cada animación, en segundos. */
  duracion?: number
  /** Punto de disparo del ScrollTrigger. */
  inicio?: string
  /** Escala inicial. `1` desactiva el zoom. */
  escala?: number
}

const DEFECTOS: Required<OpcionesReveal> = {
  hijos: '',
  desplazamiento: 48,
  cascada: 0.1,
  duracion: 0.9,
  inicio: 'top 82%',
  escala: 1,
}

/**
 * Revela un contenedor (o sus hijos en cascada) al entrar en viewport.
 * Devuelve el contexto GSAP por si se necesita revertir manualmente.
 */
export function useScrollReveal(objetivo: Ref<HTMLElement | null>, opciones: OpcionesReveal = {}) {
  const o = { ...DEFECTOS, ...opciones }
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const el = objetivo.value
    if (!el) return

    ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: BREAKPOINT_DESKTOP,
          mobile: BREAKPOINT_MOBILE,
          reducido: SIN_MOVIMIENTO,
        },
        (contexto) => {
          const { desktop, reducido } = contexto.conditions as Record<string, boolean>

          const nodos: Element[] = o.hijos ? gsap.utils.toArray(o.hijos, el) : [el]
          if (!nodos.length) return

          if (reducido) {
            gsap.set(nodos, { clearProps: 'all', autoAlpha: 1 })
            return
          }

          // En mobile el recorrido es más corto: menos desplazamiento, cascada más rápida.
          const y = desktop ? o.desplazamiento : Math.round(o.desplazamiento * 0.55)
          const cascada = desktop ? o.cascada : o.cascada * 0.7

          gsap.from(nodos, {
            autoAlpha: 0,
            y,
            scale: o.escala,
            duration: desktop ? o.duracion : o.duracion * 0.8,
            ease: 'power3.out',
            stagger: cascada,
            scrollTrigger: {
              trigger: el,
              start: o.inicio,
              once: true,
            },
          })
        },
      )
    }, el)
  })

  onUnmounted(() => {
    ctx?.revert()
    ctx = null
  })

  return { refrescar: () => ScrollTrigger.refresh() }
}

/** Parallax suave sobre un elemento (desactivado en mobile y con reduced-motion). */
export function useParallax(objetivo: Ref<HTMLElement | null>, intensidad = 80) {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const el = objetivo.value
    if (!el) return

    ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add(`${BREAKPOINT_DESKTOP} and (prefers-reduced-motion: no-preference)`, () => {
        gsap.to(el, {
          yPercent: -intensidad / 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, el)
  })

  onUnmounted(() => {
    ctx?.revert()
    ctx = null
  })
}

export { gsap, ScrollTrigger }
