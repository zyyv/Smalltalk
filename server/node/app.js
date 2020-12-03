const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const cors = require('koa2-cors')
const static = require('koa-static')
const router = require('./routes')
const { Connect } = require('./config/db')
Connect()
const { error } = require('./middleware/result')
const koaJwt = require('koa-jwt')
const { key } = require('./utils/jwt')
const unlessRoutes = require('./config/unless')
const path = require('path')

// console.log('环境变量：', process.env.NODE_ENV)
app.use(static(path.resolve(__dirname, '../../public/web')))
app.use(xmlParser())
app.use(bodyParser())
app.use(cors())
app.use(koaJwt({ secret: key, passthrough: true }).unless({
  path: unlessRoutes
}))
app.use(error).use(router.routes()).use(router.allowedMethods())

const port = 9999
app.listen(port, () => {
  console.log(`server listening on ${port}`)
});