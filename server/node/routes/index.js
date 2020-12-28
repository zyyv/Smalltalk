const Router = require('koa-router')
const router = new Router()
const koaJwt = require('koa-jwt')
const { key } = require('../utils/jwt')
const unlessRoutes = require('../config/unless')
const { success } = require('../middleware/result')
const api = require('./api')
// const client = require('./client')

// router.use('/', client.routes(), client.allowedMethods())
router.use(koaJwt({ secret: key }).unless({
  path: unlessRoutes
}))
router.use('/api', success, api.routes(), api.allowedMethods())
module.exports = router