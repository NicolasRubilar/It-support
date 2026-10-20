import Navbar from './components/Navbar'
import Ticket from './components/Ticket'
import Icon from './components/Icon'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import { contacto, gmailLink, pasos, rutas } from './data/content'

export default function OrdenPage() {
  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Navbar pagina="orden" />
      <main id="contenido" className="page">
        <section className="sheet orden" id="orden" aria-labelledby="orden-title">
          <div className="orden__copy">
            <a className="orden__back" href={rutas.inicio}>
              <Icon name="back" size={18} />
              Volver al inicio
            </a>
            <h1 id="orden-title">Cuéntanos qué le pasa a tu equipo.</h1>
            <p className="hero__lead">
              Llena la orden en menos de un minuto y te llega a WhatsApp lista para enviar. Te
              respondemos con un diagnóstico y un presupuesto claro, sin compromiso.
            </p>

            <ol className="orden__steps">
              {pasos.map((p, i) => (
                <li key={p.titulo}>
                  <span aria-hidden="true">{i + 1}</span>
                  <div>
                    <strong>{p.titulo}</strong>
                    <p>{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>

            <dl className="hero__info">
              <div>
                <dt>Horario</dt>
                <dd>{contacto.horarioTexto}</dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd>
                  <a href={gmailLink('Consulta desde la página web')} target="_blank" rel="noreferrer" translate="no">
                    {contacto.email}<span className="sr-only"> (se abre en una nueva pestaña)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <Ticket />
        </section>
      </main>
      <Footer />
      <WhatsAppFab ocultarEn="orden" />
    </>
  )
}
