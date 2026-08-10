/**
 * Bloqueo de scroll compartido por el menú fullscreen, los modales y las
 * confirmaciones.
 *
 * Dos motivos para centralizarlo:
 *
 * 1. **Compensar la barra de desplazamiento.** Poner `overflow: hidden` en el
 *    body hace desaparecer la barra; sin reponer ese ancho como `padding-right`
 *    todo el contenido centrado se desplaza (5 px por lado con una barra de
 *    10 px) y se ve un salto al abrir el menú.
 * 2. **Contador de referencias.** Si se abre un modal desde el menú, el primero
 *    en cerrarse no debe devolver el scroll mientras el otro siga abierto.
 *
 * También publica `--ancho-scrollbar` en `<html>` para que los overlays fijos
 * puedan alinear su contenido con el de la página que hay debajo.
 */
let contador = 0

const hayDom = () => typeof document !== 'undefined'

export function bloquearScroll() {
  if (!hayDom()) return
  contador += 1
  if (contador > 1) return

  const ancho = window.innerWidth - document.documentElement.clientWidth
  document.documentElement.style.setProperty('--ancho-scrollbar', `${ancho}px`)
  document.body.style.overflow = 'hidden'
  if (ancho > 0) document.body.style.paddingRight = `${ancho}px`
}

export function liberarScroll() {
  if (!hayDom()) return
  contador = Math.max(0, contador - 1)
  if (contador > 0) return

  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.documentElement.style.removeProperty('--ancho-scrollbar')
}

/** Reinicio total. Para `onUnmounted`, donde el contador puede quedar colgado. */
export function liberarTodo() {
  contador = 1
  liberarScroll()
}
