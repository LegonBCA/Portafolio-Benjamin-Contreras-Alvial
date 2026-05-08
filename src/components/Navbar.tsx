import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../utils/icons'

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
          style={{ height: '70px' }}
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
            id="mobile-menu-btn"
            className="md:hidden flex flex-col items-center justify-center no-select"
            style={{
              width: '40px',
              height: '40px',
              zIndex: 60,
              position: 'relative',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: mobileOpen ? 'var(--surface)' : 'transparent',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {/* Línea 1 */}
            <motion.span
              animate={mobileOpen
                ? { rotate: 45, y: 0, width: '18px' }
                : { rotate: 0, y: -5, width: '18px' }
              }
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{
                display: 'block',
                height: '1.5px',
                backgroundColor: 'var(--text)',
                borderRadius: '2px',
                position: 'absolute',
                transformOrigin: 'center',
              }}
            />
            {/* Línea 2 */}
            <motion.span
              animate={mobileOpen
                ? { opacity: 0, scaleX: 0 }
                : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                backgroundColor: 'var(--text)',
                borderRadius: '2px',
                position: 'absolute',
              }}
            />
            {/* Línea 3 */}
            <motion.span
              animate={mobileOpen
                ? { rotate: -45, y: 0, width: '18px' }
                : { rotate: 0, y: 5, width: '18px' }
              }
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{
                display: 'block',
                height: '1.5px',
                backgroundColor: 'var(--text)',
                borderRadius: '2px',
                position: 'absolute',
                transformOrigin: 'center',
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════
          MOBILE MENU — Full-screen overlay
          ══════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel deslizante desde la derecha */}
            <motion.div
              key="mobile-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full z-50 md:hidden flex flex-col"
              style={{
                width: 'min(320px, 85vw)',
                backgroundColor: 'var(--surface)',
                borderLeft: '1px solid var(--border)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* ── Header del panel ── */}
              <div
                className="flex items-center justify-between"
                style={{
                  padding: '0 1.5rem',
                  height: '70px',
                  borderBottom: '1px solid var(--border)',
                  flexShrink: 0,
                }}
              >
                <a
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  style={{ fontWeight: 700, fontSize: '1.4rem', color: 'var(--text)', fontFamily: 'var(--font-sans)' }}
                >
                  B<span style={{ color: 'var(--accent)' }}>.</span>
                </a>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    background: 'none',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* ── Nav links ── */}
              <nav
                aria-label="Menú principal móvil"
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1.5rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Label de sección */}
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'var(--text-dim)',
                    padding: '0 1.5rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  Navegación
                </p>

                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace('#', '')
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.9rem 1.5rem',
                        textDecoration: 'none',
                        color: isActive ? 'var(--text)' : 'var(--text-muted)',
                        borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                        backgroundColor: isActive ? 'var(--surface-light)' : 'transparent',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'var(--text)'
                          e.currentTarget.style.backgroundColor = 'var(--surface-light)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'var(--text-muted)'
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: isActive ? 'var(--accent-light)' : 'var(--accent)',
                            letterSpacing: '0.05em',
                            fontFamily: 'var(--font-sans)',
                            width: '20px',
                          }}
                        >
                          {link.num}
                        </span>
                        <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
                          {link.label}
                        </span>
                      </div>
                      {isActive && (
                        <span style={{ color: 'var(--accent)', fontSize: '0.55rem' }}>●</span>
                      )}
                    </motion.a>
                  )
                })}

                {/* Divider */}
                <div
                  style={{
                    margin: '1.25rem 1.5rem',
                    height: '1px',
                    backgroundColor: 'var(--border)',
                  }}
                />

                {/* ── Acciones ── */}
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'var(--text-dim)',
                    padding: '0 1.5rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  Acciones
                </p>

                <motion.a
                  href="/CV_Benjamin_Contreras.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.9rem 1.5rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    borderLeft: '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text)'
                    e.currentTarget.style.backgroundColor = 'var(--surface-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      color: 'var(--accent-light)',
                      flexShrink: 0,
                    }}
                  >
                    <FileText size={14} />
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Ver CV</span>
                </motion.a>

                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.44, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '1.25rem 1.5rem 0',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '0.01em',
                    textDecoration: 'none',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent)'
                  }}
                >
                  Hablemos →
                </motion.a>
              </nav>

              {/* ── Footer del panel: Social links ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                  Benjamín Contreras · Temuco, Chile
                </span>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a
                    href="https://github.com/LegonBCA"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.color = 'var(--accent-light)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }}
                  >
                    <GithubIcon size={14} />
                  </a>
                  <a
                    href="https://linkedin.com/in/benjamin-i-c-alvial"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.color = 'var(--accent-light)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }}
                  >
                    <LinkedinIcon size={14} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
