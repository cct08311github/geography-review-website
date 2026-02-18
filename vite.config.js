import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import packageJson from './package.json'

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/geography-review-website/' : '/',
  define: {
    '__APP_VERSION__': JSON.stringify(packageJson.version),
    // 每次 Build 時生成當前時間
    '__BUILD_TIME__': JSON.stringify(new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false }))
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          vuetify: ['vuetify']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
