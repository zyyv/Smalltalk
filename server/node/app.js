const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const cors = require('koa2-cors')
const static = require('koa-static')
const router = require('./routes')
require('./config/db').Connect()
const path = require('path')
const { error } = require('./middleware/result')

app.use(error)
app.use(xmlParser())
app.use(bodyParser())
app.use(cors())
app.use(static(path.resolve(__dirname, './public/client')))
app.use(router.routes()).use(router.allowedMethods())

const port = 9999
app.listen(port, () => {
  console.log(`server listening on ${port}`)
});