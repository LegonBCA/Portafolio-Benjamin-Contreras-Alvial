import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, MapPin, Phone } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Correo', value: 'benjamin.c.alvial@gmail.com', href: 'mailto:benjamin.c.alvial@gmail.com' },
  { icon: MapPin, label: 'Ubicación', value: 'Temuco, Chile', href: '#' },
  { icon: Phone, label: 'Teléfono', value: '+56 9 73886419', href: 'tel:+56973886419' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.9rem 1rem',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  return (
    <>
      <section id="contact" className="relative" style={{ padding: '6rem 0' }}>
        <div className="section-container relative">
          {/* ── Main grid: Text left + Form right ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative"
          >
            {/* ── Left: Impact text ── */}
            <motion.div
              ref={headerRef}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="flex flex-col"
            >
              {/* ── Background decorative elements ── */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: '-10%',
                  left: '-20%',
                  width: '500px',
                  height: '500px',
                  background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                  filter: 'blur(100px)',
                  opacity: 0.2,
                  zIndex: -1,
                }}
              />
              <p
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}
              >
                Contacto
              </p>

              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: 'var(--text)',
                }}
              >
                Construyamos
                <br />
                algo{' '}
                <span
                  className="serif-italic"
                  style={{ color: 'var(--accent-light)' }}
                >
                  increíble
                </span>
                <br />
                juntos.
              </h2>

              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  maxWidth: '400px',
                }}
              >
                ¿Tienes un proyecto en mente o solo quieres saludar?
                Siempre estoy abierto a nuevas oportunidades y colaboraciones.
              </p>

              {/* Contact info items */}
              <div
                className="flex flex-col"
                style={{ gap: '1rem', marginTop: '1rem' }}
              >
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center transition-colors duration-300"
                    style={{
                      gap: '0.75rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }}
                  >
                    <span
                      className="flex items-center justify-center"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--accent-light)',
                        flexShrink: 0,
                      }}
                    >
                      <info.icon size={16} />
                    </span>
                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.7rem',
                          color: 'var(--text-dim)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          fontWeight: 500,
                          marginBottom: '0.1rem',
                        }}
                      >
                        {info.label}
                      </span>
                      <span style={{ fontWeight: 500 }}>{info.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="flex flex-col relative"
              style={{
                gap: '1.25rem',
                backgroundColor: 'rgba(17, 17, 17, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '2.5rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Nombre
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)'
                  }}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Correo Electrónico
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)'
                  }}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Cuéntame sobre tu proyecto..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '120px',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)'
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center transition-all duration-300"
                style={{
                  marginTop: '0.5rem',
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '0.9rem 2rem',
                  borderRadius: '8px',
                  gap: '0.5rem',
                  letterSpacing: '0.02em',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-light)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)'
                }}
              >
                Enviar Mensaje
                <Send size={16} />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '2.5rem 0',
        }}
      >
        <div
          className="section-container flex items-center justify-between flex-wrap"
          style={{ gap: '1rem' }}
        >
          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-dim)',
            }}
          >
            © {new Date().getFullYear()}{' '}
            <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
              Benjamín Contreras
            </span>
            . Todos los derechos reservados.
          </span>

          <div className="flex items-center" style={{ gap: '2rem' }}>
            <a
              href="https://github.com/LegonBCA"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-dim)',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-light)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-dim)'
              }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/benjamin-i-c-alvial"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-dim)',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-light)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-dim)'
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
