const { resolve } = require('path')

const pathResolve = (src: string) => resolve(__dirname, src)

module.exports = {
  port: 3000,
  outDir: pathResolve('../server/node/public/client'),
  alias: {
    '/@/': pathResolve('src'),
    '/@c/': pathResolve('src/components'),
  },
  optimizeDeps: {
    include: ['ant-design-vue', '@ant-design-vue/use', '@ant-design/icons-vue'],
  },
  proxy: {
    '/api': {
      target: 'http://localhost:9999/api',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, '')
    }
  }
}
