/**
 * 不需要验证的路由
 */
const unlessRoutes = ['/user/login', '/user/sendSmsCode'] //数组中的路径不需要通过jwt验证 支持正则
const prefix = '/api'

module.exports = unlessRoutes.map(it => prefix + it)