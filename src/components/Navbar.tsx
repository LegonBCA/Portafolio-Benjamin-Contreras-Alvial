import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { num: '01', label: 'Proyectos', href: '#projects' },
  { num: '02', label: 'Habilidades', href: '#skills' },
  { num: '03', label: 'Experiencia', href: '#experience' },
  { num: '04', label: 'Certificaciones', href: '#certifications' },
  { num: '05', label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Detectar scroll para estilos de la navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú móvil con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Scroll spy — resalta la sección activa en la Navbar
  useEffect(() => {
    const sectionIds = navLinks.map(link => link.href.replace('#', ''))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -65% 0px' }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl' : ''}`}
        style={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.90)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div
          className="section-container flex items-center justify-between"
          style={{ height: '80px' }}
        >
          {/* ── Logo ── */}
          <a
            href="#"
            className="relative flex items-center gap-2 no-select"
            style={{ zIndex: 60 }}
            aria-label="Volver al inicio"
          >
            <span
              className="font-bold tracking-tight"
              style={{
                fontSize: '1.5rem',
                color: 'var(--text)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              B
              <span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </a>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center" style={{ gap: '2.5rem' }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center transition-colors duration-300 relative"
                  style={{
                    gap: '0.5rem',
                    color: isActive ? 'var(--text)' : 'var(--text-muted)',
                    fontSize: '0.875rem',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive ? 'var(--text)' : 'var(--text-muted)'
                  }}
                >
                  <span
                    style={{
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  >
                    {link.num}
                  </span>
                  {link.label}
                  {/* Indicador de sección activa */}
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '1px',
                        backgroundColor: 'var(--accent)',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* ── CTA Buttons (Desktop) ── */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/CV_Benjamin_Contreras.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              Ver CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: 'var(--accent)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '0.6rem 1.5rem',
                borderRadius: '4px',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-light)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)'
              }}
            >
              Hablemos
            </a>
          </div>

          {/* ── Hamburger (Mobile) ── */}
          <button
            className="md:hidden relative flex flex-col items-center justify-center no-select"
            style={{ width: '32px', height: '32px', zIndex: 60 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            <span
              className="block transition-all duration-300"
              style={{
                width: '22px',
                height: '2px',
                backgroundColor: 'var(--text)',
                transform: mobileOpen ? 'rotate(45deg) translateY(0px)' : 'rotate(0) translateY(-4px)',
                position: mobileOpen ? 'absolute' : 'relative',
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: '22px',
                height: '2px',
                backgroundColor: 'var(--text)',
                opacity: mobileOpen ? 0 : 1,
                margin: mobileOpen ? 0 : '4px 0',
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: '22px',
                height: '2px',
                backgroundColor: 'var(--text)',
                transform: mobileOpen ? 'rotate(-45deg) translateY(0px)' : 'rotate(0) translateY(4px)',
                position: mobileOpen ? 'absolute' : 'relative',
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            <nav className="flex flex-col items-center" style={{ gap: '2rem' }} aria-label="Menú principal móvil">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center"
                  style={{
                    gap: '0.75rem',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: activeSection === link.href.replace('#', '') ? 'var(--accent-light)' : 'var(--text)',
                  }}
                >
                  <span style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 500 }}>
                    {link.num}
                  </span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center"
                style={{
                  marginTop: '1rem',
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '0.8rem 2rem',
                  borderRadius: '4px',
                }}
              >
                Hablemos
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
