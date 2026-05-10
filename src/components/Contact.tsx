import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { fadeUp } from '../utils/animations'

// ─────────────────────────────────────────────
// CONFIGURACIÓN: Para activar el formulario, crea una cuenta GRATUITA en
// https://web3forms.com/ → obtén tu Access Key → pégala aquí:
// ─────────────────────────────────────────────
const WEB3FORMS_KEY = 'e89f658d-a4b1-497f-9e3e-b39f4da73d4f'

const contactInfo = [
  { icon: Mail, label: 'Correo', value: 'benjamin.c.alvial@gmail.com', href: 'mailto:benjamin.c.alvial@gmail.com' },
  { icon: MapPin, label: 'Ubicación', value: 'Temuco, Chile', href: 'https://maps.google.com/?q=Temuco,Chile' },
  { icon: Phone, label: 'Teléfono', value: '+56 9 7388 6419', href: 'tel:+56973886419' },
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `📬 Nuevo mensaje de ${formData.name} — Portfolio`,
          from_name: 'Portfolio de Benjamín',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
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
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  }

  return (
    <>
      <section id="contact" className="relative" style={{ padding: '4rem 0' }}>
        <div className="section-container relative">

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative">

            {/* ── Left: Impact text ── */}
            <motion.div
              ref={headerRef}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="flex flex-col"
            >
              {/* Background decorative glow */}
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
                  marginTop: '0.75rem',
                }}
              >
                Construyamos
                <br />
                algo{' '}
                <span className="serif-italic" style={{ color: 'var(--accent-light)' }}>
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
                  marginTop: '1rem',
                }}
              >
                ¿Tienes un proyecto en mente o solo quieres saludar?
                Siempre estoy abierto a nuevas oportunidades y colaboraciones.
              </p>

              {/* Contact info */}
              <div className="flex flex-col" style={{ gap: '1rem', marginTop: '2rem' }}>
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center transition-colors duration-300 group"
                    style={{ gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
                  >
                    <span
                      className="flex items-center justify-center transition-colors duration-300"
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
                padding: 'clamp(1.25rem, 4vw, 2.5rem)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* ── Success State ── */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center"
                  style={{ gap: '1rem', padding: '2rem 0' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '2px solid rgba(34, 197, 94, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#22c55e',
                    }}
                  >
                    <CheckCircle size={32} />
                  </motion.div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>
                    ¡Mensaje enviado!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '280px' }}>
                    Gracias por escribirme. Te responderé lo antes posible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    style={{
                      marginTop: '0.5rem',
                      color: 'var(--accent-light)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              )}

              {/* ── Error State ── */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                  style={{
                    padding: '0.9rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: '#fca5a5',
                    fontSize: '0.875rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>Ocurrió un error al enviar. Intenta de nuevo o escríbeme directamente al correo.</span>
                </motion.div>
              )}

              {/* ── Form Fields (hidden on success) ── */}
              {status !== 'success' && (
                <>
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent)'
                        e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border)'
                        e.target.style.boxShadow = 'none'
                      }}
                      required
                      disabled={status === 'loading'}
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent)'
                        e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border)'
                        e.target.style.boxShadow = 'none'
                      }}
                      required
                      disabled={status === 'loading'}
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
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent)'
                        e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border)'
                        e.target.style.boxShadow = 'none'
                      }}
                      required
                      disabled={status === 'loading'}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={status !== 'loading' ? { scale: 1.01 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
                    className="inline-flex items-center justify-center transition-all duration-300"
                    style={{
                      marginTop: '0.5rem',
                      backgroundColor: status === 'loading' ? 'var(--border)' : 'var(--accent)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      padding: '0.9rem 2rem',
                      borderRadius: '8px',
                      gap: '0.5rem',
                      letterSpacing: '0.02em',
                      width: '100%',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (status !== 'loading')
                        e.currentTarget.style.backgroundColor = 'var(--accent-light)'
                    }}
                    onMouseLeave={(e) => {
                      if (status !== 'loading')
                        e.currentTarget.style.backgroundColor = 'var(--accent)'
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'flex' }}
                        >
                          <Loader size={16} />
                        </motion.span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 0 2.5rem' }}>
        <div className="section-container">
          {/* Top row */}
          <div
            className="flex items-center justify-between flex-wrap"
            style={{ gap: '1.5rem', marginBottom: '2rem' }}
          >
            {/* Logo mark */}
            <span
              className="font-bold"
              style={{ fontSize: '1.3rem', color: 'var(--text)', fontFamily: 'var(--font-sans)' }}
            >
              B<span style={{ color: 'var(--accent)' }}>.</span>
            </span>

            {/* Social links */}
            <div className="flex items-center" style={{ gap: '1.5rem' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/LegonBCA' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/benjamin-i-c-alvial' },
                { label: 'Correo', href: 'mailto:benjamin.c.alvial@gmail.com' },
              ].map((link, i) => (
                <span key={link.label} className="flex items-center" style={{ gap: '1.5rem' }}>
                  {i > 0 && <span style={{ color: 'var(--border-light)', fontSize: '0.7rem' }}>·</span>}
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="transition-colors duration-300"
                    style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 500 }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-light)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)' }}
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              © {new Date().getFullYear()} Benjamín Contreras. Hecho con React, café y algo de insomnio.
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
              Temuco, Chile
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
