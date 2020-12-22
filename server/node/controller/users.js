const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema
const JWT = require('../utils/jwt')
const { getRandomNumber, num2Time, useError } = require('../utils')
const GENDER_ENUM = { male: 'male', female: 'female', unknow: 'unknow' }
const expMins = 1 // 验证码过期时间 分钟
const smsCodeExp = num2Time(expMins)

const userSchema = new Schema({
  name: { type: String, default: null },
  phone: { type: String, default: null },
  pwd: { type: String, default: null },
  gender: { type: String, default: GENDER_ENUM.unknow },
  avatar: { type: String, default: null },
  sign: { type: String, default: null },
  admin: { type: Boolean, default: false },
  isnew: { type: Boolean, default: true },
  sort: { type: Number, default: 100 },
  friends:[{ type: Schema.Types.ObjectId, ref: 'users' }],
  removed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
const smsCodeSchema = new Schema({
  phone: { type: String, default: null },
  code: { type: String, default: null },
  expiresIn: { type: Date, default: null },
  sort: { type: Number, default: 100 }
})
// https://qiniu-shop.zoombin.com/avatar.jpg

const userModel = mongoose.model('users', userSchema)
const smsCodeModel = mongoose.model('smscodes', smsCodeSchema)

module.exports = {
  userModel,
  smsCodeModel,
  async sendSmsCode(ctx) {
    const { phone } = ctx.request.body
    if (!phone) throw useError('请输入手机号', 401, false)
    const code = getRandomNumber(4)
    const one = { phone, code, expiresIn: new Date(Date.now() + smsCodeExp.timestamp) }
    await smsCodeModel.deleteOne({ phone })
    await smsCodeModel.create(one)
    const text = `【SmallTalk】您的验证码为：${code}，${smsCodeExp.text}内有效。`
    return ctx.body = { text }
  },
  async list(ctx) {
    let { page, pagesize } = ctx.query
    page = Number(page)
    page = page ? page : 0
    pagesize = Number(pagesize)
    pagesize = pagesize ? pagesize : 20
    const skip = page * pagesize
    const query = { removed: false }
    const sorter = {}
    const data = await userModel.find(query).sort(sorter).skip(skip).limit(pagesize)
    const total = await userModel.countDocuments(query)
    return ctx.body = { data, total }
  },
  async remove(ctx) {
    const { _id } = ctx.request.body
    const one = await userModel.findById(_id)
    if (!one) throw useError('账号不存在', 401, false)
    one.removed = true
    await one.save()
  },
  async update(ctx) {
    const { name, pwd, avatar, sign, gender } = ctx.request.body
    const { _id } = ctx.state.user
    let one = await userModel.findById(_id).lean()
    if (!one) throw useError('账号不存在', 401, false)
    if (name) one.name = name
    if (pwd) one.pwd = pwd
    if (avatar) one.avatar = avatar
    if (sign) one.sign = sign
    if (gender) one.gender = gender
    one.isnew = false
    one.updatedAt = new Date()
    const res = await userModel.findOneAndUpdate({ _id }, { ...one }, { new: true }).lean()
    delete res.pwd
    delete res.admin
    delete res._id
    delete res.removed
    delete res.createdAt
    delete res.updatedAt
    return ctx.body = res
  },
  async login(ctx) {
    const { phone, code, pwd, type } = ctx.request.body
    const query = { phone }
    let item = {}
    if (type === 'I') { // smscode
      const one = await smsCodeModel.findOne(query)
      if (!one) throw useError('没有下发验证码', 401, false)
      if (code !== one.code) throw useError('请输入正确的验证码', 401, false)
      const now = +new Date()
      const exp = +new Date(one.expiresIn)
      if (now >= exp) throw useError('验证码已过期', 401, false)
      // 验证通过
      item = await userModel.findOne(query).lean()
      if (!item) {
        const one = { phone, isnew: true }
        item = await userModel.create(one)
      }
    } else { // pwd
      if (!pwd) throw useError('请输入密码', 401, false)
      item = await userModel.findOne(query).lean()
      // if (!item) {
      //   throw useError('用户不存在', 401, false)
      // } else if (item.pwd !== pwd) throw useError('密码错误', 401, false)
      if (!item) {
        throw useError('用户不存在', 401, false)
      } else {
        if (item.pwd) {
          if (item.pwd !== pwd) throw useError('密码错误', 401, false)
        } else {
          // 初始密码 111111
          if ('111111' !== pwd) throw useError('密码错误', 401, false)
        }
      }
    }
    const token = JWT.generateToken({ _id: item._id })
    const userInfo = {
      name: item.name,
      phone: item.phone,
      gender: item.gender,
      avatar: item.avatar,
      sign: item.sign,
      isnew: item.isnew
    }
    return ctx.body = { token, userInfo }
  }
}