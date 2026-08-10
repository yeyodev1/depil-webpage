/** Preguntas frecuentes. Fuente: sección "Preguntas Frecuentes" de depil.com.ec */

export interface PreguntaFrecuente {
  id: string
  pregunta: string
  respuesta: string
}

export const FAQ: PreguntaFrecuente[] = [
  {
    id: 'tecnologia',
    pregunta: '¿Cómo funciona la tecnología TriLaser y 4D?',
    respuesta:
      'Nuestra tecnología TriLaser y 4D combina tres y cuatro longitudes de onda en un solo disparo para atacar el vello en diferentes profundidades del folículo. Esto garantiza una eliminación más efectiva y segura en todo tipo de piel, brindando mejores resultados en menos tiempo y sin generar molestias.',
  },
  {
    id: 'seguridad',
    pregunta: '¿La depilación láser es segura para todo tipo de piel?',
    respuesta:
      'Sí, nuestra tecnología está aprobada por la FDA y es efectiva en todos los fototipos de piel, incluyendo pieles claras, oscuras y bronceadas. Además, nuestro sistema de enfriamiento protege la piel y reduce cualquier molestia durante el procedimiento.',
  },
  {
    id: 'sesiones',
    pregunta: '¿Cuántas sesiones necesito para ver resultados?',
    respuesta:
      'Desde la primera sesión notarás una disminución en el crecimiento del vello. Sin embargo, para lograr una reducción definitiva, recomendamos entre 6 y 8 sesiones, dependiendo del tipo de piel, grosor del vello y la zona tratada.',
  },
  {
    id: 'dolor',
    pregunta: '¿La depilación láser duele?',
    respuesta:
      'No, el tratamiento es prácticamente indoloro. Nuestro equipo cuenta con un sistema de enfriamiento que protege la piel y minimiza cualquier sensación de calor o incomodidad, haciéndolo mucho más confortable en comparación con otros métodos de depilación.',
  },
  {
    id: 'duracion',
    pregunta: '¿Cuánto tiempo dura cada sesión?',
    respuesta:
      'El tiempo de cada sesión varía según la zona tratada. Áreas pequeñas como el bigote o las axilas pueden tomar entre 10 y 15 minutos, mientras que zonas más amplias como piernas completas pueden tardar entre 30 y 45 minutos.',
  },
  {
    id: 'cera',
    pregunta: '¿Puedo depilarme con cera o rasurarme entre sesiones?',
    respuesta:
      'No se recomienda el uso de cera, pinzas o cualquier método que elimine el vello desde la raíz, ya que esto interfiere con el tratamiento. Lo ideal es rasurar la zona antes de cada sesión para permitir que el láser actúe correctamente sobre el folículo.',
  },
  {
    id: 'cuidados',
    pregunta: '¿Cuáles son los cuidados antes y después del tratamiento?',
    respuesta:
      'Antes del tratamiento, evita la exposición solar directa y rasura la zona 24 horas antes de tu sesión. Después del tratamiento, utiliza protector solar, hidrata bien la piel y evita saunas o baños muy calientes por al menos 48 horas para prevenir irritaciones.',
  },
  {
    id: 'tatuajes',
    pregunta: '¿Puedo realizarme el tratamiento si tengo tatuajes?',
    respuesta:
      'Sí, pero los tatuajes deben ser cubiertos antes del procedimiento, ya que el láser puede afectar la tinta y generar molestias en la zona. Nuestros especialistas tomarán las precauciones necesarias para proteger tus tatuajes y garantizar un tratamiento seguro.',
  },
  {
    id: 'efectos',
    pregunta: '¿La depilación láser tiene efectos secundarios?',
    respuesta:
      'Es un tratamiento seguro, pero en algunos casos pueden presentarse enrojecimiento leve o sensibilidad en la zona tratada, los cuales desaparecen en pocas horas. Siguiendo las recomendaciones post-tratamiento, reducirás cualquier incomodidad.',
  },
  {
    id: 'zonas',
    pregunta: '¿Cuáles son las zonas que puedo tratar con depilación láser?',
    respuesta:
      'Puedes tratar casi cualquier zona del cuerpo, incluyendo piernas, brazos, axilas, rostro, espalda, abdomen, glúteos y zona íntima. Durante tu consulta, nuestros especialistas te asesorarán sobre el mejor tratamiento para tus necesidades.',
  },
]
