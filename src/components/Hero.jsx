import { useRef } from 'react'
import Icon from './Icon'
import CableMouse from './CableMouse'
import { contacto, gmailLink, rutas } from '../data/content'

export default function Hero() {
  const cable = useRef(null)

  return (
    <section className="sheet hero" id="inicio" aria-labelledby="hero-title">
      {/* Al pasar el mouse por el nombre, el mouse del logo lo vuelve a subrayar */}
      <div className="hero__mark" onPointerEnter={(e) => e.pointerType === 'mouse' && cable.current?.animar()}>
        <h1 id="hero-title" className="hero__brand">
          <span translate="no">IT - Support</span>
          <span className="sr-only">: servicio técnico computacional, redes y soporte</span>
        </h1>
        <CableMouse ref={cable} />
      </div>

      <div className="hero__body">
        <p className="hero__tagline">Servicios Computacionales a tu Medida.</p>

        <div className="hero__side">
          <p className="hero__lead">
            Nos especializamos en soporte técnico, infraestructura, redes y servicios computacionales personalizados,
            ofreciendo un servicio confiable, eficiente y alineado con los objetivos de cada organización.
          </p>

          <div className="hero__actions">
            <a className="btn btn--brass" href={rutas.orden} aria-label="Consulte aquí: completa una orden de servicio técnico">
              Consulte aquí
              <Icon name="arrow" size={18} />
            </a>
            <a className="btn btn--ghost" href="#ayuda" title="Ir a la ayuda rápida con primeros pasos para fallas comunes">
              ¿Qué le pasa a tu equipo?
            </a>
          </div>

          <dl className="hero__info">
            <div>
              <dt>Horario</dt>
              <dd>{contacto.horarioTexto}</dd>
            </div>
            <div>
              <dt>Correo</dt>
              <dd>
                <a href={gmailLink('Consulta desde la página web')} target="_blank" rel="noreferrer" translate="no">
                  {contacto.email}<span className="sr-only"> (se abre en una nueva pestaña)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
