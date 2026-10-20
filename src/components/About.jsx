import { WhatsAppIcon } from './Icon'
import Icon from './Icon'
import SectionHeader from './SectionHeader'
import Picture from './Picture'
import useOpenStatus from '../hooks/useOpenStatus'
import { contacto, fotos, gmailLink, waLink } from '../data/content'

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
              Con más de 10 años de experiencia en el sector tecnológico, 
              entregamos soluciones informáticas integrales orientadas a optimizar la operaciónes 
              y productividad de nuestros clientes.
              {' '} Servicios computacionalesa su medida, con el respaldo, la experiencia y el compromiso que su empresa necesita.
  
            </p>
            <div className="about__actions">
              <a
                className="btn btn--whatsapp"
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp: escríbenos para cotizar un servicio (se abre en una nueva pestaña)"
              >
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
              <a
                className="btn btn--mail"
                href={gmailLink('Consulta desde la página web')}
                target="_blank"
                rel="noreferrer"
                aria-label={`Correo: escríbenos a ${contacto.email} por Gmail (se abre en una nueva pestaña)`}
              >
                <Icon name="mail" size={18} /> Correo
              </a>
            </div>
          </div>
        </div>

        <Picture
          className="about__photo"
          src={fotos.edificio}
          alt="Edificio corporativo de oficinas con fachada de vidrio, donde brindamos soporte técnico y redes para empresas"
          width="340"
          height="420"
        />
      </div>
    </section>
  )
}
