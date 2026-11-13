import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 构建产物部署在 GitHub Pages 子路径 /plato_vuecc/ 下；
// 本地 dev 仍以根路径启动，避免影响日常开发。
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/plato_vuecc/' : '/',
  plugins: [
    vue(),
    // 按需引入 Element Plus：组件与 API 在使用时才会进入产物，样式随组件加载。
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver({ importStyle: 'css' })],
      dts: false,
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'css' })],
      dts: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
}))
