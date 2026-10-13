import { useDeferredValue, useState } from 'react'
import Icon from './Icon'
import SectionHeader from './SectionHeader'
import Picture from './Picture'
import { fotos, servicios, waLink } from '../data/content'

const indice = servicios.map((s) => ({
  ...s,
  busqueda: [s.titulo, s.subtitulo, s.texto, ...s.tags].join(' ').toLowerCase(),
}))

export default function Services() {
  const [query, setQuery] = useState('')
  const q = useDeferredValue(query.trim().toLowerCase())
  const visibles = q ? indice.filter((s) => s.busqueda.includes(q)) : indice

  return (
    <section className="sheet" id="servicios" aria-labelledby="servicios-title">
      <SectionHeader
        id="servicios-title"
        title="Servicios"
        text="Desde una mantención preventiva hasta la red completa de tu oficina."
      >
        <label className="search">
          <Icon name="search" size={18} />
          <span className="sr-only">Buscar servicio</span>
          <input
            type="search"
            name="buscar-servicio"
            autoComplete="off"
            placeholder="Buscar… (ej: wifi, ssd)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </SectionHeader>

      {visibles.length === 0 ? (
        <p className="empty" role="status">
          No tenemos un servicio llamado “{query}” en la lista, pero puede que sí lo hagamos.{' '}
          <a href={waLink(`Hola, ¿realizan este servicio?: ${query}`)} target="_blank" rel="noreferrer">
            Pregúntanos por WhatsApp<span className="sr-only"> (se abre en una nueva pestaña)</span>
          </a>
        </p>
      ) : (
        <ul className="services">
          {visibles.map((s) => {
            const reservar = (
              <a
                className="btn btn--brass"
                href={waLink(`Hola, quiero reservar el servicio de ${s.titulo}.`)}
                target="_blank"
                rel="noreferrer"
              >
                Reservar<span className="sr-only"> {s.titulo}</span><span className="sr-only"> (se abre en una nueva pestaña)</span>
              </a>
            )
            return s.destacado ? (
              <li key={s.id} className="service service--featured">
                <Picture className="service__photo" src={fotos[s.imagen]} alt="Técnico soldando una placa madre" width="310" height="400" />
                <div className="panel service__panel">
                  <h3>{s.titulo}</h3>
                  <p className="service__sub">{s.subtitulo}</p>
                  <p>{s.texto}</p>
                  {reservar}
                </div>
              </li>
            ) : (
              <li key={s.id} className="service">
                <span className="service__icon"><Icon name={s.icono} size={24} /></span>
                <div className="service__text">
                  <h3>{s.titulo}</h3>
                  <p>{s.texto}</p>
                </div>
                {reservar}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
