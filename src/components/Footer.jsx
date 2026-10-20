import { rutas } from '../data/content'
import logoPng from '../assets/logo-blanco.png'
import logoWebp from '../assets/logo-blanco.webp'

const anio = new Date().getFullYear()

const enlaces = [
  { href: `${rutas.inicio}#servicios`, label: 'Servicios' },
  { href: `${rutas.inicio}#productos`, label: 'Productos' },
  { href: `${rutas.inicio}#faq`, label: 'Preguntas', aria: 'Preguntas frecuentes' },
  { href: rutas.orden, label: 'Consulte aquí', aria: 'Consulte aquí: completa una orden de servicio técnico' },
  { href: rutas.legal, label: 'Aviso legal' },
  { href: `${rutas.legal}#privacidad`, label: 'Privacidad', aria: 'Política de privacidad' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__bar">
        <p className="footer__brand">
          <picture className="footer__logo">
            <source srcSet={logoWebp} type="image/webp" />
            <img src={logoPng} alt="Logotipo de IT - Support, servicio técnico computacional" width="480" height="78" loading="lazy" decoding="async" />
          </picture>
          © {anio}
        </p>

        <nav className="footer__links" aria-label="Pie de página">
          {enlaces.map((e) => (
            <a key={e.label} href={e.href} aria-label={e.aria}>{e.label}</a>
          ))}
        </nav>

        <p className="footer__credit">
          Esta página fue creada por <strong>Nicolas Rubilar</strong>
        </p>
      </div>
    </footer>
  )
}
