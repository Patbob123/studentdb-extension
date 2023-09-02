import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chromeExtension } from 'vite-plugin-chrome-extension'
import { ViteComponents } from 'vite-plugin-components'

import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: 'src/manifest.json',
    },
  },
  plugins: [
    react(), 
    ViteComponents ({
      extensions: ['react'],
      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    ViteIcons(),
    chromeExtension()],
})
