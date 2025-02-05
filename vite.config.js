import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/proyecto-api-pokemon/', // Esto asegura que la página principal sea como http://localhost:5173/
  server: {
    hmr: true,
  },
});