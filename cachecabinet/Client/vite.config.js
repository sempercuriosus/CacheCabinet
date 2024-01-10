import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
		//port: process.env.VITE_PORT || 3001,
        open: true,
		proxy: {
			'^/graphql*': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				//rewrite: (path) => path.replace(/^\/api/, ''),
			},
			'^/api*': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				//rewrite: (path) => path.replace(/^\/api/, ''),
			},
			'^/api/v1*': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				//rewrite: (path) => path.replace(/^\/api\/v1/, ''),
			},
			'^/assets*': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				//rewrite: (path) => path.replace(/^\/api/, ''),
			}
		}
  }
})
