import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon from './Icon'

const links = [
  { id: 'inicio', label: 'Contáctanos' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'productos', label: 'Productos' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'faq', label: 'Preguntas' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activo, setActivo] = useState(links[0].id)
  const menuRef = useRef(null)
  const pillRef = useRef(null)
  // Tras un clic, el scroll suave pasa por otras secciones: se ignora el scroll-spy un momento
  const bloqueo = useRef(0)

  // Posiciones de cada enlace, medidas solo cuando el layout cambia
  const posiciones = useRef(new Map())
  const activoRef = useRef(activo)

  // Solo escribe estilos (nunca lee el layout), así no fuerza un reflow
  const ubicar = useCallback(() => {
    const pill = pillRef.current
    const pos = posiciones.current.get(activoRef.current)
    if (!pill || !pos || !pos.w) return
    pill.style.width = `${pos.w}px`
    pill.style.height = `${pos.h}px`
    pill.style.translate = `${pos.x}px ${pos.y}px`
    // La primera ubicación es instantánea; desde ahí la píldora se desliza
    if (!('ready' in pill.dataset)) requestAnimationFrame(() => (pill.dataset.ready = ''))
  }, [])

  // ResizeObserver entrega el aviso después del layout: leer ahí no cuesta un reflow extra
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const links = [...menu.querySelectorAll('[data-id]')]
    const ro = new ResizeObserver(() => {
      for (const l of links) {
        posiciones.current.set(l.dataset.id, { x: l.offsetLeft, y: l.offsetTop, w: l.offsetWidth, h: l.offsetHeight })
      }
      ubicar()
    })
    ro.observe(menu)
    links.forEach((l) => ro.observe(l))
    return () => ro.disconnect()
  }, [ubicar])

  useLayoutEffect(() => {
    activoRef.current = activo
    ubicar()
  }, [activo, ubicar])

  // Scroll-spy: activa la sección que ocupa el centro de la pantalla
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < bloqueo.current) return
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActivo(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const elegir = (id) => {
    bloqueo.current = Date.now() + 900
    setActivo(id)
    setOpen(false)
  }

  return (
    <header className={`nav ${open ? 'nav--open' : ''}`}>
      <div className="nav__bar">
        <a href="#inicio" className="logo" aria-label="IT - Support, ir al inicio" onClick={() => elegir('inicio')}>
          IT - Support
        </a>

        <nav className="nav__menu" id="menu" aria-label="Principal" ref={menuRef}>
          <span className="nav__pill" ref={pillRef} aria-hidden="true" />
          {links.map((l) => (
            <a
              key={l.id}
              data-id={l.id}
              href={`#${l.id}`}
              className={`nav__link ${activo === l.id ? 'is-active' : ''}`}
              aria-current={activo === l.id ? 'location' : undefined}
              onClick={() => elegir(l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}
