import { useEffect, useState } from 'react'
import { contacto } from '../data/content'

const DIAS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

// Hora actual en Chile, independiente de la zona horaria del visitante
function ahoraEnChile() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Santiago',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t) => partes.find((p) => p.type === t)?.value
  return { dia: DIAS[get('weekday')], minutos: Number(get('hour')) * 60 + Number(get('minute')) }
}

function calcular() {
  const { dias, abre, cierra } = contacto.horario
  const { dia, minutos } = ahoraEnChile()
  return dias.includes(dia) && minutos >= abre && minutos < cierra
}

export default function useOpenStatus() {
  const [abierto, setAbierto] = useState(calcular)

  useEffect(() => {
    const id = setInterval(() => setAbierto(calcular()), 60_000)
    return () => clearInterval(id)
  }, [])

  return abierto
}
