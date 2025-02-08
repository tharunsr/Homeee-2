import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173, // Change this to any available port
  },
  plugins: [react()],
})
