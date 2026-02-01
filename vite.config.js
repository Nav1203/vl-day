import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For user/organization pages (username.github.io), use '/'
  // For project pages (username.github.io/repo-name), use '/repo-name/'
  base: '/vl-day/',
})

