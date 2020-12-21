const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const router = require('../routes')
const path = require('path')
const port = 9999
const creatSocket = require('../socket')
const bodyParser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const cors = require('koa2-cors')
const static = require('koa-static')
const { Connect } = require('../config/db')
const { error } = require('../middleware/result')

module.exports = {
  app,
  server,
  creatSocket,
  bodyParser,
  xmlParser,
  cors,
  static,
  router,
  dbConnect: Connect,
  error,
  path,
  port,
}
