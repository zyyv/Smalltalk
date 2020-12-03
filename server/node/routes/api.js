const Router = require('koa-router')
const router = new Router()

const qiniuCtrl = require('../controller/qiniu')
router.get('/qiniu/token', qiniuCtrl.getUpToken)

const UserCtrl = require('../controller/users')
router.post('/user/login', UserCtrl.login)
router.post('/user/update', UserCtrl.update)
router.post('/user/remove', UserCtrl.remove)
router.get('/user/list', UserCtrl.list)

router.get('/', async (ctx) => {
  // console.log(ctx.state.user._id)
  // console.log(JWT.generateToken({ _id: 'xxxx' }))
  // throw new Error('test error')
  ctx.body = {
    msg: 'hello koa'
  }
})
router.get('/user/sendSmsCode', async (ctx) => {
  const code = String(Math.random()).substring(2, 6)
  const text = `【SmallTalk】您的验证码为：${code}，请及时输入验证。`
  return ctx.body = { code, text }
})

module.exports = router