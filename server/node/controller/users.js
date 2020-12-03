const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema
const JWT = require('../utils/jwt')
const GENDER_ENUM = { male: 'male', female: 'female', unknow: 'unknow' }

const schema = new Schema({
  name: { type: String, default: null },
  phone: { type: String, default: null },
  pwd: { type: String, default: null },
  gender: { type: String, default: GENDER_ENUM.unknow },
  // avatar: { type: String, default: 'https://qiniu-shop.zoombin.com/avatar.jpg' },
  avatar: { type: String, default: null },
  sign: { type: String, default: null },
  admin: { type: Boolean, default: false },
  isnew: { type: Boolean, default: true },
  removed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
// https://qiniu-shop.zoombin.com/avatar.jpg

const model = mongoose.model('users', schema)

module.exports = {
  model,
  async list(ctx) {
    let { page, pagesize } = ctx.query
    page = Number(page)
    page = page ? page : 0
    pagesize = Number(pagesize)
    pagesize = pagesize ? pagesize : 20
    const skip = page * pagesize
    const query = { removed: false }
    const sorter = {}
    const data = await model.find(query).sort(sorter).skip(skip).limit(pagesize)
    const total = await model.countDocuments(query)
    return ctx.body = { data, total }
  },
  async remove(ctx) {
    const { _id } = ctx.request.body
    const one = await model.findById(_id)
    if (!one) throw new Error('账号不存在')
    one.removed = true
    await one.save()
    return ctx.body = null
  },
  async update(ctx) {
    const { name, pwd, avatar, sign, gender } = ctx.request.body
    const { _id } = ctx.state.user
    let one = await model.findById(_id).lean()
    if (!one) throw new Error('无效的_id')
    if (name) one.name = name
    if (pwd) one.pwd = pwd
    if (avatar) one.avatar = avatar
    if (sign) one.sign = sign
    if (gender) one.gender = gender
    one.isnew = false
    const res = await model.findOneAndUpdate({ _id }, { ...one }, { new: true }).lean()
    delete one.pwd
    delete one.admin
    delete one._id
    delete one.removed
    delete one.createdAt
    delete one.updatedAt
    return ctx.body = res
  },
  async login(ctx) {
    const { phone, pwd, type } = ctx.request.body
    const query = { phone }
    let one = await model.findOne(query).lean()
    if (!one) {
      const user = { phone, isnew: true, pwd: type === 'I' ? null : pwd }
      one = await model.create(user)
    } else if (type === 'II') {
      if (one.pwd !== pwd) {
        throw new Error('密码错误')
      }
    }
    const token = JWT.generateToken({ _id: one._id })
    // delete one.phone
    delete one.pwd
    delete one.admin
    delete one._id
    delete one.removed
    delete one.createdAt
    delete one.updatedAt
    return ctx.body = { token, userInfo: one }
  }
}