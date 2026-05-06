import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import { 
  Atom, 
  Layout, 
  Code2, 
  Box, 
  Globe, 
  Zap, 
  Database, 
  PenTool, 
  Coffee, 
  Leaf, 
  Terminal, 
  FileCode, 
  Key, 
  Smartphone, 
  Hexagon, 
  Webhook, 
  FileJson, 
  RefreshCw, 
  Send, 
  Component, 
  Palette 
} from 'lucide-react'

const GithubIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
)

interface SkillItem {
  name: string
  icon: React.ReactNode
  level: 'large' | 'medium' | 'small'
}

const skillsArray: SkillItem[] = [
  { name: 'React', icon: <Atom size={18} />, level: 'large' },
  { name: 'Clean Arch.', icon: <Layout size={14} />, level: 'small' },
  { name: 'C#', icon: <Code2 size={20} />, level: 'large' },
  { name: 'Docker', icon: <Box size={16} />, level: 'medium' },
  { name: 'PHP', icon: <Globe size={14} />, level: 'small' },
  { name: '.NET', icon: <Zap size={20} />, level: 'large' },
  { name: 'Entity Framework', icon: <Database size={16} />, level: 'medium' },
  { name: 'Figma', icon: <PenTool size={14} />, level: 'small' },
  { name: 'Java', icon: <Coffee size={16} />, level: 'medium' },
  { name: 'Spring Boot', icon: <Leaf size={20} />, level: 'large' },
  { name: 'Linux', icon: <Terminal size={14} />, level: 'small' },
  { name: 'MySQL', icon: <Database size={16} />, level: 'medium' },
  { name: 'TypeScript', icon: <FileCode size={20} />, level: 'large' },
  { name: 'JWT', icon: <Key size={14} />, level: 'small' },
  { name: 'Kivy', icon: <Smartphone size={14} />, level: 'small' },
  { name: 'Angular', icon: <Hexagon size={16} />, level: 'medium' },
  { name: 'SQL Server', icon: <Database size={20} />, level: 'large' },
  { name: 'REST APIs', icon: <Webhook size={14} />, level: 'small' },
  { name: 'Python', icon: <FileJson size={14} />, level: 'small' },
  { name: 'Git/GitHub', icon: <GithubIcon size={14} />, level: 'small' },
  { name: 'Scrum', icon: <RefreshCw size={14} />, level: 'small' },
  { name: 'Postman', icon: <Send size={14} />, level: 'small' },
  { name: 'Patrones', icon: <Component size={14} />, level: 'small' },
  { name: 'SQLite', icon: <Database size={14} />, level: 'small' },
  { name: 'Tailwind', icon: <Palette size={16} />, level: 'medium' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
}

const getLevelStyles = (level: string) => {
  switch (level) {
    case 'large':
      return { 
        fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', 
        padding: '0.8rem 1.6rem', 
        iconSize: '1.5rem', 
        fontWeight: 600,
        color: 'var(--text)' 
      }
    case 'medium':
      return { 
        fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', 
        padding: '0.6rem 1.2rem', 
        iconSize: '1.2rem', 
        fontWeight: 500,
        color: 'var(--text)' 
      }
    case 'small':
    default:
      return { 
        fontSize: '0.85rem', 
        padding: '0.4rem 0.9rem', 
        iconSize: '1rem', 
        fontWeight: 400,
        color: 'var(--text-muted)' 
      }
  }
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const cloudRef = useRef<HTMLDivElement>(null)
  const cloudInView = useInView(cloudRef, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative" style={{ padding: '4rem 0 6rem' }}>
      <div className="section-container relative">
        {/* ── Section header ── */}
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
        </motion.div>

        {/* ── Background decorative elements ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)',
            filter: 'blur(80px)',
            opacity: 0.4,
            zIndex: -1,
          }}
        />

        {/* ── Cloud Tag Container ── */}
        <motion.div
          ref={cloudRef}
          variants={containerVariants}
          initial="hidden"
          animate={cloudInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center items-center"
          style={{ gap: '1rem', maxWidth: '900px', margin: '0 auto', zIndex: 1, position: 'relative' }}
        >
          {skillsArray.map((skill) => {
            const styles = getLevelStyles(skill.level)
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)',
                  borderColor: 'var(--accent-light)',
                  color: '#fff'
                }}
                className="flex items-center transition-colors duration-300 cursor-default"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid rgba(124, 58, 237, 0.3)', // border-purple-700 equivalent
                  borderRadius: '999px',
                  padding: styles.padding,
                  gap: '0.6rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)',
                }}
              >
                <span
                  style={{
                    fontSize: styles.iconSize,
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {skill.icon}
                </span>
                <span
                  style={{
                    fontSize: styles.fontSize,
                    fontWeight: styles.fontWeight,
                    color: styles.color,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {skill.name}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
