import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Incrusta el CSS en el HTML: el sitio es una sola página y el CSS es pequeño,
// así el navegador pinta sin esperar una petición extra que bloquea el render.
function inlineCss() {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        for (const [file, asset] of Object.entries(bundle ?? {})) {
          if (!file.endsWith('.css') || asset.type !== 'asset') continue
          const link = new RegExp(`<link rel="stylesheet"[^>]*?href="/${file}"[^>]*>`)
          if (!link.test(html)) continue
          html = html.replace(link, () => `<style>${asset.source}</style>`)
          delete bundle[file]
        }
        return html
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss()],
})
