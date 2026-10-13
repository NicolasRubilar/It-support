import { WhatsAppIcon } from './Icon'
import Icon from './Icon'
import SectionHeader from './SectionHeader'
import Picture from './Picture'
import useOpenStatus from '../hooks/useOpenStatus'
import { contacto, fotos, waLink } from '../data/content'

export default function About() {
  const abierto = useOpenStatus()

  return (
    <section className="sheet" id="nosotros" aria-labelledby="nosotros-title">
      <SectionHeader id="nosotros-title" title="Nosotros" />

      <div className="about">
        <div className="about__col">
          <div className="panel about__hours">
            <p className="about__time">8:30 a 18:00 hrs</p>
            <p>Lunes a viernes</p>
            <p className={`about__state ${abierto ? 'is-open' : ''}`}>
              <span className="led" aria-hidden="true" />
              {abierto ? 'Abierto ahora' : 'Cerrado ahora. Sábado y domingo cerrado.'}
            </p>
          </div>

          <div className="panel about__text">
            <p>
              En IT - Support entregamos servicios computacionales a tu medida. Somos un equipo
              técnico que resuelve los problemas tecnológicos de personas y empresas desde{' '}
              {contacto.desde}: te explicamos qué tiene tu equipo en palabras simples y te damos el
              presupuesto antes de repararlo.
            </p>
            <div className="about__actions">
              <a className="btn btn--whatsapp" href={waLink()} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} /> WhatsApp<span className="sr-only"> (se abre en una nueva pestaña)</span>
              </a>
              <a className="btn btn--mail" href={`mailto:${contacto.email}`}>
                <Icon name="mail" size={18} /> Correo
              </a>
            </div>
          </div>
        </div>

        <Picture
          className="about__photo"
          src={fotos.edificio}
          alt="Fachada de vidrio de un edificio de oficinas"
          width="340"
          height="420"
        />
      </div>
    </section>
  )
}
