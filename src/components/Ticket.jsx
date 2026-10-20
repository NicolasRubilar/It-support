import { useState } from 'react'
import { WhatsAppIcon } from './Icon'
import Siglas from './Siglas'
import useOpenStatus from '../hooks/useOpenStatus'
import { contacto, equipos, gmailLink, problemas, rutas, waLink } from '../data/content'

const hoy = new Date()
// AAAA-MM-DD en hora de Chile, para el atributo dateTime
const fechaIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(hoy)
const fecha = new Intl.DateTimeFormat('es-CL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Santiago',
}).format(hoy)

// Campos que llegan desde las notas de primeros auxilios (?equipo=…&problema=…&detalle=…).
// Solo se aceptan valores que existen en las opciones; el detalle se limpia de caracteres
// de control e invisibles (que podrían esconder texto) y se corta a un largo prudente.
const MAX_DETALLE = 500

function desdeUrl() {
  const params = new URLSearchParams(window.location.search)
  const valido = (lista, v) => (lista.includes(v) ? v : '')
  return {
    equipo: valido(equipos, params.get('equipo')),
    problema: valido(problemas, params.get('problema')),
    detalle: (params.get('detalle') ?? '')
      .replace(/[\p{Cc}\p{Cf}]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 200),
  }
}

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
            <span><Siglas texto={o} /></span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function Ticket() {
  const abierto = useOpenStatus()
  const [inicial] = useState(desdeUrl)
  const [equipo, setEquipo] = useState(inicial.equipo)
  const [problema, setProblema] = useState(inicial.problema)
  const [detalle, setDetalle] = useState(inicial.detalle)
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
        <time dateTime={fechaIso}>{fecha}</time>
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
          rows="3"
          autoComplete="off"
          maxLength={MAX_DETALLE}
          placeholder="Ej: hace ruido y se apaga solo…"
          value={detalle}
          onChange={(e) => setDetalle(e.target.value.slice(0, MAX_DETALLE))}
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
        <p className="ticket__legal">
          Tus datos solo se usan para responder tu consulta.{' '}
          <a href={`${rutas.legal}#privacidad`}>Política de privacidad</a>
        </p>
        <p className="ticket__sent" aria-live="polite">
          {enviado ? (
            <>
              Abrimos WhatsApp con tu orden en otra pestaña. ¿No se abrió?{' '}
              <a href={waLink(mensaje)} target="_blank" rel="noreferrer" aria-label="Toca aquí para abrir tu orden en WhatsApp (se abre en una nueva pestaña)">
                Toca aquí para abrirlo
              </a>{' '}
              o escríbenos a <a href={gmailLink('Orden de servicio')} target="_blank" rel="noreferrer" translate="no">
                {contacto.email}<span className="sr-only"> (se abre en una nueva pestaña)</span>
              </a>.
            </>
          ) : null}
        </p>
      </div>
    </form>
  )
}
