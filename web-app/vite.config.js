import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    proxy: mode === 'development'
      ? { '/api': 'http://localhost:4000' } // only proxy locally
      : undefined
  },
  plugins: [react()],
}))
