import { useState } from 'react'
import Icon from './Icon'
import SectionHeader from './SectionHeader'
import { productos, waLink } from '../data/content'

const categorias = Object.keys(productos)
const slug = (c) => c.toLowerCase()

// La categoría activa vive en la URL (?productos=accesorios) para poder compartirla
function categoriaDesdeUrl() {
  const valor = new URLSearchParams(window.location.search).get('productos')
  return categorias.find((c) => slug(c) === valor) ?? categorias[0]
}

export default function Products() {
  const [activa, setActiva] = useState(categoriaDesdeUrl)

  const elegir = (c) => {
    setActiva(c)
    const url = new URL(window.location.href)
    url.searchParams.set('productos', slug(c))
    window.history.replaceState(null, '', url)
  }

  // Flechas izquierda/derecha entre pestañas, como en un tablist nativo
  const onKeyDown = (e) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    const i = (categorias.indexOf(activa) + dir + categorias.length) % categorias.length
    elegir(categorias[i])
    document.getElementById(`tab-${slug(categorias[i])}`)?.focus()
  }

  return (
    <section className="sheet" id="productos" aria-labelledby="productos-title">
      <SectionHeader
        id="productos-title"
        title="Productos"
        text="Insumos, accesorios y hardware. Consulta stock y precio directo con nosotros."
      >
        <div className="tabs" role="tablist" aria-label="Categorías de productos" onKeyDown={onKeyDown}>
          {categorias.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              id={`tab-${slug(c)}`}
              aria-selected={activa === c}
              aria-controls="panel-productos"
              tabIndex={activa === c ? 0 : -1}
              className="tab"
              onClick={() => elegir(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </SectionHeader>

      <div id="panel-productos" role="tabpanel" aria-labelledby={`tab-${slug(activa)}`}>
        <ul className="products">
          {productos[activa].map((p) => (
            <li className="panel product" key={`${activa}-${p.nombre}`}>
              <span className="product__icon"><Icon name={p.icono} size={34} /></span>
              <div>
                <h3>{p.nombre}</h3>
                <p>{p.detalle}</p>
                <a
                  className="product__link"
                  href={waLink(`Hola, quiero consultar por: ${p.nombre}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultar stock<span className="sr-only"> de {p.nombre} (se abre en una nueva pestaña)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
