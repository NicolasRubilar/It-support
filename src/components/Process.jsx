import SectionHeader from './SectionHeader'
import { pasos } from '../data/content'

export default function Process() {
  return (
    <section className="sheet sheet--ink" id="proceso" aria-labelledby="proceso-title">
      <SectionHeader id="proceso-title" title="Así trabajamos" text="Sin sorpresas: sabes qué tiene tu equipo y cuánto cuesta antes de que lo toquemos." />
      <ol className="steps">
        {pasos.map((p, i) => (
          <li className="step" key={p.titulo}>
            <span className="step__num" aria-hidden="true">{i + 1}</span>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
