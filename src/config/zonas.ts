/** Zonas de tratamiento. Fuente: sección "Zonas" de depil.com.ec */

export type GrupoZona = 'Rostro' | 'Tronco' | 'Extremidades' | 'Íntima'

export interface Zona {
  id: string
  nombre: string
  descripcion: string
  imagen: string
  grupo: GrupoZona
  icono: string
}

export const ZONAS: Zona[] = [
  {
    id: 'axilas-completas',
    nombre: 'Axilas Completas',
    descripcion: 'Este tratamiento incluye dos axilas.',
    imagen: 'depil/zonas/axilas-completas',
    grupo: 'Tronco',
    icono: 'fa-solid fa-hand-sparkles',
  },
  {
    id: 'bikini-full',
    nombre: 'Bikini Full',
    descripcion: 'Este tratamiento incluye ingle, pubis, labios y línea interglútea.',
    imagen: 'depil/zonas/bikini-full',
    grupo: 'Íntima',
    icono: 'fa-solid fa-heart',
  },
  {
    id: 'bikini-brasilero',
    nombre: 'Bikini Brasilero',
    descripcion: 'Este tratamiento incluye ingle, pubis y labios.',
    imagen: 'depil/zonas/bikini-brasilero',
    grupo: 'Íntima',
    icono: 'fa-solid fa-heart',
  },
  {
    id: 'media-pierna',
    nombre: 'Media Pierna',
    descripcion:
      'Este tratamiento te incluye desde el muslo hasta la rodilla, o una segunda opción desde la rodilla hasta el tobillo.',
    imagen: 'depil/zonas/media-pierna',
    grupo: 'Extremidades',
    icono: 'fa-solid fa-shoe-prints',
  },
  {
    id: 'pierna-completa',
    nombre: 'Pierna Completa',
    descripcion: 'Este tratamiento incluye desde el muslo hasta el tobillo.',
    imagen: 'depil/zonas/pierna-completa',
    grupo: 'Extremidades',
    icono: 'fa-solid fa-shoe-prints',
  },
  {
    id: 'rostro',
    nombre: 'Rostro',
    descripcion: 'Este tratamiento te incluye pómulos, patillas, bigote, mentón y papada.',
    imagen: 'depil/zonas/rostro',
    grupo: 'Rostro',
    icono: 'fa-solid fa-face-smile',
  },
  {
    id: 'bigote',
    nombre: 'Bigote',
    descripcion: 'Este tratamiento incluye depilación de bigote y labio superior.',
    imagen: 'depil/zonas/bigote',
    grupo: 'Rostro',
    icono: 'fa-solid fa-face-smile',
  },
  {
    id: 'espalda-completa',
    nombre: 'Espalda Completa',
    descripcion: 'Este tratamiento incluye desde los hombros hasta la cadera.',
    imagen: 'depil/zonas/espalda-completa',
    grupo: 'Tronco',
    icono: 'fa-solid fa-person',
  },
  {
    id: 'media-espalda',
    nombre: 'Media Espalda',
    descripcion:
      'Este tratamiento incluye desde los hombros hasta la cintura, o desde la cadera hasta la cintura.',
    imagen: 'depil/zonas/media-espalda',
    grupo: 'Tronco',
    icono: 'fa-solid fa-person',
  },
  {
    id: 'gluteos-completos',
    nombre: 'Glúteos Completos',
    descripcion: 'Este tratamiento incluye glúteos, línea interglútea, recto y ano.',
    imagen: 'depil/zonas/gluteos-completos',
    grupo: 'Íntima',
    icono: 'fa-solid fa-heart',
  },
  {
    id: 'brazo-completo',
    nombre: 'Brazo Completo',
    descripcion: 'Este tratamiento incluye desde el hombro hasta la muñeca.',
    imagen: 'depil/zonas/brazo-completo',
    grupo: 'Extremidades',
    icono: 'fa-solid fa-hand',
  },
  {
    id: 'medio-brazo',
    nombre: 'Medio Brazo',
    descripcion:
      'Este tratamiento incluye desde el hombro hasta el codo, o desde la muñeca hasta el codo.',
    imagen: 'depil/zonas/medio-brazo',
    grupo: 'Extremidades',
    icono: 'fa-solid fa-hand',
  },
  {
    id: 'dedos-manos-pies',
    nombre: 'Dedos, Manos o Pies',
    descripcion: 'Este tratamiento incluye depilación de dedos, manos o pies.',
    imagen: 'depil/zonas/dedos-manos-pies',
    grupo: 'Extremidades',
    icono: 'fa-solid fa-hand',
  },
  {
    id: 'pecho',
    nombre: 'Pecho',
    descripcion: 'Este tratamiento incluye parte superior del torso, ambos pechos y areolas.',
    imagen: 'depil/zonas/pecho',
    grupo: 'Tronco',
    icono: 'fa-solid fa-person',
  },
  {
    id: 'abdomen-linea-alba',
    nombre: 'Abdomen / Línea Alba',
    descripcion: 'Este tratamiento incluye desde el ombligo hasta el pubis.',
    imagen: 'depil/zonas/abdomen-linea-alba',
    grupo: 'Tronco',
    icono: 'fa-solid fa-person',
  },
  {
    id: 'abdomen',
    nombre: 'Abdomen',
    descripcion: 'Este tratamiento incluye desde el fin del pecho hasta el pubis.',
    imagen: 'depil/zonas/abdomen',
    grupo: 'Tronco',
    icono: 'fa-solid fa-person',
  },
]

export const GRUPOS_ZONA: Array<{ id: GrupoZona | 'Todas'; label: string; icono: string }> = [
  { id: 'Todas', label: 'Todas', icono: 'fa-solid fa-grip' },
  { id: 'Rostro', label: 'Rostro', icono: 'fa-solid fa-face-smile' },
  { id: 'Tronco', label: 'Tronco', icono: 'fa-solid fa-person' },
  { id: 'Extremidades', label: 'Extremidades', icono: 'fa-solid fa-hand' },
  { id: 'Íntima', label: 'Zona íntima', icono: 'fa-solid fa-heart' },
]
