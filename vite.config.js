import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Cabeceras de seguridad. Las mismas están en public/.htaccess (cPanel / Apache),
// public/_headers (Netlify / Cloudflare Pages) y en vercel.json; aquí se aplican a `vite preview` para poder probarlas en local.
const securityHeaders = {
  'Content-Security-Policy': "frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

// Política de contenido estricta, como <meta> para que viaje con el HTML en cualquier hosting:
// solo scripts propios y solo el CSS incrustado (autorizado por su hash, sin 'unsafe-inline').
function csp(styleHashes) {
  return [
    "default-src 'self'",
    "script-src 'self'",
    `style-src 'self' ${styleHashes.map((h) => `'sha256-${h}'`).join(' ')}`,
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

// Incrusta el CSS en el HTML: el CSS es pequeño, así el navegador pinta sin esperar
// una petición extra que bloquea el render. Ambas páginas comparten el mismo archivo,
// por eso se guarda al sacarlo del bundle y se reutiliza en la siguiente página.
// Después agrega la CSP con el hash de cada bloque <style> incrustado.
function inlineCss() {
  const incrustados = new Map()
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        for (const [file, asset] of Object.entries(bundle ?? {})) {
          if (file.endsWith('.css') && asset.type === 'asset') incrustados.set(file, asset.source)
        }
        const hashes = []
        for (const [file, source] of incrustados) {
          const link = new RegExp(`<link rel="stylesheet"[^>]*?href="/${file}"[^>]*>`)
          if (!link.test(html)) continue
          html = html.replace(link, () => `<style>${source}</style>`)
          hashes.push(createHash('sha256').update(source).digest('base64'))
          delete bundle[file]
        }
        const meta = `<meta http-equiv="Content-Security-Policy" content="${csp(hashes)}" />`
        return html.replace('<meta charset="UTF-8" />', (m) => `${m}\n    ${meta}`)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss()],
  preview: {
    headers: securityHeaders,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        orden: resolve(import.meta.dirname, 'orden/index.html'),
        legal: resolve(import.meta.dirname, 'legal/index.html'),
      },
    },
  },
})
