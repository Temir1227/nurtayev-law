import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <div className="ticks" />
      <Services />
      <div className="ticks" />
      <About />
      <div className="ticks" />
      <Process />
      <div className="ticks" />
      <Reviews />
      <Contact />
      <Footer />
    </>
  )
}
