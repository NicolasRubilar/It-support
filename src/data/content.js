// Contenido del sitio. Los datos marcados con TODO deben confirmarse con el cliente.
import mantencionJpg from '../assets/mantencion.jpg'
import mantencionWebp from '../assets/mantencion.webp'
import mantencionAvif from '../assets/mantencion.avif'
import edificioJpg from '../assets/edificio.jpg'
import edificioWebp from '../assets/edificio.webp'
import edificioAvif from '../assets/edificio.avif'

export const fotos = {
  mantencion: { jpg: mantencionJpg, webp: mantencionWebp, avif: mantencionAvif },
  edificio: { jpg: edificioJpg, webp: edificioWebp, avif: edificioAvif },
}

export const contacto = {
  email: 'info@it-support.cl',
  whatsapp: '56934504901',
  telefono: '+56 9 3450 4901',
  horarioTexto: 'Lunes a viernes, de 8:30 a 18:00',
  // Horario en hora de Chile: días 1-5 = lunes a viernes, minutos desde medianoche
  horario: { dias: [1, 2, 3, 4, 5], abre: 8 * 60 + 30, cierra: 18 * 60 },
  desde: 2019,
}

// Datos del titular para la página legal. Los que queden vacíos no se muestran.
// TODO: completar con el cliente (razón social, RUT y domicilio comercial)
export const titular = {
  nombre: 'IT - Support',
  razonSocial: '',
  rut: '',
  domicilio: '',
  actualizado: '19 de octubre de 2026',
}

// Siglas y tecnicismos: <Siglas> los envuelve en <abbr title> para el tooltip y los lectores de pantalla
export const siglas = {
  SSD: 'Unidad de estado sólido: disco sin piezas móviles, mucho más rápido que un disco duro',
  RAM: 'Memoria de acceso aleatorio: la memoria de trabajo del computador',
  UPS: 'Sistema de alimentación ininterrumpida: respaldo de energía ante cortes de luz',
  HDMI: 'Interfaz multimedia de alta definición: cable para conectar pantallas',
  USB: 'Bus universal en serie: el conector estándar para accesorios',
  PC: 'Computador personal',
  'Wi-Fi': 'Red inalámbrica de internet',
}

export const waLink = (texto = '') =>
  `https://wa.me/${contacto.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`

// El correo se redacta en Gmail web (en vez de abrir Outlook u otro programa de correo del equipo)
export const gmailLink = (asunto = '') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${contacto.email}${asunto ? `&su=${encodeURIComponent(asunto)}` : ''}`

// Rutas del sitio: el inicio, la orden de servicio y los avisos legales
export const rutas = {
  inicio: import.meta.env.BASE_URL,
  orden: `${import.meta.env.BASE_URL}orden/`,
  legal: `${import.meta.env.BASE_URL}legal/`,
}

// Enlace a la orden con campos ya marcados (los lee Ticket.jsx desde la URL)
export const ordenLink = ({ equipo, problema, detalle } = {}) => {
  const params = new URLSearchParams()
  if (equipo) params.set('equipo', equipo)
  if (problema) params.set('problema', problema)
  if (detalle) params.set('detalle', detalle)
  const query = params.toString()
  return query ? `${rutas.orden}?${query}` : rutas.orden
}

// Primeros auxilios: pasos seguros que cualquier persona puede probar antes de escribirnos.
// `orden` precarga la orden de servicio si los pasos no funcionan.
export const sintomas = [
  {
    id: 'no-prende',
    icono: 'power',
    titulo: 'No prende',
    orden: { problema: 'No enciende' },
    pasos: [
      'Prueba el enchufe con otro aparato, como un cargador de celular o una lámpara.',
      'Si es notebook, conecta el cargador y espera 10 minutos antes de encenderlo.',
      'Mantén apretado el botón de encendido 15 segundos, suéltalo e intenta prenderlo de nuevo.',
    ],
  },
  {
    id: 'lento',
    icono: 'gauge',
    titulo: 'Está muy lento',
    orden: { problema: 'Está lento' },
    pasos: [
      'Reinícialo desde el menú Inicio. Cerrar la tapa del notebook no cuenta.',
      'Cierra los programas y pestañas del navegador que no estés usando.',
      'Revisa que el disco tenga espacio libre: si está casi lleno, todo se pone lento.',
    ],
  },
  {
    id: 'internet',
    icono: 'wifiOff',
    titulo: 'No tengo internet',
    orden: { equipo: 'Internet o Wi-Fi', problema: 'Sin internet' },
    pasos: [
      'Desenchufa el router o módem, espera 30 segundos y vuelve a enchufarlo.',
      'Mira si el celular u otro equipo sí tiene internet: así sabes si el problema es del computador.',
      'Acércate al router o, si puedes, conéctate con un cable.',
    ],
  },
  {
    id: 'virus',
    icono: 'bug',
    titulo: 'Virus o publicidad rara',
    orden: { problema: 'Virus o publicidad' },
    pasos: [
      'No escribas contraseñas ni datos del banco hasta revisarlo.',
      'Desinstala los programas que no reconozcas o que no instalaste tú.',
      'Haz un análisis completo con tu antivirus. El que viene con Windows sirve.',
    ],
  },
  {
    id: 'impresora',
    icono: 'printer',
    titulo: 'La impresora no imprime',
    orden: { equipo: 'Impresora', detalle: 'La impresora no imprime.' },
    pasos: [
      'Revisa que tenga papel, tinta o tóner, y que no tenga luces de error encendidas.',
      'Apágala, espera un minuto y vuelve a prenderla.',
      'En el computador, cancela los documentos que quedaron atascados en la cola de impresión.',
    ],
  },
  {
    id: 'mojado',
    icono: 'droplet',
    titulo: 'Se mojó o se cayó',
    urgente: true,
    orden: { detalle: 'Se mojó o se cayó.' },
    pasos: [
      'Apágalo y desconéctalo de inmediato, aunque parezca que funciona.',
      'No intentes prenderlo ni lo seques con secador de pelo.',
      'Escríbenos lo antes posible: mientras antes lo revisemos, más se puede salvar.',
    ],
  },
]

// Opciones de la orden de servicio
export const equipos = ['Notebook', 'PC de escritorio', 'Impresora', 'Internet o Wi-Fi', 'Otro', 'No sé']

export const problemas = [
  'No enciende',
  'Está lento',
  'Virus o publicidad',
  'Sin internet',
  'Pantalla o teclado',
  'Necesito insumos',
  'No sé, algo anda mal',
]

export const servicios = [
  {
    id: 'mantencion',
    icono: 'wrench',
    titulo: 'Mantención',
    destacado: true,
    imagen: 'mantencion',
    imagenAlt: 'Técnico en reparación de computadores soldando componentes de una placa madre durante una mantención',
    subtitulo: 'Diagnóstico certero, reparación experta.',
    texto: 'Limpiamos tu computador por dentro y lo dejamos rápido y sin ruidos, como el primer día.',
    incluye: ['Limpieza interna', 'Pasta térmica', 'Optimización'],
    tags: ['Preventivo', 'Notebooks', 'PC'],
  },
  {
    id: 'reparacion',
    icono: 'cpu',
    titulo: 'Reparaciones',
    texto: '¿No prende, se apaga solo o se rompió la pantalla? Encontramos la falla y la reparamos (placas, pantallas, fuentes de poder).',
    tags: ['Diagnóstico', 'Componentes', 'No enciende', 'Pantalla'],
  },
  {
    id: 'redes',
    icono: 'network',
    titulo: 'Internet y redes',
    texto: 'Que el Wi-Fi llegue a toda la casa u oficina y que todos los equipos se conecten bien (cableado, routers y switches).',
    tags: ['Wi-Fi', 'Cableado', 'Oficinas', 'Conectividad', 'Router', 'Switch', 'Internet lento'],
  },
  {
    id: 'software',
    icono: 'code',
    titulo: 'Software',
    texto: 'Instalamos Windows, Office y antivirus, sacamos virus y publicidad molesta, y respaldamos o recuperamos tus archivos.',
    tags: ['Windows', 'Antivirus', 'Respaldos', 'Office', 'Virus', 'Formateo'],
  },
  {
    id: 'hardware',
    icono: 'monitor',
    titulo: 'Mejorar o armar un equipo',
    texto: 'Hacemos más rápido tu computador cambiando piezas, o armamos uno nuevo según lo que necesitas y tu presupuesto (discos SSD, memoria RAM).',
    tags: ['SSD', 'RAM', 'Upgrades', 'Hardware', 'Armado'],
  },
  {
    id: 'empresas',
    icono: 'building',
    titulo: 'Soporte a empresas',
    texto: 'Nos hacemos cargo de los computadores y la red de tu negocio, con visitas periódicas y ayuda cuando algo falla.',
    tags: ['Empresas', 'Planes'],
  },
]

export const pasos = [
  { titulo: 'Nos contactas', texto: 'Escríbenos por WhatsApp o correo y cuéntanos qué está pasando.' },
  { titulo: 'Diagnóstico', texto: 'Revisamos el equipo y te explicamos el problema en palabras simples.' },
  { titulo: 'Presupuesto', texto: 'Te enviamos un presupuesto claro. Sin sorpresas ni cobros ocultos.' },
  { titulo: 'Entrega', texto: 'Reparamos, probamos y te entregamos tu equipo funcionando.' },
]

export const productos = {
  Insumos: [
    { icono: 'printer', nombre: 'Tóner y cartuchos', detalle: 'Originales y alternativos' },
    { icono: 'file', nombre: 'Papelería', detalle: 'Resmas y etiquetas' },
    { icono: 'cable', nombre: 'Cables', detalle: 'HDMI, red, poder, USB' },
    { icono: 'battery', nombre: 'Energía', detalle: 'Zapatillas y respaldo de energía (UPS)' },
  ],
  Accesorios: [
    { icono: 'mouse', nombre: 'Mouse y teclados', detalle: 'Alámbricos e inalámbricos' },
    { icono: 'headphones', nombre: 'Audio', detalle: 'Audífonos y parlantes' },
    { icono: 'camera', nombre: 'Webcams', detalle: 'Para reuniones online' },
    { icono: 'usb', nombre: 'Almacenamiento', detalle: 'Pendrives y discos externos' },
  ],
  Hardware: [
    { icono: 'laptop', nombre: 'Notebooks', detalle: 'Hogar y oficina' },
    { icono: 'monitor', nombre: 'PC de escritorio', detalle: 'Armados a medida' },
    { icono: 'hdd', nombre: 'Discos SSD', detalle: 'Hacen tu computador mucho más rápido' },
    { icono: 'cpu', nombre: 'Memorias RAM', detalle: 'Para abrir más programas sin que se pegue' },
  ],
}

// TODO: validar respuestas con el cliente
export const faq = [
  {
    q: 'No sé nada de computadores, ¿me pueden ayudar?',
    a: 'Sí, para eso estamos. Solo cuéntanos qué ves (por ejemplo: "no prende" o "está muy lento") y nosotros nos encargamos. Te explicamos todo sin palabras técnicas.',
  },
  {
    q: '¿Cuánto demora una reparación?',
    a: 'Depende del problema. Tras el diagnóstico te indicamos un plazo estimado antes de comenzar cualquier trabajo.',
  },
  {
    q: '¿Atienden a empresas?',
    a: 'Sí. Trabajamos tanto con personas como con empresas, y podemos coordinar mantenciones periódicas para tu oficina.',
  },
  {
    q: '¿Puedo cotizar sin compromiso?',
    a: 'Claro. Escríbenos por WhatsApp o correo con el detalle y te respondemos con una cotización.',
  },
  {
    q: '¿Qué pasa con mis archivos?',
    a: 'Tu información es prioridad. Si el trabajo lo requiere, te ofrecemos respaldar tus datos antes de intervenir el equipo.',
  },
  {
    q: '¿Cuál es el horario de atención?',
    a: `${contacto.horarioTexto}. Sábado y domingo cerrado.`,
  },
]
