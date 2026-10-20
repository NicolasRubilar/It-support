// Genera los recursos del logo desde brand/logotipo-it-support.png (ejecutar: npm run logo)
// - src/assets/logo-blanco.{png,webp}: logo blanco con fondo transparente, para fondos oscuros
// - public/og.png: imagen para compartir el enlace (WhatsApp, redes)
import sharp from 'sharp'

const raiz = new URL('../', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const origen = `${raiz}brand/logotipo-it-support.png`

// Recorta el margen blanco
const recortado = await sharp(origen).flatten({ background: '#fff' }).trim({ threshold: 40 }).toBuffer()

// Blanco con transparencia: lo negro del logo pasa a ser opaco
const ancho = 480
const alpha = await sharp(recortado).resize({ width: ancho }).greyscale().negate().toColourspace('b-w').raw().toBuffer({ resolveWithObject: true })
const blanco = sharp({
  create: { width: alpha.info.width, height: alpha.info.height, channels: 3, background: '#fff' },
}).joinChannel(alpha.data, { raw: { width: alpha.info.width, height: alpha.info.height, channels: 1 } })
await blanco.clone().png({ compressionLevel: 9, palette: true }).toFile(`${raiz}src/assets/logo-blanco.png`)
await blanco.clone().webp({ quality: 90, alphaQuality: 90 }).toFile(`${raiz}src/assets/logo-blanco.webp`)

// Imagen para compartir: logo negro sobre el papel del sitio
const logoOg = await sharp(recortado).resize({ width: 860 }).toBuffer()
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#f4f3f0' } })
  .composite([{ input: logoOg, gravity: 'center', blend: 'multiply' }])
  .png({ compressionLevel: 9, palette: true })
  .toFile(`${raiz}public/og.png`)

console.log('✓ logo')
