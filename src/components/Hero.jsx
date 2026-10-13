import { useState } from 'react'
import { WhatsAppIcon } from './Icon'
import useOpenStatus from '../hooks/useOpenStatus'
import { contacto, equipos, problemas, waLink } from '../data/content'

const fecha = new Intl.DateTimeFormat('es-CL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Santiago',
}).format(new Date())

function Opciones({ name, legend, opciones, value, onChange }) {
  return (
    <fieldset className="ticket__field">
      <legend>{legend}</legend>
      <div className="ticket__options">
        {opciones.map((o) => (
          <label key={o} className="option">
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
            />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function Hero() {
  const abierto = useOpenStatus()
  const [equipo, setEquipo] = useState('')
  const [problema, setProblema] = useState('')
  const [detalle, setDetalle] = useState('')
  const [enviado, setEnviado] = useState(false)

  // Arma el mensaje con lo que se haya marcado; sin selección envía un saludo simple
  const mensaje = [
    'Hola, quiero abrir una orden de servicio.',
    equipo && `Equipo: ${equipo}`,
    problema && `Problema: ${problema}`,
    detalle.trim() && `Detalle: ${detalle.trim()}`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <section className="sheet hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="hero__welcome">Bienvenido a IT - Support</p>
        <h1 id="hero-title">Donde los problemas TI se convierten en tranquilidad.</h1>
        <p className="hero__lead">
          Reparamos, mantenemos y conectamos los computadores de hogares y oficinas desde{' '}
          {contacto.desde}. Cuéntanos qué le pasa a tu equipo y te respondemos con un diagnóstico
          y un presupuesto claro.
        </p>
        <dl className="hero__info">
          <div>
            <dt>Horario</dt>
            <dd>{contacto.horarioTexto}</dd>
          </div>
          <div>
            <dt>Correo</dt>
            <dd><a href={`mailto:${contacto.email}`} translate="no">{contacto.email}</a></dd>
          </div>
        </dl>
      </div>

      <form
        className="ticket"
        aria-labelledby="ticket-title"
        onSubmit={(e) => {
          e.preventDefault()
          window.open(waLink(mensaje), '_blank', 'noopener')
          setEnviado(true)
        }}
      >
        <header className="ticket__head">
          <h2 id="ticket-title">Orden de servicio</h2>
          <time>{fecha}</time>
        </header>
        <p className="ticket__hint">
          No necesitas saber de computadores: marca lo que ves y nosotros hacemos el resto.
          Todo es opcional.
        </p>

        <Opciones name="equipo" legend="¿Qué equipo es?" opciones={equipos} value={equipo} onChange={setEquipo} />
        <Opciones name="problema" legend="¿Qué le pasa?" opciones={problemas} value={problema} onChange={setProblema} />

        <label className="ticket__field ticket__detail">
          <span>Detalle (opcional)</span>
          <textarea
            name="detalle"
            rows="2"
            autoComplete="off"
            placeholder="Ej: hace ruido y se apaga solo…"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
        </label>

        <div className="ticket__foot">
          <p className={`ticket__status ${abierto ? 'is-open' : ''}`} role="status">
            <span className="led" aria-hidden="true" />
            {abierto
              ? 'Taller abierto: te respondemos hoy.'
              : 'Taller cerrado: te respondemos el próximo día hábil desde las 8:30.'}
          </p>
          <button type="submit" className="btn btn--brass ticket__submit">
            <WhatsAppIcon size={20} />
            Enviar orden por WhatsApp
          </button>
          <p className="ticket__sent" aria-live="polite">
            {enviado ? (
              <>
                Abrimos WhatsApp con tu orden en otra pestaña. ¿No se abrió?{' '}
                <a href={waLink(mensaje)} target="_blank" rel="noreferrer">Toca aquí para abrirlo</a>{' '}
                o escríbenos a <a href={`mailto:${contacto.email}`} translate="no">{contacto.email}</a>.
              </>
            ) : null}
          </p>
        </div>
      </form>
    </section>
  )
}
