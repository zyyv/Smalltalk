const {
  app,
  server,
  path,
  port,
  router,
  creatSocket,
  bodyParser,
  xmlParser,
  cors,
  static,
  dbConnect,
  error
} = require('./utils/init')
dbConnect()

app.use(error)
app.use(xmlParser())
app.use(bodyParser())
app.use(cors())
app.use(static(path.resolve(__dirname, './public/client')))
app.use(router.routes()).use(router.allowedMethods())

creatSocket(server)
server.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})
