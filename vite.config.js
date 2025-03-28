import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 构建产物部署在 GitHub Pages 子路径 /plato_vuecc/ 下；
// 本地 dev 仍以根路径启动，避免影响日常开发。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/plato_vuecc/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
}))
