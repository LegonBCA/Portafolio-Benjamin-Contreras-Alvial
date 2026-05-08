import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Wrench } from 'lucide-react'
import { fadeUp } from '../utils/animations'

interface ExperienceItem {
  company: string
  icon: React.ReactNode
  role: string
  period: string
  description: string | React.ReactNode
  color: string
  isActive?: boolean
}

const experiences: ExperienceItem[] = [
  {
    company: 'NTT DATA',
    icon: <Briefcase size={20} color="#ffffff" />,
    role: 'Desarrollador Trainee (Práctica Profesional)',
    period: 'Mar 2026 — Presente',
    isActive: true,
    description: (
      <div className="flex flex-col gap-2">
        <p>Desarrollo frontend especializado con enfoque en calidad y escalabilidad. Especializado en React y ecosistema .NET.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <li><strong style={{ color: 'var(--text)' }}>React:</strong> Creación de UIs modernas, hooks y estado.</li>
          <li><strong style={{ color: 'var(--text)' }}>TDD:</strong> Pruebas con Jest, React Testing Library y MSW.</li>
          <li><strong style={{ color: 'var(--text)' }}>SOLID & Clean Code:</strong> Arquitecturas mantenibles.</li>
          <li><strong style={{ color: 'var(--text)' }}>.NET:</strong> Especialización en backend C# de alto rendimiento.</li>
        </ul>
      </div>
    ),
    color: '#7c3aed',
  },
  {
    company: 'NTT DATA',
    icon: <Briefcase size={20} color="#ffffff" />,
    role: 'Backend Developer (Ciclo Especialización)',
    period: 'Sep 2025 — Nov 2025',
    description:
      'Desarrollé APIs REST para el sistema enterprise de gestión de certificaciones junto a un equipo usando Scrum, code reviews y entregables semanales. Construcción de APIs con Spring Boot 3 y JWT.',
    color: '#7c3aed',
  },
  {
    company: 'Independiente',
    icon: <Wrench size={20} color="#ffffff" />,
    role: 'Soporte Técnico Freelance',
    period: 'Ene 2023 — Feb 2024',
    description:
      'Reparación y mantenimiento de equipos para clientes particulares y pequeños negocios locales. Diagnóstico, ensamblaje de PCs, y asesoría sobre seguridad.',
    color: '#7c3aed',
  },
]

/** Tarjeta de experiencia reutilizable — antes estaba duplicada */
function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: item.isActive ? '3px solid var(--accent)' : '1px solid var(--border)',
        borderRadius: '10px',
        padding: '1.25rem',
        maxWidth: '100%',
        width: '100%',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--accent-light)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            backgroundColor: 'var(--accent-glow)',
          }}
        >
          {item.period}
        </span>
        {item.isActive && (
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#fff',
              backgroundColor: 'var(--accent)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
            }}
          >
            Actual
          </span>
        )}
      </div>
      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '0.25rem',
        }}
      >
        {item.company}
      </h3>
      <p
        style={{
          fontSize: '0.85rem',
          fontWeight: 500,
          color: 'var(--accent-light)',
          marginBottom: '0.75rem',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
        }}
      >
        {item.role}
      </p>
      <div
        style={{
          fontSize: '0.85rem',
          lineHeight: 1.65,
          color: 'var(--text-muted)',
        }}
      >
        {item.description}
      </div>
    </div>
  )
}

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref}>
      {/* ── MOBILE: simple vertical card list ── */}
      <div className="flex md:hidden mb-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          whileHover={{ y: -2, boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)' }}
          style={{ transition: 'all 0.3s ease', width: '100%' }}
        >
          <ExperienceCard item={item} />
        </motion.div>
      </div>

      {/* ── DESKTOP: zigzag 3-column grid ── */}
      <div
        className="relative hidden md:grid"
        style={{
          gridTemplateColumns: '1fr 80px 1fr',
          alignItems: 'stretch',
          minHeight: '200px',
          marginBottom: '1rem',
        }}
      >
        {/* Left column */}
        <div
          style={{
            gridColumn: '1 / 2',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '2rem',
            paddingTop: '0.5rem',
            alignSelf: 'start',
          }}
        >
          {isLeft ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -2, boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)' }}
              style={{ transition: 'all 0.3s ease' }}
            >
              <ExperienceCard item={item} />
            </motion.div>
          ) : (
            <div />
          )}
        </div>

        {/* Center: line + icon */}
        <div
          className="relative flex flex-col items-center"
          style={{ gridColumn: '2 / 3', alignSelf: 'stretch' }}
        >
          <div
            className="absolute"
            style={{
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: 'var(--border)',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              border: '3px solid var(--bg)',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
              zIndex: 2,
              marginTop: '0.5rem',
              flexShrink: 0,
            }}
          >
            {item.icon}
          </motion.div>
        </div>

        {/* Right column */}
        <div
          style={{
            gridColumn: '3 / 4',
            display: 'flex',
            justifyContent: 'flex-start',
            paddingLeft: '2rem',
            paddingTop: '0.5rem',
            alignSelf: 'start',
          }}
        >
          {!isLeft ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -2, boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)' }}
              style={{ transition: 'all 0.3s ease' }}
            >
              <ExperienceCard item={item} />
            </motion.div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" style={{ padding: '4rem 0' }}>
      <div className="section-container">
        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ marginBottom: '3rem' }}
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
            Trayectoria
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--text)',
            }}
          >
            Mi{' '}
            <span className="serif-italic" style={{ color: 'var(--accent-light)' }}>
              Experiencia
            </span>
          </h2>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative" style={{ paddingBottom: '2rem' }}>
          {experiences.map((exp, i) => (
            <TimelineItem key={`${exp.company}-${i}`} item={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
