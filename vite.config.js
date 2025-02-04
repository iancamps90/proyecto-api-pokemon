import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Esto asegura que la página principal sea http://localhost:5173/
  server: {
    hmr: true,
  },
});