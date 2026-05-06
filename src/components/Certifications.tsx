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
  color: string
}

const certifications: Certification[] = [
  {
    name: 'React: De cero a experto (Hooks y MERN)',
    platform: 'Udemy',
    date: 'Expedición: mayo 2026',
    credentialId: 'ID de la credencial: UC-53137748-1a22-4dcc-bbdc-7945b21aa8d0',
    link: 'https://ude.my/UC-53137748-1a22-4dcc-bbdc-7945b21aa8d0',
    color: '#A435F0',
  },
  {
    name: 'Test Driven Development (TDD) en React JS (Jest, RTL, MSW)',
    platform: 'Udemy',
    date: 'Expedición: abr. 2026',
    credentialId: 'ID de la credencial: UC-bf0854ba-2fbd-459e-ac80-3de6705f4f6b',
    link: 'https://ude.my/UC-bf0854ba-2fbd-459e-ac80-3de6705f4f6b',
    color: '#A435F0',
  },
  {
    name: 'Learn Unit Testing with NUnit and C#',
    platform: 'Udemy',
    date: 'Expedición: abr. 2026',
    credentialId: 'ID de la credencial: UC-e856fec8-52e0-4237-949d-4faa58c8c43f',
    link: 'https://ude.my/UC-e856fec8-52e0-4237-949d-4faa58c8c43f',
    color: '#A435F0',
  },
  {
    name: 'Principios SOLID y Clean Code. Escribe código de calidad.',
    platform: 'Udemy',
    date: 'Expedición: abr. 2026',
    credentialId: 'ID de la credencial: UC-18b0cacc-905c-46b5-a7c4-981bf4e3ad4a',
    link: 'https://ude.my/UC-18b0cacc-905c-46b5-a7c4-981bf4e3ad4a',
    color: '#A435F0',
  },
  {
    name: 'Python',
    platform: 'Santander Open Academy',
    date: 'Expedición: oct. 2025',
    credentialId: 'ID de la credencial: OA-2025-1028001893003',
    link: 'https://openacademy.santander.com/es/credential/OA-2025-1028001893003',
    color: '#E34F26',
  },
]

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Certifications() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="certifications" className="relative overflow-hidden py-24 lg:py-32">
      <div className="section-container relative flex flex-col gap-12 lg:gap-20">
        {/* ── Background Glows ── */}
        <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs font-bold text-purple-500 uppercase tracking-[0.3em] mb-4">
            Credenciales
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Mis{' '}
            <span className="serif-italic text-purple-400">
              Certificaciones
            </span>
          </h2>
        </motion.div>

        {/* ── Certification items ── */}
        <div className="flex flex-col gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ 
                scale: 1.01, 
                borderColor: 'var(--accent)', 
                boxShadow: '0 10px 25px -10px rgba(124, 58, 237, 0.2)',
                y: -2
              }}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '2rem',
                transition: 'all 0.3s var(--ease-out-expo)',
              }}
              className="group relative flex flex-col gap-6"
            >
              <div className="flex gap-6 items-start">
                {/* Visual Icon (Premium Style) */}
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    backgroundColor: `${cert.color}15`,
                    border: `1px solid ${cert.color}30`,
                  }}
                >
                  <Award size={28} style={{ color: cert.color }} />
                </div>

                {/* Info (LinkedIn Structure) */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-base text-gray-300 font-medium mb-1">
                    {cert.platform}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-gray-500">
                      {cert.date}
                    </p>
                    <p className="text-sm text-gray-500 font-mono tracking-tight">
                      {cert.credentialId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button (LinkedIn Style + Portfolio Design) */}
              <div className="pl-0 lg:pl-[84px]">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-purple-900/40 text-gray-300 text-sm font-bold hover:bg-purple-950/30 hover:border-purple-500 hover:text-white transition-all"
                >
                  Mostrar credencial
                  <ExternalLink size={14} className="text-purple-400" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
