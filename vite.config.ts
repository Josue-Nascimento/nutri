import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/secondary/", // 👈 caminho base do site
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})