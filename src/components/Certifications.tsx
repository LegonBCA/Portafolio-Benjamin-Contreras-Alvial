import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Award } from 'lucide-react'

interface Certification {
  name: string
  platform: string
  date: string
  credentialId: string
  link: string
}

const certifications: Certification[] = [
  {
    name: 'React: De cero a experto (Hooks y MERN)',
    platform: 'Udemy',
    date: 'mayo 2026',
    credentialId: 'UC-53137748-1a22-4dcc-bbdc-7945b21aa8d0',
    link: 'https://ude.my/UC-53137748-1a22-4dcc-bbdc-7945b21aa8d0',
  },
  {
    name: 'Test Driven Development (TDD) en React JS',
    platform: 'Udemy',
    date: 'abr. 2026',
    credentialId: 'UC-bf0854ba-2fbd-459e-ac80-3de6705f4f6b',
    link: 'https://ude.my/UC-bf0854ba-2fbd-459e-ac80-3de6705f4f6b',
  },
  {
    name: 'Unit Testing with NUnit and C#',
    platform: 'Udemy',
    date: 'abr. 2026',
    credentialId: 'UC-e856fec8-52e0-4237-949d-4faa58c8c43f',
    link: 'https://ude.my/UC-e856fec8-52e0-4237-949d-4faa58c8c43f',
  },
  {
    name: 'Principios SOLID y Clean Code',
    platform: 'Udemy',
    date: 'abr. 2026',
    credentialId: 'UC-18b0cacc-905c-46b5-a7c4-981bf4e3ad4a',
    link: 'https://ude.my/UC-18b0cacc-905c-46b5-a7c4-981bf4e3ad4a',
  },
  {
    name: 'Python',
    platform: 'Santander Open Academy',
    date: 'oct. 2025',
    credentialId: 'OA-2025-1028001893003',
    link: 'https://openacademy.santander.com/es/credential/OA-2025-1028001893003',
  },
]

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Certifications() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="certifications" className="relative" style={{ padding: '5rem 0 7rem' }}>
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Credenciales
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--text)',
              }}
            >
              Mis{' '}
              <span className="serif-italic" style={{ color: 'var(--accent-light)' }}>
                Certificaciones
              </span>
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              {certifications.length} certificaciones verificables
            </p>
          </div>
        </motion.div>

        {/* ── Top rule ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            height: '1px',
            background: 'linear-gradient(to right, var(--accent), var(--border-light), transparent)',
            transformOrigin: 'left',
          }}
        />

        {/* ── Certification rows ── */}
        <div>
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.credentialId}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={rowVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="group"
              style={{
                display: 'grid',
                gridTemplateColumns: '42px 1fr auto',
                gap: '1.25rem',
                padding: '1.5rem 0',
                borderBottom: '1px solid var(--border)',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              whileHover={{
                backgroundColor: 'var(--surface)',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent-dim)',
                  border: '1px solid rgba(124, 58, 237, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-light)',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                <Award size={20} />
              </div>

              {/* Info */}
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                    marginBottom: '0.2rem',
                    transition: 'color 0.2s ease',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  className="group-hover:text-purple-400"
                >
                  {cert.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {cert.platform}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>·</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {cert.date}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div
                className="transition-all duration-200"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-dim)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                <span className="hidden lg:inline" style={{ transition: 'color 0.2s ease' }}>
                  Ver credencial
                </span>
                <ExternalLink
                  size={14}
                  style={{ transition: 'transform 0.2s ease, color 0.2s ease' }}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-purple-400"
                />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
