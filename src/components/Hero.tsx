import { motion, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDownRight, FileText } from 'lucide-react'

const GithubIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
)

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
)


const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/LegonBCA', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/benjamin-i-c-alvial', label: 'LinkedIn' },
]

const techLogos = [
  'C#', '.NET 8', 'Spring Boot', 'Java', 'React', 'Angular', 'TypeScript',
  'TailwindCSS', 'SQL Server', 'MySQL', 'SQLite', 'Docker', 'Git', 'Figma',
  'Python', 'PHP', 'Postman', 'Linux'
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '80px' }}
    >
      <div
        className="section-container relative flex flex-col justify-center"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        {/* ── Main grid: Photo left + Text right ── */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16 pt-8 pb-24"
        >
          {/* ── LEFT: Photo + geometric block ── */}
          <motion.div
            className="relative flex items-center justify-center order-1 md:order-1"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            style={{ y: imageY }}
          >
            {/* Purple border frame with animated glow */}
            <motion.div
              className="absolute"
              animate={{ boxShadow: ['0 0 10px #7c3aed44', '0 0 30px #7c3aedaa', '0 0 10px #7c3aed44'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '80%',
                maxWidth: '420px',
                aspectRatio: '3/4',
                backgroundColor: 'transparent',
                border: '2px solid var(--accent)',
                borderRadius: '24px',
                top: '54%',
                left: '54%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />

            {/* Subtle glow behind block */}
            <div
              className="absolute"
              style={{
                width: '70%',
                height: '70%',
                background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(40px)',
                opacity: 0.3, /* Dimmed as requested */
                zIndex: 0,
              }}
            />

            <motion.img
              src="/FotoBENJA.png"
              alt="Profile portrait"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{
                width: '80%',
                maxWidth: '420px',
                zIndex: 2,
                objectFit: 'cover',
                objectPosition: 'center top',
                aspectRatio: '3/4',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            />
          </motion.div>

          {/* ── RIGHT: Text content ── */}
          <motion.div
            className="flex flex-col justify-center order-2 md:order-2"
            style={{ y: textY, gap: '1.5rem' }}
          >
            {/* Greeting */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              ¡Hola Mundo! —
            </motion.p>

            {/* Name — big bold + serif italic word */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              style={{
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
              }}
            >
              Soy{' '}
              <span
                className="serif-italic"
                style={{
                  color: 'var(--accent-light)',
                  fontSize: 'clamp(3rem, 5.5vw, 5rem)',
                }}
              >
                Benjamín
              </span>
              <br />
              Full Stack
              <br />
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                Developer
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                maxWidth: '440px',
              }}
            >
              Especializado en arquitecturas backend con .NET y C#, construyendo productos desde el servidor hasta la interfaz.
              <br /><br />
              <span style={{ color: 'var(--accent-light)', fontWeight: 500, fontStyle: 'italic' }}>
                — Construyo APIs que no se caen a las 3am.
              </span>
            </motion.p>

            {/* Buttons and Social Icons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex items-center flex-wrap"
              style={{ gap: '1.5rem', marginTop: '2rem' }}
            >
              <div className="flex items-center" style={{ gap: '1rem' }}>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    padding: '0.85rem 1.8rem',
                    borderRadius: '4px',
                    gap: '0.5rem',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent)'
                  }}
                >
                  Ver Proyectos
                  <ArrowDownRight size={16} />
                </a>
                <a
                  href="/CV_Benjamin_Contreras.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    padding: '0.85rem 1.8rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    letterSpacing: '0.01em',
                    gap: '0.5rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text)'
                  }}
                >
                  <FileText size={16} />
                  Ver CV
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    padding: '0.85rem 1.8rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text)'
                  }}
                >
                  Contáctame
                </a>
              </div>

              {/* Social icons integrated next to buttons */}
              <div className="flex items-center" style={{ gap: '0.75rem' }}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center transition-all duration-300"
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.color = 'var(--accent-light)'
                      e.currentTarget.style.backgroundColor = 'var(--surface)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-muted)'
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <social.icon size={16} />
                    <span className="hidden sm:inline">{social.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom: Tech logos row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            marginTop: '2rem',
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--text-dim)',
              marginBottom: '1rem',
              fontWeight: 500,
            }}
          >
            Stack Tecnológico
          </p>
          <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 30, repeat: Infinity, repeatType: 'loop' }}
              style={{ display: 'flex', gap: '3rem', width: 'max-content', paddingRight: '3rem' }}
            >
              {[...techLogos, ...techLogos].map((tech, idx) => (
                <span
                  key={idx}
                  className="transition-colors duration-300"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--text-dim)',
                    letterSpacing: '0.05em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-dim)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Background decorative elements ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '15%',
          right: '-5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.4,
        }}
      />
    </section>
  )
}
