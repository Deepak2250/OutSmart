import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',      // 👈 allows access from other devices
    port: 5173,           // 👈 default Vite port (change if needed)
  },
  plugins: [react(), tailwindcss()]
})
