const Router = require('koa-router')
const router = new Router()
const api = require('./api')
const { success } = require('../middleware/result')
// const web = require('./web')

router.use('/api', success, api.routes(), api.allowedMethods())
// router.use('/', web.routes(), web.allowedMethods())
module.exports = router