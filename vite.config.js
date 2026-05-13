import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'motion-design-case-studies': resolve(__dirname, 'motion-design-case-studies.html'),
        pricing: resolve(__dirname, 'pricing_test.html'),
      },
    },
  },
})
