import { useImperativeHandle, useLayoutEffect, useRef } from 'react'

// El cable del logotipo: sale desde la "I", subraya el nombre y sube hasta el mouse.
// La animación recorre el trazo con el mouse por delante, dibujando el cable a su paso.
const CABLE = 'M14 22C2 52 30 74 110 78C360 86 620 52 870 56C955 58 996 62 1012 22'
// Punto final y ángulo de la tangente: el estado quieto (y el inicial antes de JS)
const FIN = 'translate(1012 22) rotate(-68.2)'
const DURACION = 1700
const PAUSA = 0.12

// Arranque suave y llegada lenta, como alguien que arrastra el mouse con calma
const suavizar = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

const reducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CableMouse({ ref }) {
  const trazo = useRef(null)
  const mouse = useRef(null)
  const frame = useRef(0)

  // Ubica el mouse en la fracción p del cable y deja dibujado solo hasta ahí
  const pintar = (p) => {
    const path = trazo.current
    const largo = path.getTotalLength()
    const l = Math.max(0, Math.min(largo, p * largo))
    const a = path.getPointAtLength(Math.max(0, l - 0.5))
    const b = path.getPointAtLength(Math.min(largo, l + 0.5))
    const punto = path.getPointAtLength(l)
    const angulo = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
    mouse.current.setAttribute('transform', `translate(${punto.x} ${punto.y}) rotate(${angulo})`)
    path.style.strokeDashoffset = String(1 - p)
  }

  const animar = () => {
    if (frame.current || reducido() || !trazo.current) return
    const inicio = performance.now()
    const paso = (ahora) => {
      const t = Math.min(1, (ahora - inicio) / DURACION)
      pintar(suavizar(Math.max(0, (t - PAUSA) / (1 - PAUSA))))
      frame.current = t < 1 ? requestAnimationFrame(paso) : 0
    }
    pintar(0)
    frame.current = requestAnimationFrame(paso)
  }

  useImperativeHandle(ref, () => ({ animar }))

  // Antes de pintar, para que el primer cuadro ya sea el mouse en la partida.
  // Al desmontar se cancela y se deja en reposo: en StrictMode React monta dos veces
  // y, sin reiniciar `frame`, el segundo montaje creía que seguía animando.
  useLayoutEffect(() => {
    animar()
    return () => {
      cancelAnimationFrame(frame.current)
      frame.current = 0
    }
  }, [])

  return (
    <svg className="cable" viewBox="0 0 1000 90" aria-hidden="true" focusable="false">
      <path ref={trazo} className="cable__line" d={CABLE} pathLength="1" strokeDasharray="1" />
      <g ref={mouse} className="cable__mouse" transform={FIN}>
        {/* Dibujado mirando hacia +x: el cable entra por la cola (0,0) */}
        <ellipse cx="33" cy="0" rx="33" ry="19" />
        <path className="cable__seam" d="M53 0h13" />
        <rect className="cable__seam" x="41" y="-3.4" width="10" height="6.8" rx="3.4" />
      </g>
    </svg>
  )
}
