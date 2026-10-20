import { useEffect, useState } from 'react'
import { WhatsAppIcon } from './Icon'
import { waLink } from '../data/content'

// Se oculta mientras se ve `ocultarEn`: el hero ya invita a consultar y la orden tiene su propio botón
export default function WhatsAppFab({ ocultarEn = 'inicio' }) {
  const [oculto, setOculto] = useState(true)

  useEffect(() => {
    const seccion = document.getElementById(ocultarEn)
    if (!seccion) return
    const io = new IntersectionObserver(([e]) => setOculto(e.isIntersecting), { threshold: 0.15 })
    io.observe(seccion)
    return () => io.disconnect()
  }, [ocultarEn])

  return (
    <a
      className={`fab ${oculto ? 'fab--hidden' : ''}`}
      href={waLink('Hola, vengo desde la página web.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp (se abre en una nueva pestaña)"
      aria-hidden={oculto || undefined}
      tabIndex={oculto ? -1 : undefined}
    >
      <WhatsAppIcon size={26} />
    </a>
  )
}
