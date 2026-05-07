import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(to right, var(--accent), var(--accent-light))',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9998,
        boxShadow: '0 0 8px var(--accent)',
      }}
    />
  )
}
