import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  },
  server: {
    proxy: {
      '/api': {
        target: mode === "production" ? 'https://motivibe.live' : 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
}));
