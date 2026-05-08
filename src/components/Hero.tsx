import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDownRight, FileText } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../utils/icons'
import { fadeUpStagger } from '../utils/animations'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/LegonBCA', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/benjamin-i-c-alvial', label: 'LinkedIn' },
]

const techLogos = [
  'C#', '.NET 8', 'Spring Boot', 'Java', 'React', 'Angular', 'TypeScript',
  'TailwindCSS', 'SQL Server', 'MySQL', 'SQLite', 'Docker', 'Git', 'Figma',
  'Python', 'PHP', 'Postman', 'Linux'
]


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
        style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        {/* ── Main grid: Photo left + Text right ── */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16 pt-6 pb-16 md:pt-8 md:pb-24"
        >
          {/* ── LEFT: Photo + geometric block ── */}
          <motion.div
            className="relative flex items-center justify-center order-1 md:order-1"
            variants={fadeUpStagger}
            initial="hidden"
            animate="visible"
            custom={0}
            style={{ y: imageY }}
          >
            {/* Frame border offset — sutil, editorial */}
            <div
              className="absolute"
              style={{
                width: '80%',
                maxWidth: '340px',
                aspectRatio: '3/4',
                border: '1px solid var(--accent)',
                borderRadius: '20px',
                top: '54%',
                left: '54%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                opacity: 0.4,
              }}
            />

            {/* Glow behind photo */}
            <div
              className="absolute"
              style={{
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(60px)',
                opacity: 0.25,
                zIndex: 0,
              }}
            />

            <motion.img
              src="/FotoBENJA.png"
              alt="Benjamín Contreras Alvial — Full Stack Developer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{
                width: '65%',
                maxWidth: '340px',
                zIndex: 2,
                objectFit: 'cover',
                objectPosition: 'center top',
                aspectRatio: '3/4',
                borderRadius: '20px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.08)',
              }}
            />
          </motion.div>

          {/* ── RIGHT: Text content ── */}
          <motion.div
            className="flex flex-col justify-center order-2 md:order-2"
            style={{ y: textY, gap: '1.5rem' }}
          >
            {/* ── Disponibility badge ── */}
            <motion.div
              variants={fadeUpStagger}
              initial="hidden"
              animate="visible"
              custom={0.5}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '999px',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                backgroundColor: 'rgba(34, 197, 94, 0.06)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#86efac',
                width: 'fit-content',
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  flexShrink: 0,
                  display: 'block',
                }}
              />
              Disponible para nuevas oportunidades
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={fadeUpStagger}
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
              variants={fadeUpStagger}
              initial="hidden"
              animate="visible"
              custom={2}
              style={{
                fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
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
              variants={fadeUpStagger}
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
            </motion.p>

            {/* ── Stats row ── */}
            <motion.div
              variants={fadeUpStagger}
              initial="hidden"
              animate="visible"
              custom={3.5}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem 2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                marginTop: '0.25rem',
              }}
            >
              {[
                { num: '3+', label: 'Años coding' },
                { num: '.NET', label: 'Stack principal' },
                { num: 'Temuco', label: 'Chile' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginTop: '0.15rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Buttons and Social Icons */}
            <motion.div
              variants={fadeUpStagger}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-col sm:flex-row items-start sm:items-center flex-wrap"
              style={{ gap: '1rem', marginTop: '2rem' }}
            >
              <div className="flex items-center flex-wrap" style={{ gap: '0.75rem' }}>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    padding: '0.85rem 1.5rem',
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
                    padding: '0.85rem 1.5rem',
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
                    padding: '0.85rem 1.5rem',
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

        {/* ── Bottom: Tech marquee ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            marginTop: '2rem',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 35, repeat: Infinity, repeatType: 'loop' }}
              style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
            >
              {[...techLogos, ...techLogos].map((tech, idx) => (
                <span
                  key={idx}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: 'var(--text-dim)',
                      letterSpacing: '0.04em',
                      padding: '0 1.5rem',
                    }}
                  >
                    {tech}
                  </span>
                  <span style={{ color: 'var(--accent)', fontSize: '0.35rem', opacity: 0.5 }}>●</span>
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
