import { useEffect, useState } from 'react'

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // La duración total es de 3.2 segundos antes de iniciar el fade-out
    const timer1 = setTimeout(() => {
      setIsFadingOut(true)
    }, 3200)

    // Desmontar el componente después del fade-out (3.2s + 0.7s)
    const timer2 = setTimeout(() => {
      onComplete()
    }, 3900)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: 'none',
      }}
    >
      {/* ── Contenedor SVG de la "B." y el anillo ── */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <svg
          width="54"
          height="54"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          {/* Trazado animado de la letra B */}
          <path
            d="M 14 8 L 14 32 M 14 8 C 24 8 28 11 28 14 C 28 17 24 20 14 20 M 14 20 C 26 20 30 23 30 26 C 30 29 26 32 14 32"
            stroke="#7c3aed"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: '150',
              strokeDashoffset: '150',
              animation: 'drawB 2.2s ease-in-out forwards',
            }}
          />
          {/* El punto de la "B." que aparece de golpe */}
          <circle
            cx="34"
            cy="28"
            r="2.5"
            fill="#7c3aed"
            style={{
              animation: 'dotAppear 0.4s ease-out forwards',
              animationDelay: '1.9s', // Aparece justo cuando termina de dibujarse
              opacity: 0,
              transformOrigin: '34px 28px',
            }}
          />
          {/* Anillo de expansión (pulse) */}
          <circle
            cx="34"
            cy="28"
            r="12"
            fill="none"
            stroke="#7c3aed"
            style={{
              animation: 'ringExpand 1s ease-out forwards',
              animationDelay: '2.0s',
              opacity: 0,
              transformOrigin: '34px 28px',
            }}
          />
        </svg>
      </div>

      {/* ── Línea de progreso ── */}
      <div
        style={{
          width: '60px',
          height: '1px',
          backgroundColor: '#222222',
          marginBottom: '1rem',
          overflow: 'hidden',
          borderRadius: '2px',
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: '#7c3aed',
            width: '0%',
            animation: 'lineGrow 2.2s ease-in-out forwards',
          }}
        />
      </div>

      {/* ── Texto de marca ── */}
      <div
        style={{
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: '#666666',
          animation: 'labelFade 0.6s ease-out forwards',
          animationDelay: '2.4s',
          opacity: 0,
        }}
      >
        Benjamín · Portfolio
      </div>
    </div>
  )
}
