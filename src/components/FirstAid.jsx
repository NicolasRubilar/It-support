import { useState } from 'react'
import Icon, { WhatsAppIcon } from './Icon'
import SectionHeader from './SectionHeader'
import useOpenStatus from '../hooks/useOpenStatus'
import { ordenLink, sintomas, waLink } from '../data/content'

export default function FirstAid() {
  const abierto = useOpenStatus()
  const [id, setId] = useState('')
  const sintoma = sintomas.find((s) => s.id === id)

  return (
    <section className="sheet" id="ayuda" aria-labelledby="ayuda-title">
      <SectionHeader
        id="ayuda-title"
        title="¿Qué le pasó a tu computador?"
        text="Elige lo que le pasa y te decimos qué probar primero. Muchas veces se arregla en dos minutos. Si no, lo reparamos nosotros."
      />

      <div className="aid">
        <fieldset className="symptoms">
          <legend className="sr-only">¿Qué le pasa a tu equipo?</legend>
          <div className="symptoms__grid">
            {sintomas.map((s) => (
              <label key={s.id} className={`symptom ${s.urgente ? 'symptom--urgent' : ''}`}>
                <input
                  type="radio"
                  name="sintoma"
                  value={s.id}
                  checked={id === s.id}
                  onChange={() => setId(s.id)}
                />
                <span className="symptom__face">
                  <Icon name={s.icono} size={26} />
                  {s.titulo}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="note-slot" aria-live="polite">
          {sintoma ? (
            <article key={sintoma.id} className={`note ${sintoma.urgente ? 'note--urgent' : ''}`}>
              <h3 className="note__title">
                {sintoma.urgente ? 'Haz esto ahora' : 'Prueba esto primero'}
              </h3>
              <p className="note__for">{sintoma.titulo}</p>
              <ol className="note__steps">
                {sintoma.pasos.map((p) => <li key={p}>{p}</li>)}
              </ol>
              <div className="note__help">
                <p>{sintoma.urgente ? '¿Ya lo apagaste? Escríbenos ahora.' : '¿Seguiste los pasos y sigue igual?'}</p>
                <a
                  className="btn btn--whatsapp"
                  href={waLink(`Hola, mi equipo: ${sintoma.titulo.toLowerCase()}. Ya probé los primeros pasos de la página y sigue igual.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon size={20} />
                  Pedir ayuda por WhatsApp
                  <span className="sr-only"> (se abre en una nueva pestaña)</span>
                </a>
                <a className="note__alt" href={ordenLink(sintoma.orden)}>
                  O deja una orden de servicio
                  <Icon name="arrow" size={16} />
                </a>
              </div>
            </article>
          ) : (
            <div className="note note--empty">
              <Icon name="help" size={34} />
              <p>Elige una opción y aquí aparecerán los primeros pasos para tu caso.</p>
              <p className="note__other">
                ¿Es otra cosa?{' '}
                <a href={waLink('Hola, tengo un problema con mi equipo.')} target="_blank" rel="noreferrer">
                  Cuéntanos por WhatsApp<span className="sr-only"> (se abre en una nueva pestaña)</span>
                </a>
              </p>
            </div>
          )}
          <p className={`ticket__status ${abierto ? 'is-open' : ''}`}>
            <span className="led" aria-hidden="true" />
            {abierto ? 'Estamos atendiendo ahora.' : 'Ahora estamos cerrados: te respondemos el próximo día hábil desde las 8:30.'}
          </p>
        </div>
      </div>
    </section>
  )
}
