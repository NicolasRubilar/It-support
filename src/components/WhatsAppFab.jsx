import { useEffect, useState } from 'react'
import { WhatsAppIcon } from './Icon'
import { waLink } from '../data/content'

export default function WhatsAppFab() {
  // Mientras se ve el inicio no hace falta: la orden de servicio ya tiene su botón de WhatsApp
  const [oculto, setOculto] = useState(true)

  useEffect(() => {
    const inicio = document.getElementById('inicio')
    if (!inicio) return
    const io = new IntersectionObserver(([e]) => setOculto(e.isIntersecting), { threshold: 0.15 })
    io.observe(inicio)
    return () => io.disconnect()
  }, [])

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
