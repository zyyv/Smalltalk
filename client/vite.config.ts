const { resolve } = require('path')

const pathResolve = (src: string) => resolve(__dirname, src)

module.exports = {
  outDir: pathResolve('../server/node/public/client'),
  alias: {
    '/@/': pathResolve('src'),
    '/@c/': pathResolve('src/components'),
  },
  // 引入第三方配置
  optimizeDeps: {
    include: ['ant-design-vue', '@ant-design-vue/use', '@ant-design/icons-vue'],
  },
  proxy: {
    '/api': {
      target: process.env.NODE_ENV === 'development' ? 'http://localhost:9999/api' : '47.103.219.72:9999/api',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, '')
    }
  }
}
