/** Notificaciones flotantes. Renderizadas por `<ToastHost />` en App.vue. */
import { readonly, ref } from 'vue'

export type TonoToast = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number
  tono: TonoToast
  titulo: string
  mensaje?: string
  icono: string
  duracion: number
}

const ICONOS: Record<TonoToast, string> = {
  success: 'fa-solid fa-circle-check',
  error: 'fa-solid fa-circle-exclamation',
  info: 'fa-solid fa-circle-info',
  warning: 'fa-solid fa-triangle-exclamation',
}

const toasts = ref<Toast[]>([])
const temporizadores = new Map<number, ReturnType<typeof setTimeout>>()
let siguienteId = 1

export function cerrarToast(id: number) {
  const t = temporizadores.get(id)
  if (t) {
    clearTimeout(t)
    temporizadores.delete(id)
  }
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

export function mostrarToast(
  tono: TonoToast,
  titulo: string,
  mensaje?: string,
  duracion = 4500,
): number {
  const id = siguienteId++
  toasts.value = [...toasts.value, { id, tono, titulo, mensaje, icono: ICONOS[tono], duracion }]
  temporizadores.set(
    id,
    setTimeout(() => cerrarToast(id), duracion),
  )
  return id
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    cerrarToast,
    exito: (titulo: string, mensaje?: string) => mostrarToast('success', titulo, mensaje),
    error: (titulo: string, mensaje?: string) => mostrarToast('error', titulo, mensaje, 6000),
    info: (titulo: string, mensaje?: string) => mostrarToast('info', titulo, mensaje),
    alerta: (titulo: string, mensaje?: string) => mostrarToast('warning', titulo, mensaje),
  }
}
