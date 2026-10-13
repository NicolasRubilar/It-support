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
  email: 'ventas@it-support.cl',
  whatsapp: '56900000000', // TODO: número real
  horarioTexto: 'Lunes a viernes, de 8:30 a 18:00',
  // Horario en hora de Chile: días 1-5 = lunes a viernes, minutos desde medianoche
  horario: { dias: [1, 2, 3, 4, 5], abre: 8 * 60 + 30, cierra: 18 * 60 },
  desde: 2019,
}

export const waLink = (texto = '') =>
  `https://wa.me/${contacto.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`

// Opciones de la orden de servicio del hero
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
    subtitulo: 'Diagnóstico certero, reparación experta.',
    texto: 'Limpiamos tu computador por dentro y lo dejamos rápido y sin ruidos, como el primer día (limpieza interna, pasta térmica y optimización).',
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
