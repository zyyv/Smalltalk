const { resolve } = require('path')

const pathResolve = (src: string) => resolve(__dirname, src)

module.exports = {
  alias: {
    '/@/': pathResolve('src'),
    '/@c/': pathResolve('src/components'),
  },
  optimizeDeps: {
    include: ['ant-design-vue', '@ant-design-vue/use', '@ant-design/icons-vue', 'vue-socket.io'],
  },
  proxy: {
    '/api': {
      target: 'http://localhost:9999/api',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, '')
    }
  }
}
