import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import packageJson from './package.json'

export default defineConfig({
  plugins: [vue()],
  define: {
    '__APP_VERSION__': JSON.stringify(packageJson.version),
    '__BUILD_TIME__': JSON.stringify(new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }))
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
