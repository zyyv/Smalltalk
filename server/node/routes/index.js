const Router = require('koa-router')
const router = new Router()
const koaJwt = require('koa-jwt')
const { key } = require('../utils/jwt')
const unlessRoutes = require('../config/unless')
const { success } = require('../middleware/result')
const api = require('./api')
// const web = require('./web')

router.use(success)
router.use(koaJwt({ secret: key }).unless({
  path: unlessRoutes
}))
router.use('/api', api.routes(), api.allowedMethods())
// router.use('/', web.routes(), web.allowedMethods())
module.exports = router