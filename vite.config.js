import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/proyecto-api-pokemon/',  // 📌 Asegura que coincide con tu repositorio de GitHub Pages
  server: {
    hmr: true,
  },
});