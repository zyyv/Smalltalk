const qiniu = require("qiniu")
const { Ak, Sk, Bucket, BucketDomain } = require('../config/qiniu')

function uptoken() {
  const mac = new qiniu.auth.digest.Mac(Ak, Sk)
  const options = {
    scope: Bucket,
    expires: 3600 * 24
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  return putPolicy.uploadToken(mac)
}

module.exports = {
  uptoken,
  async getUpToken(ctx) {
    return ctx.body = { token: uptoken(), domainUrl: BucketDomain }
  }
}