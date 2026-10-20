import Navbar from './components/Navbar'
import Icon from './components/Icon'
import Footer from './components/Footer'
import { contacto, gmailLink, rutas, titular } from './data/content'

const indice = [
  { id: 'aviso-legal', label: 'Aviso legal' },
  { id: 'privacidad', label: 'Política de privacidad' },
  { id: 'cookies', label: 'Cookies' },
]

function Correo() {
  return (
    <a href={gmailLink('Datos personales')} target="_blank" rel="noreferrer" translate="no">
      {contacto.email}<span className="sr-only"> (se abre en una nueva pestaña)</span>
    </a>
  )
}

export default function LegalPage() {
  const datos = [
    ['Nombre comercial', titular.nombre],
    ['Razón social', titular.razonSocial],
    ['RUT', titular.rut],
    ['Domicilio', titular.domicilio],
    ['Correo', <Correo key="correo" />],
    ['Teléfono y WhatsApp', contacto.telefono],
  ].filter(([, v]) => v)

  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Navbar pagina="legal" />
      <main id="contenido" className="page">
        <article className="sheet legal" aria-labelledby="legal-title">
          <header className="legal__head">
            <a className="orden__back" href={rutas.inicio}>
              <Icon name="back" size={18} />
              Volver al inicio
            </a>
            <h1 id="legal-title">Aviso legal y política de privacidad</h1>
            <p className="legal__date">Última actualización: {titular.actualizado}</p>
            <nav aria-label="Contenido de la página">
              <ul className="legal__toc">
                {indice.map((i) => (
                  <li key={i.id}><a href={`#${i.id}`}>{i.label}</a></li>
                ))}
              </ul>
            </nav>
          </header>

          <section id="aviso-legal" aria-labelledby="aviso-legal-title">
            <h2 id="aviso-legal-title">Aviso legal</h2>

            <h3>Titular del sitio</h3>
            <dl className="legal__data">
              {datos.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <h3>Uso del sitio</h3>
            <p>
              Este sitio informa sobre los servicios computacionales y productos de {titular.nombre}. Al
              usarlo aceptas estas condiciones. Las consultas y órdenes de servicio enviadas desde la
              página no generan un contrato ni un cobro: el trabajo comienza solo después de que te
              entreguemos un diagnóstico y aceptes el presupuesto.
            </p>

            <h3>Precios, stock y garantías</h3>
            <p>
              Los precios y el stock se confirman por WhatsApp o correo y pueden cambiar sin aviso
              previo. Las garantías de reparaciones y productos se rigen por la Ley N° 19.496 sobre
              Protección de los Derechos de los Consumidores.
            </p>

            <h3>Ayuda rápida</h3>
            <p>
              Los pasos de la sección «¿Qué le pasó a tu computador?» son orientaciones generales y
              seguras, pero no reemplazan una revisión técnica. Si tienes dudas, no los apliques y
              escríbenos. Te recomendamos respaldar tu información antes de cualquier reparación.
            </p>

            <h3>Propiedad intelectual</h3>
            <p>
              Los textos, el logotipo y el diseño de este sitio pertenecen a {titular.nombre} y no
              pueden copiarse sin autorización. Las marcas de terceros mencionadas (por ejemplo,
              Windows, Office o WhatsApp) pertenecen a sus respectivos dueños.
            </p>

            <h3>Enlaces a otros sitios</h3>
            <p>
              Algunos botones abren servicios externos, como WhatsApp o Gmail. Esos servicios tienen sus
              propias condiciones y políticas de privacidad, sobre las que no tenemos control.
            </p>

            <h3>Legislación aplicable</h3>
            <p>Este aviso se rige por las leyes de la República de Chile.</p>
          </section>

          <section id="privacidad" aria-labelledby="privacidad-title">
            <h2 id="privacidad-title">Política de privacidad</h2>

            <h3>Qué datos recibimos</h3>
            <p>
              Este sitio no tiene formularios que guarden información en un servidor ni cuentas de
              usuario. Solo recibimos los datos que tú decides enviarnos:
            </p>
            <ul>
              <li>
                <strong>Por WhatsApp:</strong> tu número, tu nombre de perfil y el mensaje que envías. La
                orden de servicio solo prepara ese mensaje en tu teléfono o computador; nada se envía
                hasta que tú lo mandas.
              </li>
              <li>
                <strong>Por correo:</strong> tu dirección de correo y el contenido del mensaje.
              </li>
            </ul>
            <p>
              Además, como cualquier sitio web, el servidor que aloja la página registra datos técnicos
              de cada visita (dirección IP, navegador y páginas vistas) para su funcionamiento y
              seguridad.
            </p>

            <h3>Para qué los usamos</h3>
            <p>
              Para responder tus consultas, preparar diagnósticos y presupuestos, coordinar la
              reparación o entrega de tu equipo y cumplir obligaciones legales, como la emisión de
              documentos tributarios. No vendemos ni compartimos tus datos con terceros para fines
              publicitarios.
            </p>

            <h3>Archivos de tus equipos</h3>
            <p>
              Cuando reparamos un equipo podemos tener acceso a la información guardada en él. Solo la
              revisamos cuando el trabajo lo requiere (por ejemplo, para un respaldo que nos pediste) y
              no la copiamos ni la conservamos después de entregar el equipo, salvo que nos lo solicites.
            </p>

            <h3>Cuánto tiempo los guardamos</h3>
            <p>
              Mientras dure la atención y el plazo de garantía del servicio, y luego el tiempo que exijan
              las obligaciones legales o tributarias.
            </p>

            <h3>Tus derechos</h3>
            <p>
              Conforme a la Ley N° 19.628 sobre Protección de la Vida Privada y a la Ley N° 21.719 que
              la actualiza, puedes pedir acceso a tus datos, su rectificación, su eliminación, oponerte a
              su uso o solicitar su portabilidad. Escríbenos a <Correo /> y responderemos dentro de los
              plazos que fija la ley.
            </p>
          </section>

          <section id="cookies" aria-labelledby="cookies-title">
            <h2 id="cookies-title">Cookies</h2>
            <p>
              Este sitio no usa cookies, herramientas de analítica ni publicidad, y no guarda
              información en tu navegador. Las tipografías se cargan desde nuestro propio servidor, sin
              conexiones a terceros. Por eso no te pedimos aceptar cookies.
            </p>
            <p>
              Si en el futuro incorporamos alguna herramienta que las use, actualizaremos esta política y
              te pediremos tu consentimiento cuando corresponda.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
