import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Code2, Zap, Leaf, Coffee, Database, Key, Webhook,
  Atom, FileCode, Hexagon, Palette,
  Box, Terminal, Send, PenTool,
  Layout, Component, RefreshCw, Wrench,
} from 'lucide-react'
import { GithubIcon } from '../utils/icons'

interface Skill { name: string; icon: React.ReactNode }
interface SkillCategory {
  id: string
  label: string
  isPrimary?: boolean
  skills: Skill[]
}

const categories: SkillCategory[] = [
  {
    id: 'backend',
    label: 'Backend',
    isPrimary: true,
    skills: [
      { name: 'C#', icon: <Code2 size={12} /> },
      { name: '.NET 8', icon: <Zap size={12} /> },
      { name: 'Spring Boot', icon: <Leaf size={12} /> },
      { name: 'Java', icon: <Coffee size={12} /> },
      { name: 'Entity Framework', icon: <Database size={12} /> },
      { name: 'JWT', icon: <Key size={12} /> },
      { name: 'REST APIs', icon: <Webhook size={12} /> },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React', icon: <Atom size={12} /> },
      { name: 'TypeScript', icon: <FileCode size={12} /> },
      { name: 'Angular', icon: <Hexagon size={12} /> },
      { name: 'TailwindCSS', icon: <Palette size={12} /> },
    ],
  },
  {
    id: 'db',
    label: 'Bases de Datos',
    skills: [
      { name: 'SQL Server', icon: <Database size={12} /> },
      { name: 'MySQL', icon: <Database size={12} /> },
      { name: 'SQLite', icon: <Database size={12} /> },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    skills: [
      { name: 'Docker', icon: <Box size={12} /> },
      { name: 'Git', icon: <GithubIcon size={12} /> },
      { name: 'Linux', icon: <Terminal size={12} /> },
      { name: 'Postman', icon: <Send size={12} /> },
      { name: 'Figma', icon: <PenTool size={12} /> },
    ],
  },
  {
    id: 'methods',
    label: 'Metodologías',
    skills: [
      { name: 'Clean Architecture', icon: <Layout size={12} /> },
      { name: 'SOLID', icon: <Component size={12} /> },
      { name: 'Scrum', icon: <RefreshCw size={12} /> },
      { name: 'TDD', icon: <Wrench size={12} /> },
    ],
  },
]

function SkillRow({ cat, index }: { cat: SkillCategory; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        gap: '1.5rem',
        padding: '1.4rem 0',
        borderBottom: '1px solid var(--border)',
        alignItems: 'start',
      }}
      className="group skills-row"
    >
      {/* Category label */}
      <div style={{ paddingTop: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: cat.isPrimary ? 'var(--accent-light)' : 'var(--text-dim)',
            transition: 'color 0.2s ease',
          }}
        >
          {cat.label}
        </span>
        {cat.isPrimary && (
          <span style={{ color: 'var(--accent)', fontSize: '0.6rem', lineHeight: 1 }}>✦</span>
        )}
      </div>

      {/* Skills badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {cat.skills.map((skill) => (
          <span key={skill.name} className="skill-badge">
            {skill.icon}
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative" style={{ padding: '5rem 0 7rem' }}>
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
            Especialidades
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
                Habilidades
              </span>
            </h2>
            {/* Editorial note */}
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', maxWidth: '260px', textAlign: 'right' }}>
              ✦ Indica especialización principal
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
            marginBottom: 0,
          }}
        />

        {/* ── Skill rows ── */}
        <div>
          {categories.map((cat, i) => (
            <SkillRow key={cat.id} cat={cat} index={i} />
          ))}
        </div>

        {/* ── Mobile: responsive override ── */}
        <style>{`
          @media (max-width: 640px) {
            .skills-row {
              grid-template-columns: 1fr !important;
              gap: 0.75rem !important;
            }
          }
        `}</style>

      </div>
    </section>
  )
}
