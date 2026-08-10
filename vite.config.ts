/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { rutasEstaticas } from './src/config/rutas'
import { seoArchivos } from './plugins/seo-archivos'

export default defineConfig({
  plugins: [vue(), seoArchivos()],
  css: {
    preprocessorOptions: {
      scss: {
        // OJO: este archivo se inyecta en TODOS los bloques SCSS. No debe emitir
        // CSS, solo variables/mixins/funciones. Ver la cabecera de index.scss.
        additionalData: `@use "@/styles/index.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Las rutas con :slug no se pueden descubrir solas.
    includedRoutes: () => rutasEstaticas(),
    // GSAP/ScrollTrigger tocan window al importarse: se mockean en Node.
    mock: true,
  },
})
