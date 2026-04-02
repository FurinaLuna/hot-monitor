import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const proxyConfig = process.env.VERCEL ? undefined : {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true
  },
  '/socket.io': {
    target: 'http://localhost:3001',
    ws: true
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: proxyConfig
  }
})
