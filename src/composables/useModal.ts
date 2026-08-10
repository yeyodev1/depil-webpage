/**
 * Estado global de modales y confirmaciones.
 *
 * Regla del proyecto: nada de `alert()` / `confirm()` ni `v-if` sueltos por sección.
 * Todo pasa por `abrirModal()` / `confirmar()`, renderizado por `<ModalHost />` en App.vue.
 */
import { computed, readonly, ref, shallowRef, type Component } from 'vue'
import { bloquearScroll, liberarScroll } from './useBloqueoScroll'

export type VarianteModal = 'default' | 'confirm' | 'galeria' | 'formulario'

export interface OpcionesModal {
  titulo?: string
  descripcion?: string
  variante?: VarianteModal
  /** Componente a renderizar dentro del modal. */
  componente?: Component
  /** Props para `componente`. */
  props?: Record<string, unknown>
  /** Oculta la X de cierre y el cierre por overlay/Escape. */
  persistente?: boolean
  /** Ancho máximo del panel. */
  ancho?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface OpcionesConfirmacion {
  titulo: string
  mensaje: string
  textoConfirmar?: string
  textoCancelar?: string
  icono?: string
  tono?: 'primary' | 'danger'
}

interface EstadoConfirmacion extends OpcionesConfirmacion {
  resolver: (valor: boolean) => void
}

const modalAbierto = ref(false)
const opcionesActuales = ref<OpcionesModal>({})
const componenteActual = shallowRef<Component | null>(null)
const confirmacion = ref<EstadoConfirmacion | null>(null)

export function abrirModal(opciones: OpcionesModal = {}) {
  opcionesActuales.value = { variante: 'default', ancho: 'md', ...opciones }
  componenteActual.value = opciones.componente ?? null
  modalAbierto.value = true
  bloquearScroll()
}

export function cerrarModal() {
  if (!modalAbierto.value) return
  modalAbierto.value = false
  componenteActual.value = null
  opcionesActuales.value = {}
  liberarScroll()
}

/** Confirmación con promesa: `if (await confirmar({...})) { ... }` */
export function confirmar(opciones: OpcionesConfirmacion): Promise<boolean> {
  bloquearScroll()
  return new Promise<boolean>((resolve) => {
    confirmacion.value = {
      textoConfirmar: 'Confirmar',
      textoCancelar: 'Cancelar',
      tono: 'primary',
      icono: 'fa-solid fa-circle-question',
      ...opciones,
      resolver: resolve,
    }
  })
}

export function responderConfirmacion(valor: boolean) {
  if (!confirmacion.value) return
  confirmacion.value.resolver(valor)
  confirmacion.value = null
  liberarScroll()
}

export function useModal() {
  return {
    modalAbierto: readonly(modalAbierto),
    opcionesModal: readonly(opcionesActuales),
    componenteModal: componenteActual,
    confirmacion: readonly(confirmacion),
    hayConfirmacion: computed(() => confirmacion.value !== null),
    abrirModal,
    cerrarModal,
    confirmar,
    responderConfirmacion,
  }
}
