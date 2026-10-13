// Genera versiones AVIF y WebP de las fotos de src/assets (ejecutar: npm run images)
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'

const dir = new URL('../src/assets/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')

for (const file of await readdir(dir)) {
  if (!file.endsWith('.jpg')) continue
  const { name } = parse(file)
  const src = sharp(join(dir, file))
  await src.clone().avif({ quality: 55, effort: 6 }).toFile(join(dir, `${name}.avif`))
  await src.clone().webp({ quality: 72 }).toFile(join(dir, `${name}.webp`))
  console.log(`✓ ${name}`)
}
