import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
server: {
    watch: {
      usePolling: true, // Helps Docker detect file changes on Windows/macOS
    },
    host: true, // Needed to listen on the Docker network
    port: 5173,
  },
  plugins: [react(), tailwindcss()],
})
