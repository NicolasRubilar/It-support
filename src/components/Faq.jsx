import SectionHeader from './SectionHeader'
import { faq } from '../data/content'

export default function Faq() {
  return (
    <section className="sheet" id="faq" aria-labelledby="faq-title">
      <SectionHeader id="faq-title" title="Preguntas frecuentes" />
      <div className="faq">
        {faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
