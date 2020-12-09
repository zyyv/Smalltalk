const axios = require('axios')

/**
 * 获取几位随机数字
 * @param {number} n 
 */
const getRandomNumber = (n) => String(Math.random()).substring(2, n + 2)

/**
 * 多少分钟
 * @param {number} num 
 */
const num2Time = (num) => ({
  timestamp: num * 1000 * 60,
  text: `${num}分钟`
})

/**
 * 自定义Error
 * @param {string} msessage 错误消息
 * @param {number} status 状态码 默认200
 * @param {boolean} same 是否一起更改ctx的状态码
 */
const useError = (msessage, status = 200, same = true) => {
  const error = new Error(msessage)
  error.status = status
  error.same = same
  return error
}

const getImageInfo = url => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}?imageInfo`, {}).then(res => {
      resolve(res.data)
    }).catch(() => {
      resolve(null)
    })
  })
}

module.exports = {
  getRandomNumber,
  num2Time,
  useError,
  getImageInfo
}