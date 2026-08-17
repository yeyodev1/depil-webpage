/**
 * Guías: contenido editorial rescatado del blog de depil.com.ec vía su API REST
 * antes del apagado del WordPress.
 *
 * Se llaman "guías", nunca "blog" ni "artículos": decisión de marca.
 *
 * El texto venía maquetado con Elementor, que reparte el contenido entre
 * <div> y <span> en vez de <p>. Por eso la extracción no buscó etiquetas
 * concretas: marcó encabezados y listas, convirtió cada cierre de bloque en un
 * salto de línea y repartió el texto resultante. Con el método ingenuo se
 * perdía hasta el 89 % del contenido de algunas guías.
 *
 * Los bloques se renderizan como elementos reales, nunca con `v-html`.
 * Los slugs son los del WordPress para poder redirigir 301 (ver el router).
 */

export type CategoriaGuia = 'Tratamiento' | 'Experiencias' | 'Equipo Depil'

export interface BloqueGuia {
  tipo: 'h2' | 'p' | 'li'
  texto: string
}

export interface Guia {
  slug: string
  titulo: string
  descripcion: string
  categoria: CategoriaGuia
  fecha: string
  imagen: string
  /** Para `wordCount` del schema y el tiempo de lectura. */
  palabras: number
  /** Enlazado interno hacia las zonas que trata la guía (SEO). */
  zonasRelacionadas: string[]
  bloques: BloqueGuia[]
}

export const GUIAS: Guia[] = [
  {
    slug: 'depilacion-definitiva',
    titulo: 'Depilación definitiva: todo lo que necesitas saber',
    descripcion: 'Qué es la depilación definitiva con láser, cómo actúa sobre el folículo y qué esperar sesión a sesión.',
    categoria: 'Tratamiento',
    fecha: '2025-02-19',
    imagen: 'depil/guias/depilacion-definitiva',
    palabras: 469,
    zonasRelacionadas: ['pierna-completa', 'axilas-completas'],
    bloques: [
      { tipo: 'h2', texto: 'Te contamos todo lo que necesitas saber' },
      { tipo: 'p', texto: '¿Sueñas con unas piernas tersas y lisas, con unas axilas delicadas, y con un rosto desprovisto de cualquier sombra que pueda opacar tu sonrisa? Gracias a la depilación definitiva es posible.' },
      { tipo: 'p', texto: 'En Depil Ec, podemos ayudarte, somos líderes en depilación láser definitiva con tecnología Tri-Laser & 4D y en cosmetología avanzada. Te invitamos a nuestros locales Depil Ec en Quito y todas nuestras sedes al rededor del Ecuador para recibir una asesoría y diagnóstico completamente gratis.' },
      { tipo: 'h2', texto: '¿Qué es la depilación definitiva o fotodepilación?' },
      { tipo: 'p', texto: 'En la actualidad es una de las técnicas preferidas por mujeres y hombres para eliminar el vello desde la raíz. Es uno de los métodos más eficaces para eliminar ese indeseable vello y obtener buenos resultados como mejorar el aspecto de la piel. Existen algunas técnicas y equipos para realizarla. Se puede realizar en las zonas del rostro y el cuerpo.' },
      { tipo: 'p', texto: 'En Depil Ec trabajamos con la tecnología láser Tri-Laser & 4D aprobada por la FDA, un método de depilación progresivo que actúa directamente sobre el folículo, promueve la producción de colágeno en la piel y elimina la aparición del vello. Contamos con protocolos europeos y tecnología de última generación, para ofrecer los mejores resultados.' },
      { tipo: 'h2', texto: 'Más beneficios de la depilación definitiva' },
      { tipo: 'p', texto: 'No sirve solamente para eliminar el vello, sino que también contribuye a mejorar la textura y la elasticidad de la piel. El láser genera una activación del colágeno y la elastina que brinda mayor suavidad a la piel. También sirve para aclarar zonas manchadas como las axilas, que suelen ponerse de un color oscuro.' },
      { tipo: 'p', texto: 'Los dermatólogos la recomiendan para tratar la foculitis o pelos encarnados, que suele provocar granos e infecciones. La depilación ayuda a mejorar esta patología, desde la primera sesión ya se observan resultados sorprendentes. También se puede complementar realizando una exfoliación de la piel durante la ducha y luego hidratándola muy bien.' },
      { tipo: 'h2', texto: 'Preguntas frecuentes' },
      { tipo: 'li', texto: '¿En qué zonas me puedo depilar?' },
      { tipo: 'p', texto: 'En el rostro y cuerpo, prácticamente en todas las zonas como: bigote, cejas, mentón, frente, patilla, entrecejo, piernas, axilas, bikini, brazos, hombros, lumbares, pies, manos, nuca, pecho, abdomen.' },
      { tipo: 'li', texto: '¿Duele este tipo de tratamiento mientras se lo aplica?' },
      { tipo: 'p', texto: 'En Depil Ec contamos con una tecnología de refrigeración que nos permite contrastar el calor de la onda al calentarse el folículo, que nos ayuda a combatir la sensación de dolor.' },
      { tipo: 'li', texto: '¿Cuán definitiva es este tipo de depilación?' },
      { tipo: 'p', texto: 'En algunos casos puede durar más de 10 años o en otros, toda la vida. Sin embargo, luego de terminar todas las sesiones sí se recomienda tomar unas sesiones de mantenimiento.' },
      { tipo: 'li', texto: '¿Qué pasa con los vellos blancos o canas, se pueden eliminar?' },
      { tipo: 'p', texto: 'No, no pueden ser eliminados con ningún láser o luz pulsada porque estos métodos son termólisis selectivas por color. Los pelos blancos se pueden eliminar simultáneamente con aguja, por electrólisis, uno por uno.' },
    ],
  },
  {
    slug: 'descubre-sus-beneficios',
    titulo: 'Beneficios reales de la depilación láser',
    descripcion: 'Por qué el láser supera a la cera y la rasuradora: sin irritación, sin vellos enquistados y con resultados duraderos.',
    categoria: 'Tratamiento',
    fecha: '2025-07-24',
    imagen: 'depil/guias/descubre-sus-beneficios',
    palabras: 262,
    zonasRelacionadas: ['axilas-completas', 'bikini-full'],
    bloques: [
      { tipo: 'h2', texto: 'Descubre los Beneficios Reales del Láser en Depilación: TecnologíaAvanzada para Resultados Seguros y Duraderos' },
      { tipo: 'p', texto: '¿Te imaginas olvidarte de la depilación diaria con métodos dolorosos y costosos?' },
      { tipo: 'p', texto: '¿Quisieras sentir tu piel suave, uniforme y libre de foliculitis?' },
      { tipo: 'p', texto: 'Actualmente la tecnología avanza, y con ella tenemos la depilación láser triláser y 4D, una de las más efectivas y seguras del mercado. Pero… ¿qué la hace diferente y por qué es ideal para ti?' },
      { tipo: 'h2', texto: '¿Qué es el láser triláser?' },
      { tipo: 'p', texto: 'El láser triláser es un equipo de última generación que combina tres longitudes de onda en un solo disparo (755nm, 808nm y 1064nm), permitiendo tratar de manera eficaz y segura todos los tipos de piel y vello.' },
      { tipo: 'h2', texto: 'Beneficios del láser triláser que debes conocer' },
      { tipo: 'h2', texto: '1. Mayor eficacia en cada sesión' },
      { tipo: 'p', texto: 'Al combinar tres longitudes de onda, actúa en diferentes profundidades y estructuras del folículo piloso, logrando destruirlo de manera más completa y rápida.' },
      { tipo: 'h2', texto: '2. Apto para todo tipo de pieles' },
      { tipo: 'p', texto: 'Incluso en fototipos oscuros, con menor riesgo de hiperpigmentación o quemaduras cuando se usa con protocolos correctos.' },
      { tipo: 'h2', texto: '3. Resultados más rápidos y visibles' },
      { tipo: 'p', texto: 'Se observa reducción desde la primera sesión, con menor cantidad de sesiones necesarias en comparación con tecnologías antiguas.' },
      { tipo: 'h2', texto: '4. Menor dolor y mayor confort' },
      { tipo: 'p', texto: 'Su sistema de enfriamiento avanzado (4D) protege la epidermis y permite un tratamiento prácticamente indoloro.' },
      { tipo: 'h2', texto: '5. Reduce foliculitis y vellos encarnados' },
      { tipo: 'p', texto: 'Ideal para personas con tendencia a la foliculitis, eliminando el vello que provoca irritación y los incomodos granitos.' },
      { tipo: 'h2', texto: '6. Seguridad comprobada' },
      { tipo: 'p', texto: 'Es un tratamiento seguro cuando lo realiza personal capacitado, con protocolos individualizados según el fototipo y zona.' },
    ],
  },
  {
    slug: 'cada-cuanto-tiempo-se-recomienda',
    titulo: '¿Cada cuánto tiempo debo hacerme las sesiones?',
    descripcion: 'La frecuencia correcta entre sesiones de Tri-Láser 4D y por qué respetar el ciclo del vello define el resultado.',
    categoria: 'Tratamiento',
    fecha: '2025-07-24',
    imagen: 'depil/guias/cada-cuanto-tiempo-se-recomienda',
    palabras: 202,
    zonasRelacionadas: ['pierna-completa', 'rostro'],
    bloques: [
      { tipo: 'h2', texto: '¿Cada cuánto tiempo debo hacerme las sesiones de depilación definitiva con Tri-Láser 4D?' },
      { tipo: 'p', texto: 'La clave del éxito en la depilación definitiva no está solo en la tecnología, sino también en la frecuencia adecuada. En Depil, trabajamos con tecnología avanzada Tri-Láser 4D, pero también educamos a nuestras' },
      { tipo: 'p', texto: 'pacientes para que su tratamiento sea verdaderamente efectivo y duradero. Uno de los factores más importantes para lograrlo es respetar los tiempos ideales entre sesión y sesión.' },
      { tipo: 'h2', texto: '¿Por qué es tan importante la frecuencia entre sesiones?' },
      { tipo: 'p', texto: 'El láser actúa sobre el folículo piloso en su fase de crecimiento activa (fase anágena). Sin embargo, no todos los vellos están en esa fase al mismo tiempo. Por eso es necesario espaciar las sesiones para capturar nuevos vellos que entren en esa etapa.' },
      { tipo: 'p', texto: 'La Frecuencia recomendada con tecnología Tri-Láser 4D es entre 4 a 6 semanas' },
      { tipo: 'h2', texto: '¿Qué pasa si hago las sesiones demasiado juntas o muy espaciadas?' },
      { tipo: 'li', texto: 'Si las haces muy seguidas, el láser no será eficaz porque no habrá suficientes vellos en faseanágena.' },
      { tipo: 'li', texto: 'Si las haces muy distantes, algunos folículos pueden volver a activarse y crecer con más fuerza.' },
      { tipo: 'li', texto: 'Lo ideal es mantener una frecuencia constante y controlada, adaptada a tu tipo de piel,' },
      { tipo: 'p', texto: 'vello y zona tratada.' },
    ],
  },
  {
    slug: 'desde-que-edad-se-puede',
    titulo: '¿Desde qué edad se puede hacer depilación láser?',
    descripcion: 'Qué dicen las especialistas sobre la depilación láser en adolescentes y qué precauciones tomamos con menores.',
    categoria: 'Tratamiento',
    fecha: '2025-07-24',
    imagen: 'depil/guias/desde-que-edad-se-puede',
    palabras: 443,
    zonasRelacionadas: ['bigote', 'axilas-completas'],
    bloques: [
      { tipo: 'h2', texto: '¿Es recomendable la depilación láser en niñas de 10 a 15 años?' },
      { tipo: 'p', texto: 'En los últimos años, el interés por la depilación láser ha ido en aumento, incluso entre adolescentes muy jóvenes. Muchos padres y madres consultan si es adecuado iniciar este tipo de tratamiento en niñas de entre 10 y 15 años, especialmente cuando ya hay presencia de vello corporal visible. Sin embargo, como expertos en depilación láser, es importante explicar por qué no se recomienda iniciar este procedimiento antes de que ocurran los cambios hormonales propios de la adolescencia.' },
      { tipo: 'h2', texto: 'El cuerpo aún está en desarrollo hormonal' },
      { tipo: 'p', texto: 'Durante la infancia y la etapa temprana de la adolescencia (entre los 10 y 15 años), el cuerpo de las niñas se encuentra en pleno desarrollo hormonal. Es un período de transición en el que las hormonas sexuales aún no se han estabilizado. Esto influye directamente en la aparición y evolución del vello corporal.' },
      { tipo: 'p', texto: 'Iniciar un tratamiento de depilación láser en esta etapa puede resultar poco eficaz a largo plazo, ya que el patrón de crecimiento del vello aún no es definitivo. Es muy probable que, aunque se elimine el vello actual, con el paso del tiempo aparezca nuevo vello inducido porlos cambios hormonales.' },
      { tipo: 'h2', texto: 'La efectividad del tratamiento puede verse comprometida' },
      { tipo: 'p', texto: 'El tratamiento láser está diseñado para actuar sobre el folículo piloso en su etapa activa de crecimiento (fase anágena), y funciona mejor cuando el vello es maduro y estable. En niñas que aún no han pasado por la pubertad, el vello suele ser más fino, claro o en desarrollo, lo que hace que el láser no lo detecte adecuadamente, reduciendo su efectividad.' },
      { tipo: 'p', texto: 'Además, hay un mayor riesgo de que se necesiten más sesiones de mantenimiento o incluso repetir el tratamiento completo años después, cuando los niveles hormonales se estabilicen.' },
      { tipo: 'h2', texto: 'Seguridad y salud dermatológica' },
      { tipo: 'p', texto: 'La piel infantil es más sensible que la de un adulto o adolescente en plena madurez. Esto aumenta el riesgo de efectos secundarios como irritaciones, quemaduras leves o hiperpigmentaciones si el procedimiento no se realiza bajo estrictas normas de seguridad, evaluación médica y con equipos apropiados para pieles jóvenes.' },
      { tipo: 'h2', texto: '¿Cuándo es el momento adecuado para comenzar?' },
      { tipo: 'p', texto: 'La recomendación general es esperar hasta que la adolescente haya iniciado y estabilizado su desarrollo puberal, lo que suele suceder alrededor de los 15 o 16 años. En esta etapa, el vello corporal ya tiene un patrón definido y los resultados del tratamiento serán mucho más eficaces y duraderos.' },
      { tipo: 'p', texto: 'Por supuesto, cada caso debe evaluarse de forma individual. Lo ideal es realizar una valoración previa con un profesional capacitado, quien podrá determinar si la paciente se encuentra en el momento adecuado para iniciar la depilación láser.' },
    ],
  },
  {
    slug: 'preguntas-comunes',
    titulo: 'Dudas frecuentes antes de tu primera sesión',
    descripcion: 'Cuándo se ven resultados, si duele, cuántas sesiones necesitas y cómo preparar la piel antes de empezar.',
    categoria: 'Tratamiento',
    fecha: '2025-07-24',
    imagen: 'depil/guias/preguntas-comunes',
    palabras: 286,
    zonasRelacionadas: ['axilas-completas', 'bikini-brasilero'],
    bloques: [
      { tipo: 'h2', texto: '¿Cuándo empezaré a ver resultados?' },
      { tipo: 'p', texto: 'Desde la primera sesión se nota una disminución del crecimiento del vello. A partir de la tercera o cuarta sesión, los resultados son notoriamente visibles, con una piel más suave y libre de vello.' },
      { tipo: 'h2', texto: '¿Es doloroso?' },
      { tipo: 'p', texto: 'Gracias a su sistema de enfriamiento con tecnología sapphire contact cooling (enfriamiento por contacto de zafiro), el Tri Láser 4D ofrece una experiencia cómoda y prácticamente indolora.' },
      { tipo: 'p', texto: 'Incluso en zonas sensibles, el nivel de molestia es mínimo.' },
      { tipo: 'h2', texto: '¿Puedo depilarme con cera entre sesiones?' },
      { tipo: 'p', texto: 'La cera, pinzas o cualquier método que arranque el vello de raíz deben evitarse, ya que el' },
      { tipo: 'p', texto: 'láser necesita el folículo piloso intacto para ser efectivo. Solo se permite rasurado.' },
      { tipo: 'h2', texto: '¿Es seguro para pieles morenas u oscuras?' },
      { tipo: 'p', texto: 'Sí, la tecnología Tri Láser 4D es completamente segura y eficaz para pieles morenas, oscuras e incluso bronceadas. Esto se debe a que incluye la longitud de onda ND:YAG (1064 nm), que penetra más profundamente en la piel y evita ser absorbida por la melanina superficial, reduciendo así el riesgo de quemaduras, hiperpigmentaciones o manchas.' },
      { tipo: 'h2', texto: '¿Cuántas sesiones son necesarias?' },
      { tipo: 'p', texto: 'Generalmente, se recomiendan entre 6 y 8 sesiones dependiendo del tipo de piel, color y grosor del vello, así como la zona a tratar. El intervalo entre sesiones suele ser de 4 a 6 semanas.' },
      { tipo: 'h2', texto: '¿Qué debo hacer antes y después del láser?' },
      { tipo: 'h2', texto: 'Antes del tratamiento:' },
      { tipo: 'li', texto: 'No te depiles con cera o pinzas al menos 3 semanas antes.' },
      { tipo: 'li', texto: 'Rasura el área a tratar 24 horas antes.' },
      { tipo: 'li', texto: 'Evita la exposición solar, roces y quemaduras' },
      { tipo: 'h2', texto: 'Después del tratamiento:' },
      { tipo: 'li', texto: 'Usa protector solar SPF50+.' },
      { tipo: 'li', texto: 'Evita calor extremo (baños calientes, sauna) por 48 horas.' },
      { tipo: 'li', texto: 'Evitar realizar actividades que nos provoquen sudar, esto podría causar inflamación o irritación' },
      { tipo: 'li', texto: 'Hidrata tu piel diariamente.' },
    ],
  },
  {
    slug: 'experiencia-con-depilacion-laser',
    titulo: 'Mi experiencia con la depilación láser en barba',
    descripcion: 'El testimonio de un paciente que dejó atrás las pinzas y los vellos enquistados gracias al láser.',
    categoria: 'Experiencias',
    fecha: '2025-07-24',
    imagen: 'depil/guias/experiencia-con-depilacion-laser',
    palabras: 217,
    zonasRelacionadas: ['rostro', 'bigote'],
    bloques: [
      { tipo: 'p', texto: 'Durante años, mi rutina incluía un incómodo y tedioso hábito: usar pinzas para retirar uno a uno los vellos enquistados en mi barba. Cada vez que aparecían, sabía que vendrían también los molestos granitos, la irritación constante y esa sensación de inseguridad al verme al espejo. Era frustrante. No solo por el tiempo que tomaba, sino porque esa zona quedaba inflamada, sensible y con marcas.' },
      { tipo: 'p', texto: 'Fue entonces cuando decidí probar algo diferente. Me animé a iniciar un tratamiento de depilación láser en la zona de la barba, y sinceramente, no imaginé cuánto cambiaría mi día a día. Desde las primeras sesiones, noté una disminución significativa del vello, menos irritación, y sobre todo, una piel más limpia y uniforme.' },
      { tipo: 'p', texto: 'Hoy, no tengo que lidiar con pinzas ni esperar a que el problema reaparezca: la solución llegó para quedarse. A todos los caballeros que aún dudan, les digo: dejen atrás los mitos. La depilación láser no es solo para mujeres, es para quienes valoran su bienestar, su imagen y desean sentirse seguros consigo mismos. Cuidarse no es una cuestión de género, es una elección personal.' },
      { tipo: 'p', texto: 'Si tú también quieres dar el paso, te invito a conocer DEPIL, el centro estético con la mejor tecnología en depilación láser del país.' },
      { tipo: 'h2', texto: 'DEPIL: donde el cuidado personal también es cosa de hombres.' },
    ],
  },
  {
    slug: 'porque-las-madres-buscamos-depilacion-laser',
    titulo: 'Por qué las madres buscamos depilación láser',
    descripcion: 'Tiempo, comodidad y autoestima: por qué tantas mujeres eligen el láser después de ser mamás.',
    categoria: 'Experiencias',
    fecha: '2025-07-24',
    imagen: 'depil/guias/porque-las-madres-buscamos-depilacion-laser',
    palabras: 635,
    zonasRelacionadas: ['bikini-full', 'pierna-completa'],
    bloques: [
      { tipo: 'h2', texto: 'Ser madre me hizo entender por qué tantas mujeres buscan la depilación láser' },
      { tipo: 'p', texto: 'Antes de convertirme en mamá, escuchaba a muchas mujeres hablar de su deseo de realizarse una depilación láser definitiva, o de aclarar zonas como las axilas o bikini. Lo entendía, pero no con la profundidad con la que lo hago ahora. Fue al recorrer el hermoso y también desafiante camino del embarazo y la maternidad que comprendí verdaderamente por qué tantas mujeres buscan sentirse cómodas y seguras con su piel.' },
      { tipo: 'h2', texto: 'El embarazo: un viaje de cambios físicos y emocionales.' },
      { tipo: 'p', texto: 'Durante el embarazo, nuestro cuerpo atraviesa innumerables cambios hormonales. Estos no solo afectan nuestras emociones, sino también la apariencia de nuestra piel. En mi caso, como en el de muchas otras mujeres, noté el oscurecimiento de algunas zonas del cuerpo, algo completamente normal, pero que puede impactar en cómo nos sentimos frente al espejo.' },
      { tipo: 'p', texto: 'Uno de los beneficios menos conocidos de la depilación láser, especialmente con tecnología avanzada como la que usamos en Depil, es que puede ayudar a mejorar el tono de la piel en áreas como axilas y bikini, aclarando entre uno y dos tonos. Este beneficio me pareció especialmente valioso tras el parto.' },
      { tipo: 'h2', texto: 'Cuidarnos no debería' },
      { tipo: 'p', texto: 'causar culpa' },
      { tipo: 'p', texto: 'Después de ser mamá, nuestro bebé se convierte en el centro de nuestro universo. Y aunque ese amor es infinito, muchas veces eso significa dejar de lado nuestro propio' },
      { tipo: 'p', texto: 'autocuidado. Pero sentirnos bien con nosotras mismas no es superficial: mejora nuestro estado de ánimo, nos recarga de energía y nos permite seguir dando lo mejor en todos nuestros roles.' },
      { tipo: 'p', texto: 'En mi caso, además de ser madre, también trabajo desde casa como teleoperadora y me encargo de muchas tareas del hogar. El día se me va volando. Por eso, pensar en reducir el tiempo que dedico en depilarme con métodos tradicionales (como la rasuradora o cremas) es una decisión que va más allá de lo estético: es una manera de facilitar mi rutina y regalarme bienestar.' },
      { tipo: 'h2', texto: '¿Por qué depilación tri láser y 4D y no otro método?' },
      { tipo: 'p', texto: 'La depilación láser es mucho más que eliminar el vello: ofrece resultados duraderos, seguridad y confort. En Depil, utilizamos la avanzada tecnología Triláser y 4D, aprobada por la FDA, que combina tres longitudes de onda en un mismo equipo para lograr una depilación más completa, eficaz y segura.' },
      { tipo: 'p', texto: 'Gracias a esta tecnología de última generación, se puede mejorar la textura y el tono de la piel, ayudando a reducir manchas o foliculitis, algo que muchas mujeres valoramos aún más después de haber atravesado un embarazo. En definitiva, la depilación Triláser y 4D no solo te libera del vello, sino que también' },
      { tipo: 'p', texto: 'cuida y embellece tu piel.' },
      { tipo: 'h2', texto: 'Pero… ¿Y si estoy lactando?' },
      { tipo: 'p', texto: 'En Depil, priorizamos siempre la salud y bienestar de nuestras pacientes. Por ello, nuestro protocolo establece que no realizamos tratamientos de depilación láser durante el embarazo ni en el periodo de lactancia. Esto se debe a los cambios hormonales naturales que ocurren en estas etapas, los cuales pueden alterar la respuesta de la piel, afectar la eficacia y seguridad del tratamiento.' },
      { tipo: 'p', texto: 'Esta decisión está pensada en beneficio de cada paciente, para garantizar los mejores resultados y la máxima protección de su salud. Personalmente, estoy viviendo con ilusión mi etapa de lactancia, y sé que cuando la finalice, podré iniciar mi tratamiento con toda confianza para lograr una piel más suave, uniforme y libre de vello.' },
      { tipo: 'p', texto: 'Mi consejo para otras mamás: cuidarte no es egoísta, es necesario. Regálate ese tiempo, esa atención y esa decisión que sabes que te hará sentir mejor. Porque cuando tú estás bien, todo lo demás fluye.' },
      { tipo: 'h2', texto: '¿Estás lista para volver a sentirte increíble con tu piel?' },
      { tipo: 'p', texto: 'Reserva tu cita gratuita de valoración y descubre cómo nuestra tecnología Triláser y 4D puede ayudarte a recuperar tu tiempo, tu piel… y tu confianza.' },
    ],
  },
  {
    slug: 'mis-historias-como-especialista',
    titulo: 'Historias que acompaño como especialista',
    descripcion: 'Lo que una especialista aprende sesión tras sesión: mucho más que eliminar vello.',
    categoria: 'Experiencias',
    fecha: '2025-07-24',
    imagen: 'depil/guias/mis-historias-como-especialista',
    palabras: 177,
    zonasRelacionadas: ['rostro'],
    bloques: [
      { tipo: 'h2', texto: 'La depilación láser y las historias que me ha tocado acompañar como especialista:' },
      { tipo: 'p', texto: 'Como especialista en depilación láser, he aprendido que este trabajo va mucho más allá de eliminar vello. En cada sesión, escucho historias: mujeres que vienen cansadas del juicio sobre su cuerpo, personas que han pasado por cambios importantes en su vida y quieren empezar de nuevo, o simplemente alguien que busca sentirse mejor consigo mismo. He visto cómo, poco a poco, mientras avanza el tratamiento, también se transforma la forma en la que se miran al espejo. A veces, la sesión se convierte en un espacio seguro para hablar, desahogarse o simplemente desconectar un rato del día a día.' },
      { tipo: 'p', texto: 'Y yo estoy ahí, no solo como profesional, sino también como alguien que escucha y acompaña sin juzgar.' },
      { tipo: 'p', texto: 'La depilación láser no es solo un cambio físico, muchas veces es una decisión cargada de historia, de emociones y de ganas de sentirse libre.' },
      { tipo: 'p', texto: 'Si estás pensando en hacerlo, estoy aquí para ayudarte no solo a nivel técnico, sino también humano. Porque tu historia también importa.' },
    ],
  },
  {
    slug: 'el-corazon-en-cada-resultado',
    titulo: 'El corazón detrás de cada resultado',
    descripcion: 'Cómo formamos y cuidamos al equipo de Depil, porque el resultado empieza en las personas.',
    categoria: 'Equipo Depil',
    fecha: '2025-07-24',
    imagen: 'depil/guias/el-corazon-en-cada-resultado',
    palabras: 381,
    zonasRelacionadas: [],
    bloques: [
      { tipo: 'h2', texto: 'Gestión del Talento Humano en Depil: El corazón detrás de cada resultado:' },
      { tipo: 'p', texto: 'En Depil, entendemos que el verdadero motor de una empresa no son solo las máquinas, la tecnología o los procesos, sino las personas. Por eso, desde nuestro Departamento de Gestión de Talento Humano, trabajamos cada día para construir un entorno en donde nuestras especialistas se sientan valoradas, escuchadas y motivadas a crecer.' },
      { tipo: 'h2', texto: 'Más que resultados: humanidad y aprendizaje continuo' },
      { tipo: 'p', texto: 'Nuestras colaboradoras no son operadoras de láser; son especialistas, profesionales con criterio, vocación y formación continua. En Depil creemos firmemente en el aprendizaje constante, ya que cada paciente representa un nuevo reto, una nueva historia de piel y de cuidado. Nos enfrentamos como equipo a situaciones diversas que atraviesan nuestras especialistas, y siempre buscamos priorizar el lado humano, acompañando, dialogando y reconociendo el esfuerzo diario.' },
      { tipo: 'p', texto: 'Capacitación constante y tecnología al servicio del conocimiento' },
      { tipo: 'p', texto: 'En todos nuestros centros de depilación láser en Ecuador, nuestras especialistas reciben la misma formación, actualizaciones y certificaciones. Esto garantiza una atención homogénea, precisa y profesional sin importar en qué ciudad se encuentren nuestras pacientes.' },
      { tipo: 'p', texto: 'Gracias a nuestro sistema de seguimiento, que incluye herramientas de última generación como el traqueador de vello y registro fotográfico cifrado, podemos continuar tratamientos en distintas ciudades sin perder continuidad. Así, una paciente puede iniciar su tratamiento en Quito y terminarlo en Guayaquil con la misma confianza y calidad de atención.' },
      { tipo: 'h2', texto: 'Gestión humana y motivación interna' },
      { tipo: 'p', texto: 'En Depil no creemos en estructuras jerárquicas rígidas. Creemos en líderes empáticos, en escuchas activas, en la importancia del reconocimiento y en el bienestar emocional del equipo. Por ello, implementamos estrategias de motivación como:' },
      { tipo: 'li', texto: 'Planes de desarrollo profesional' },
      { tipo: 'li', texto: 'Incentivos por excelencia en atención al cliente' },
      { tipo: 'li', texto: 'Encuentros de retroalimentación constante' },
      { tipo: 'li', texto: 'Espacios de autocuidado y salud emocional' },
      { tipo: 'p', texto: 'Cada colaboradora forma parte de un sistema que no solo espera resultados, sino que también valora el camino que lleva a ellos. Porque entendemos que cuidar a quien cuida, es el primer paso para brindar un servicio excepcional.' },
      { tipo: 'h2', texto: 'Hacia un Ecuador más conectado y profesionalizado' },
      { tipo: 'p', texto: 'Depil está en constante expansión y nuestra meta es llegar a cada rincón del país con el mismo estándar, el mismo respeto y la misma excelencia. Contamos con un equipo de talento humano que transforma cada espacio en un lugar de crecimiento profesional y bienestar laboral.' },
    ],
  },
  {
    slug: 'entre-el-detalle-la-ciencia-y-el-servicio-humano',
    titulo: 'Dirigir una clínica de depilación láser',
    descripcion: 'Entre el detalle, la ciencia y el servicio humano: cómo construimos Depil.',
    categoria: 'Equipo Depil',
    fecha: '2025-07-24',
    imagen: 'depil/guias/entre-el-detalle-la-ciencia-y-el-servicio-humano',
    palabras: 704,
    zonasRelacionadas: [],
    bloques: [
      { tipo: 'h2', texto: 'Dirigir una empresa de depilación láser: entre el detalle, la ciencia y el servicio' },
      { tipo: 'p', texto: 'Cuando decidimos abrir las puertas de Depil, sabíamos que no sería solo una empresa de estética. Quisimos crear una marca que pusiera al cliente en el centro, pero también a la ciencia, la tecnología y la ética como fundamentos.' },
      { tipo: 'p', texto: 'Desde la dirección administrativa, entendemos que cuidar una empresa de depilación láser es mucho' },
      { tipo: 'p', texto: 'más que coordinar citas y llevar cuentas claras. Es cuidar cada paso del recorrido del cliente: desde el' },
      { tipo: 'p', texto: 'primer contacto, hasta su última sesión, incluso si eso significa dar un poco más de lo pactado.' },
      { tipo: 'h2', texto: 'Atención al cliente: una escuela de servicio real' },
      { tipo: 'p', texto: 'En Depil creemos que el cliente siempre tiene la razón. Y aunque suene cliché, lo vivimos. Nos esforzamos en acompañar a cada persona durante su tratamiento completo, y si al final le falta una o dos sesiones para culminar el proceso, muchas veces decidimos obsequiarlas como muestra de fidelidad y compromiso. No creemos en procesos mecánicos, sino en relaciones humanas.' },
      { tipo: 'p', texto: 'Por eso contamos con un call center 24/7, atendido por personal capacitado, no por bots ni respuestas automatizadas. Cada colaboradora conoce profundamente los procesos, tecnologías y particularidades de cada caso.' },
      { tipo: 'h2', texto: 'Especialistas verdaderamente capacitadas' },
      { tipo: 'p', texto: 'Uno de los pilares que nos diferencia es que nuestro equipo está conformado por dermocosmiatras, tricólogas y especialistas que no solo aplican un protocolo, sino que estudian el vello, la piel y sus variaciones fisiológicas.' },
      { tipo: 'p', texto: 'En Depil, no trabajamos con sesiones estándar. Aplicamos tratamientos basados en la fase anágena del vello, que es el momento más eficaz para aplicar la tecnología láser. Esta precisión solo puede darse cuando hay conocimiento profundo detrás, por eso invertimos constantemente en capacitaciones internacionales, congresos, certificaciones y actualización de protocolos.' },
      { tipo: 'p', texto: 'Tecnología en constante evolución' },
      { tipo: 'p', texto: 'Sabemos que los disparos láser tienen una vida útil y que la innovación no espera. Por eso renovamos nuestras máquinas cada año o cada vez que la tecnología evoluciona, para garantizar efectividad, rapidez y comodidad. Trabajamos con tecnología Tri Láser y 4D, aprobada por la FDA y la Unión' },
      { tipo: 'p', texto: 'Europea, lo que garantiza no solo resultados visibles, sino seguridad dermatológica.' },
      { tipo: 'h2', texto: 'Salubridad: nuestro estándar más alto' },
      { tipo: 'p', texto: 'Una de nuestras principales obsesiones es la limpieza clínica. Todos nuestros espacios son impecables, desinfectados entre cada cliente. Pero más allá del entorno, nos importa lo que a menudo se omite en otras clínicas: el cuidado del cabezal del láser.' },
      { tipo: 'p', texto: 'Cada zona del cuerpo implica un nuevo protocolo de higiene. En Depil cambiamos el protector del' },
      { tipo: 'p', texto: 'cabezal al pasar de una zona a otra (por ejemplo: de axilas a piernas, o de bikini a rostro). Esto' },
      { tipo: 'p', texto: 'debería ser una norma básica, pero lamentablemente no lo es en muchos lugares.' },
      { tipo: 'p', texto: 'Además, el cabezal siempre está protegido con un film especial, algo que muchas clínicas omiten bajo el argumento erróneo de que el láser no funciona con material transparente. Esto es falso. Contamos con respaldo científico que demuestra que el uso de protectores transparentes no interfiere con la eficacia del tratamiento y, en cambio, protege la salud íntima del paciente.' },
      { tipo: 'p', texto: 'Nuestro personal usa siempre tapabocas, guantes y cofia, cumpliendo con estándares internacionales' },
      { tipo: 'p', texto: 'de salubridad. Hemos adaptado protocolos basados en las normas de sanidad más exigentes, como las del CDC (Centers for Disease Control and Prevention) y la OMS (Organización Mundial de la Salud), para que cada sesión no solo sea eficaz, sino segura.' },
      { tipo: 'h2', texto: 'Ser líderes es una responsabilidad' },
      { tipo: 'p', texto: 'No buscamos ser los primeros por volumen, sino por calidad, consciencia y resultados. Dirigir una marca como Depil exige una visión integral: cuidar a nuestras especialistas, escuchar a nuestras clientas y trabajar cada día con estándares más altos. Por eso, nos sentimos orgullosos de ser la primera marca en depilación láser en Ecuador que combina procesos personalizados, tecnología médica de última generación y un equipo humano profundamente comprometido.' },
      { tipo: 'p', texto: 'En Depil, creemos que la belleza comienza con el respeto. Por eso no solo eliminamos el vello, también eliminamos la negligencia, el descuido y la desinformación.' },
      { tipo: 'h2', texto: '¿Quieres experimentar una depilación láser segura, personalizada y con tecnología de clase mundial?' },
      { tipo: 'p', texto: 'Te invitamos a agendar tu cita hoy mismo con nuestras especialistas. Haz clic en el botón de agendar' },
      { tipo: 'p', texto: 'o comunícate con nuestro equipo disponible 24/7. En Depil, tu piel está en las mejores manos.' },
    ],
  },
]

export const CATEGORIAS_GUIA: Array<{ id: CategoriaGuia | 'Todas'; label: string; icono: string }> = [
  { id: 'Todas', label: 'Todas', icono: 'fa-solid fa-grip' },
  { id: 'Tratamiento', label: 'Sobre el tratamiento', icono: 'fa-solid fa-bolt' },
  { id: 'Experiencias', label: 'Experiencias reales', icono: 'fa-solid fa-heart' },
  { id: 'Equipo Depil', label: 'Nuestro equipo', icono: 'fa-solid fa-users' },
]

/** Slugs antiguos del WordPress, servidos en la raíz. Se redirigen a /guias/. */
export const SLUGS_ANTIGUOS = GUIAS.map((g) => g.slug)

/** Minutos de lectura a 200 palabras por minuto. */
export const minutosLectura = (g: Guia) => Math.max(1, Math.round(g.palabras / 200))

/**
 * Pares pregunta/respuesta de una guía: cada `h2` interrogativo con el texto
 * que le sigue. Alimenta el `FAQPage`, que es lo que Google y los motores
 * generativos extraen y citan literalmente.
 */
export function preguntasDeGuia(g: Guia): Array<{ pregunta: string; respuesta: string }> {
  const pares: Array<{ pregunta: string; respuesta: string }> = []
  g.bloques.forEach((b, i) => {
    if (b.tipo !== 'h2' || !b.texto.includes('?')) return
    const respuesta = g.bloques
      .slice(i + 1)
      .filter((x, j, arr) => arr.slice(0, j).every((y) => y.tipo !== 'h2') && x.tipo !== 'h2')
      .map((x) => x.texto)
      .join(' ')
      .slice(0, 900)
    if (respuesta.length > 60) pares.push({ pregunta: b.texto, respuesta })
  })
  return pares
}
