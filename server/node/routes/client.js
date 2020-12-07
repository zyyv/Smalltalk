const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')

function render() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../public/client/index.html'), 'utf8', (err, data) => {
      err ? reject(err) : resolve(data)
    });
  });
}

router.get('/', async (ctx) => {
  const data = await render()
  ctx.body = data
})

module.exports = router