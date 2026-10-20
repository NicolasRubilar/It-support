import { useDeferredValue, useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import SectionHeader from './SectionHeader'
import Picture from './Picture'
import Siglas from './Siglas'
import { fotos, servicios, waLink } from '../data/content'

// Sin tildes ni mayúsculas: "mantencion" encuentra "Mantención".
// Se normaliza letra por letra para que los índices coincidan con el texto original.
const normalizar = (t) =>
  [...t].map((c) => c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()[0] ?? '').join('')

const sugerencias = ['Wi-Fi', 'Virus', 'SSD', 'Empresas']
const MAX = 60

const indice = servicios.map((s) => ({
  ...s,
  busqueda: normalizar([s.titulo, s.subtitulo, s.texto, ...s.tags, ...(s.incluye ?? [])].join(' ')),
}))

// Marca la coincidencia dentro del texto visible (React escapa el contenido)
function Resaltar({ texto, q }) {
  const i = q ? normalizar(texto).indexOf(q) : -1
  if (i < 0) return <Siglas texto={texto} />
  return (
    <>
      <Siglas texto={texto.slice(0, i)} />
      <mark><Siglas texto={texto.slice(i, i + q.length)} /></mark>
      <Siglas texto={texto.slice(i + q.length)} />
    </>
  )
}

export default function Services() {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const q = useDeferredValue(normalizar(query.trim()))
  const visibles = q ? indice.filter((s) => s.busqueda.includes(q)) : indice

  // Atajo "/" para ir al buscador, como en los sitios de documentación
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return
      const t = e.target
      if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const limpiar = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <section className="sheet" id="servicios" aria-labelledby="servicios-title">
      <SectionHeader
        id="servicios-title"
        title="Servicios"
        text="Desde una mantención preventiva hasta la red completa de tu oficina."
      >
        <div className="finder" role="search">
          <label className="search">
            <Icon name="search" size={18} />
            <span className="sr-only">Buscar servicio</span>
            <input
              ref={inputRef}
              type="search"
              name="buscar-servicio"
              autoComplete="off"
              spellCheck="false"
              enterKeyHint="search"
              maxLength={MAX}
              placeholder="Busca un servicio: wifi, virus, ssd…"
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, MAX))}
              onKeyDown={(e) => e.key === 'Escape' && query && (e.preventDefault(), setQuery(''))}
            />
            {query ? (
              <button type="button" className="search__clear" aria-label="Borrar búsqueda" onClick={limpiar}>
                <Icon name="close" size={16} />
              </button>
            ) : (
              <kbd className="search__kbd" aria-hidden="true">/</kbd>
            )}
          </label>

          <div className="finder__chips" role="group" aria-label="Búsquedas frecuentes">
            {sugerencias.map((sug) => {
              const activa = normalizar(sug) === q
              return (
                <button
                  key={sug}
                  type="button"
                  className="chip"
                  aria-pressed={activa}
                  onClick={() => setQuery(activa ? '' : sug)}
                >
                  {sug}
                </button>
              )
            })}
          </div>
        </div>
      </SectionHeader>

      <p className={`finder__status ${q ? '' : 'sr-only'}`} role="status">
        {q
          ? `${visibles.length} ${visibles.length === 1 ? 'servicio coincide' : 'servicios coinciden'} con “${query.trim()}”`
          : ''}
      </p>

      {visibles.length === 0 ? (
        <p className="empty">
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
                className={`btn ${s.destacado ? 'btn--brass' : 'btn--ghost'}`}
                href={waLink(`Hola, quiero reservar el servicio de ${s.titulo}.`)}
                target="_blank"
                rel="noreferrer"
              >
                Reservar<span className="sr-only"> {s.titulo}</span><span className="sr-only"> (se abre en una nueva pestaña)</span>
              </a>
            )
            return s.destacado ? (
              <li key={s.id} className="service service--featured panel">
                <Picture className="service__photo" src={fotos[s.imagen]} alt={s.imagenAlt} width="310" height="400" />
                <div className="service__panel">
                  <p className="service__eyebrow">
                    <Icon name={s.icono} size={16} />
                    Servicio más pedido
                  </p>
                  <h3><Resaltar texto={s.titulo} q={q} /></h3>
                  <p className="service__sub">{s.subtitulo}</p>
                  <p><Resaltar texto={s.texto} q={q} /></p>
                  <ul className="service__includes" aria-label="Incluye">
                    {s.incluye.map((i) => (
                      <li key={i}><Icon name="check" size={16} />{i}</li>
                    ))}
                  </ul>
                  {reservar}
                </div>
              </li>
            ) : (
              <li key={s.id} className="service">
                <span className="service__icon"><Icon name={s.icono} size={24} /></span>
                <div className="service__text">
                  <h3><Resaltar texto={s.titulo} q={q} /></h3>
                  <p><Resaltar texto={s.texto} q={q} /></p>
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
