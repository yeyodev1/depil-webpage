/** Reviews reales publicadas en depil.com.ec */

export interface Testimonio {
  id: string
  nombre: string
  texto: string
  avatar: string
  estrellas: number
}

export const TESTIMONIOS: Testimonio[] = [
  {
    id: 'esteban',
    nombre: 'Esteban Valverde',
    texto:
      'Me realicé un tratamiento de bigote y barba, y estuvo muy buena la atención. La señorita muy amable, sobre todo porque le tenía miedo al láser, pero me fue bien. Regresaré nuevamente.',
    avatar: 'depil/testimonios/esteban',
    estrellas: 5,
  },
  {
    id: 'paula',
    nombre: 'Paula Dávila',
    texto:
      'Excelente atención, buen precio y tecnología de calidad. Llevo 6 sesiones en las axilas y ya no tengo vellos.',
    avatar: 'depil/testimonios/paula',
    estrellas: 5,
  },
  {
    id: 'daniela',
    nombre: 'Daniela Checa',
    texto:
      'Excelente lugar, busqué varias opciones y Depil fue la mejor opción. Aparte se ven los cambios del crecimiento del vello desde la primera sesión. ¡Estoy feliz!',
    avatar: 'depil/testimonios/daniela',
    estrellas: 5,
  },
  {
    id: 'maria-belen',
    nombre: 'María Belén Chávez Guerrero',
    texto:
      'Realmente encantada con mis resultados. En cada sesión los vellos se van, ¡son excelentes profesionales!',
    avatar: 'depil/testimonios/maria-belen',
    estrellas: 5,
  },
  {
    id: 'mishell',
    nombre: 'Mishell Peñafiel',
    texto:
      'Muy buena atención, el lugar es muy lindo y todo está limpio siempre. La atención de la chica es muy amable y siempre está pendiente de que estén bien los pacientes.',
    avatar: 'depil/testimonios/mishell',
    estrellas: 5,
  },
  {
    id: 'bethania-sousa',
    nombre: 'Bethania Sousa',
    texto: 'Gran atención y fantásticos resultados.',
    avatar: 'depil/testimonios/bethania-sousa',
    estrellas: 5,
  },
  {
    id: 'andres',
    nombre: 'Andrés Espín',
    texto:
      'Llevé a mi pareja por información como regalo de cumpleaños y las especialistas me ofrecieron café y a mi novia té. Rescato mucho que en todo momento estaban tratando de hacernos sentir en confort.',
    avatar: 'depil/testimonios/andres',
    estrellas: 5,
  },
  {
    id: 'diego-pucuji',
    nombre: 'Diego Pucuji',
    texto:
      'Excelente lugar, llevé a mi esposa a su primera cita y las especialistas súper profesionales. 10/10.',
    avatar: 'depil/testimonios/diego-pucuji',
    estrellas: 5,
  },
  {
    id: 'liby-sevilla',
    nombre: 'Liby Sevilla',
    texto:
      'Me encantó el trabajo porque vi los resultados desde la primera sesión. Me siento muy bien porque tratan demasiado bien y son excelentes profesionales. ¡Recomendado!',
    avatar: 'depil/testimonios/liby-sevilla',
    estrellas: 5,
  },
  {
    id: 'ma-fernanda',
    nombre: 'Ma. Fernanda',
    texto:
      'Gracias por su buen servicio, atenderme muy bien y hacerme sentir tan cómoda. ¡Son los mejores en todo Quito! Lo recomendaría al 100%, sin duda alguna el mejor centro de depilación.',
    avatar: 'depil/testimonios/ma-fernanda',
    estrellas: 5,
  },
]

export interface Promocion {
  id: string
  imagen: string
  alt: string
}

export const PROMOCIONES: Promocion[] = Array.from({ length: 6 }, (_, i) => ({
  id: `promo-${i + 1}`,
  imagen: `depil/promos/promo-${i + 1}`,
  alt: `Promoción Depil Ec ${i + 1}`,
}))
