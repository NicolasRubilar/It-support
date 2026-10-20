import { siglas } from '../data/content'

// Envuelve cada sigla conocida del texto en <abbr title>: tooltip al pasar el mouse
// y expansión para lectores de pantalla. El resto del texto queda igual.
const patron = new RegExp(`(?<![\\w-])(${Object.keys(siglas).join('|')})(?![\\w-])`, 'g')

export default function Siglas({ texto }) {
  const partes = texto.split(patron)
  if (partes.length === 1) return texto
  return partes.map((p, i) => (i % 2 ? <abbr key={i} title={siglas[p]}>{p}</abbr> : p))
}
