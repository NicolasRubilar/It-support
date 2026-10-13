import { contacto } from '../data/content'

const anio = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {anio} IT - Support. Escríbenos a{' '}
        <a href={`mailto:${contacto.email}`} translate="no">{contacto.email}</a>
      </p>
    </footer>
  )
}
