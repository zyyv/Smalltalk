import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
const pathResolve = (src: string) => resolve(__dirname, src)
const pathName = '/chat'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '.',
  resolve: {
    alias: {
      '@': pathResolve('src'),
      '@c': pathResolve('src/components')
    }
  },
  build: {
    outDir: pathResolve(`../build${pathName}`)
  },
  optimizeDeps: {
    include: ['ant-design-vue', '@ant-design-vue/use', '@ant-design/icons-vue', 'vue-socket.io']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999/api',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
})
