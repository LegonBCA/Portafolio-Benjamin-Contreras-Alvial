import { motion, useInView, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  num: string
  title: string
  titleAccent: string
  description: string | React.ReactNode
  tags: string[]
  images: string[]
  link: string
  isMobile?: boolean
}

const projects: Project[] = [
  {
    num: '01',
    title: 'Sistema de Certificaciones',
    titleAccent: 'Certificaciones',
    description: (
      <>
        Sistema enterprise desarrollado durante el Ciclo de Especialización de{' '}
        <strong style={{ color: 'var(--text)', fontWeight: 600 }}>NTT Data</strong>. Trabajo real en equipo usando{' '}
        <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Scrum</strong>, code reviews y Clean Architecture.
      </>
    ),
    tags: ['Spring Boot 3', 'Java 17', 'MySQL', 'JWT'],
    images: ['/Certificaciones Proyect  Imagen1.png'],
    link: '#',
  },
  {
    num: '02',
    title: 'Medisoft',
    titleAccent: 'Medisoft',
    description:
      'App de escritorio para clínicas. Manejo de usuarios, sesiones y documentos de pacientes con roles diferenciados.',
    tags: ['C#', '.NET', 'SQL Server'],
    images: ['/1751389902_Medisoft.png'],
    link: '#',
  },
  {
    num: '03',
    title: 'Roomit',
    titleAccent: 'Roomit',
    description:
      'Web app para reservar salas de estudio y trabajo. CRUD completo y frontend responsivo con validaciones.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    images: ['/image01.png', '/image02.png', '/image03.png', '/image04.png', '/image05.png'],
    link: '#',
  },

]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0
  const [activeImg, setActiveImg] = useState(0)

  // Common UI elements
  const TextSide = (
    <div className={`w-full ${project.isMobile ? 'flex flex-col items-center text-center' : 'lg:w-1/2 flex flex-col gap-6 pt-4 lg:pt-8'}`}>
      <div className={`flex items-center gap-4 ${project.isMobile ? 'justify-center mb-4' : 'mb-6'}`}>
        <span className="text-sm font-bold text-purple-500 tracking-widest">{project.num}</span>
        <div className="h-[1px] w-12 bg-purple-900/50" />
      </div>

      <h3 className={`text-3xl lg:text-5xl font-bold text-white leading-tight ${project.isMobile ? 'mb-4' : 'mb-0'}`}>
        {project.title.replace(project.titleAccent, '').trim()}{' '}
        <span className="serif-italic text-purple-400">
          {project.titleAccent}
        </span>
      </h3>

      <div className={`text-gray-400 text-base lg:text-lg leading-relaxed max-w-xl ${project.isMobile ? 'mb-6' : 'mb-6'}`}>
        {project.description}
      </div>

      <div className={`flex flex-wrap gap-3 ${project.isMobile ? 'justify-center mb-8' : 'mb-8'}`}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm font-medium text-purple-300 px-4 py-1.5 rounded-full border border-purple-700/50 bg-purple-950/50 hover:border-purple-500 transition-all cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.link}
        className="group/link inline-flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest hover:text-purple-400 transition-colors"
      >
        Ver Proyecto
        <span className="w-10 h-10 rounded-full border border-purple-900/50 flex items-center justify-center group-hover/link:border-purple-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all">
          <ArrowUpRight size={18} />
        </span>
      </a>
    </div>
  )

  const ImageSide = (
    <div className={`flex flex-col gap-4 group ${project.isMobile ? 'w-full items-center mt-12' : 'w-full lg:w-1/2 items-start'}`}>
      <div
        className={`relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_25px_#7c3aed44] flex flex-col
          ${project.isMobile
            ? 'max-w-[300px] rounded-[2rem] border-2 border-purple-900/60 p-2 bg-[#050505]'
            : 'max-w-[580px] rounded-xl border border-purple-900/40 bg-[#0a0a0a] shadow-2xl'
          }`}
      >
        <div className={`relative overflow-hidden ${project.isMobile ? 'rounded-[1.8rem]' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.img
              key={project.images[activeImg]}
              src={project.images[activeImg]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-full transition-transform duration-300 group-hover:scale-[1.02]
                ${project.isMobile ? 'h-auto object-contain' : 'h-auto object-cover'}`}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
        </div>
      </div>

      {project.images.length > 1 && (
        <div className={`flex gap-3 px-1 ${project.isMobile ? 'justify-center w-full max-w-[300px]' : 'justify-start w-full'}`}>
          {project.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`relative rounded-md overflow-hidden border-2 transition-all duration-300 
                ${project.isMobile ? 'w-12 aspect-[9/16]' : 'w-20 aspect-video'}
                ${activeImg === i ? 'border-purple-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}
              `}
            >
              <img src={img} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={project.isMobile
        ? "flex flex-col items-center mb-32"
        : `flex flex-col lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''} gap-12 items-start mb-32`}
    >
      {project.isMobile ? (
        <>
          {TextSide}
          {ImageSide}
        </>
      ) : (
        <>
          {ImageSide}
          {TextSide}
        </>
      )}
    </motion.div>
  )
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-32 lg:py-48 select-none overflow-hidden bg-black relative">
      <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10 pb-24 lg:pb-32">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-40 lg:mb-64"
        >
          <p className="text-xs lg:text-sm font-bold text-purple-500 uppercase tracking-[0.3em] mb-4">
            Trabajo Seleccionado
          </p>
          <h2 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-16">
            Proyectos que{' '}
            <span className="serif-italic text-purple-400">
              definen
            </span>{' '}
            mi trabajo
          </h2>
        </motion.div>

        <div
          className="flex flex-col gap-32 mt-16 lg:mt-32"
          style={{ paddingTop: '4rem' }}
        >
          {projects.map((project, i) => (
            <ProjectItem key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
