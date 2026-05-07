import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [showSplash])

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      {!showSplash && (
        <>
          <ScrollProgress />
          <div style={{ animation: 'labelFade 0.8s ease-out forwards' }}>
            <Navbar />
            <main>
              <Hero />
              <Projects />
              <Skills />
              <Experience />
              <Certifications />
              <Contact />
            </main>
          </div>
          <WhatsAppButton />
        </>
      )}
    </>
  )
}

export default App
