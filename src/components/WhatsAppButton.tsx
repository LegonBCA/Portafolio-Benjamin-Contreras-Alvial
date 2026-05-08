import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/56973886419?text=Hola%20Benjamín%2C%20vi%20tu%20portafolio%20y%20me%20gustaría%20contactarte."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      className="group whatsapp-fab"
      aria-label="Contactar por WhatsApp"
      style={{
        position: 'fixed',
        zIndex: 9998,
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        /* Posición responsive via CSS */
      }}
    >
      {/* Tooltip — solo visible en hover y en pantallas grandes */}
      <motion.span
        initial={{ opacity: 0, x: 8, scale: 0.95 }}
        style={{
          backgroundColor: '#1a1a1a',
          color: '#f5f5f5',
          fontSize: '0.78rem',
          fontWeight: 500,
          padding: '0.35rem 0.7rem',
          borderRadius: '6px',
          border: '1px solid #2a2a2a',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        className="whatsapp-tooltip group-hover:opacity-100"
      >
        ¡Escríbeme!
      </motion.span>

      {/* Botón circular principal */}
      <div
        style={{
          width: '52px',
          height: '52px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {/* Pulse ring animado */}
        <motion.div
          animate={{ scale: [1, 1.45, 1], opacity: [0.45, 0, 0.45] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid #25D366',
          }}
        />
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.007 12.039c0 2.12.556 4.189 1.609 6.01L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.04-5.405 12.043-12.041.002-3.218-1.248-6.242-3.517-8.511" />
        </svg>
      </div>
    </motion.a>
  )
}
