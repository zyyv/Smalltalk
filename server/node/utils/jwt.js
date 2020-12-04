const jwt = require('jsonwebtoken')
const secert = 'chris' // 密钥
const expiresIn = 1000 * 60 * 60 * 24 * 7 // 过期时间

module.exports = {
  key: secert,
  expiresIn,
  //生成token
  generateToken: (payload) => jwt.sign(payload, secert, { expiresIn }),
  // 校验token
  // verifyToken: (token) => {
  //   let result;
  //   try {
  //     jwt.verify(token, secert, (err, data) => {
  //       if (err) result = 'error'
  //       else result = data
  //     })
  //   } catch (err) {
  //     result = 'error'
  //   }
  //   return result
  // }
}