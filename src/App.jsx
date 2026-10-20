import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FirstAid from './components/FirstAid'
import Services from './components/Services'
import Process from './components/Process'
import Products from './components/Products'
import About from './components/About'
import Faq from './components/Faq'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'

export default function App() {
  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Navbar />
      <main id="contenido" className="page">
        <Hero />
        <FirstAid />
        <Services />
        <Process />
        <Products />
        <About />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
