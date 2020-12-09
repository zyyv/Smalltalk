const Router = require('koa-router')
const router = new Router()
const { getImageInfo } = require('../utils')

const qiniuCtrl = require('../controller/qiniu')
router.get('/qiniu/token', qiniuCtrl.getUpToken)

const UserCtrl = require('../controller/users')
router.post('/user/login', UserCtrl.login)
router.post('/user/update', UserCtrl.update)
router.post('/user/remove', UserCtrl.remove)
router.get('/user/list', UserCtrl.list)
router.post('/user/sendSmsCode', UserCtrl.sendSmsCode)

const ZoneCtrl = require('../controller/zone')
router.get('/zone/list', ZoneCtrl.list)
router.post('/zone/create', ZoneCtrl.create)
router.post('/zone/createComment', ZoneCtrl.createComment)
router.post('/zone/liked', ZoneCtrl.liked)
router.post('/zone/disliked', ZoneCtrl.disliked)



router.get('/a', async (ctx) => {
  const url = 'https://qiniu-shop.zoombin.com/avatar.jpg'
  const res = await getImageInfo(url)
  console.log(res)
  ctx.body = res
})
router.get('/', async (ctx) => {
  // console.log(ctx.state)

  // throw new Error('test error')
  // ctx.status = 504
  // const err = new Error('test error')
  // err.status = 504
  // throw err
  ctx.body = {
    msg: 'hello koa'
  }
})


module.exports = router