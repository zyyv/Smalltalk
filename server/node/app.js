const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const port = 9999
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

io.sockets.on('connection', (socket) => {
  console.log('已连接')
  socket.on("disconnect", () => {
    console.log('端开链接')
  });
});


server.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
});