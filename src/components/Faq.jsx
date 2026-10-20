import Icon, { WhatsAppIcon } from './Icon'
import SectionHeader from './SectionHeader'
import { faq, rutas, waLink } from '../data/content'

export default function Faq() {
  return (
    <section className="sheet" id="faq" aria-labelledby="faq-title">
      <SectionHeader id="faq-title" title="Preguntas frecuentes" />
      <div className="faq-layout">
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>

        <aside className="panel faq__aside" aria-labelledby="faq-aside-title">
          <h3 id="faq-aside-title">¿No encontraste tu respuesta?</h3>
          <p>Cuéntanos tu caso y te respondemos en palabras simples, sin compromiso.</p>
          <a className="btn btn--brass" href={rutas.orden} aria-label="Consulte aquí: completa una orden de servicio técnico">
            Consulte aquí
            <Icon name="arrow" size={18} />
          </a>
          <a className="faq__aside-link" href={waLink('Hola, tengo una pregunta.')} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} />
            O escríbenos por WhatsApp<span className="sr-only"> (se abre en una nueva pestaña)</span>
          </a>
        </aside>
      </div>
    </section>
  )
}
