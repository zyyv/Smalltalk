const mongoose = require('mongoose')
const { useError } = require('../utils')
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema

const PostSchema = new Schema({
  content: { type: String, default: null },
  // images: { type: Array, default: [] },
  images: [{ type: String, default: null }],
  location: { type: String, default: null },
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  author: { type: Schema.Types.ObjectId, ref: 'users' },
  active: { type: Boolean, default: true },
  sort: { type: Number, default: 100 },
  removed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'users' },
  content: { type: String, default: null },
  replyed: { type: Schema.Types.ObjectId, ref: 'comments', default: null }, // 回复的哪一条评论
  removed: { type: Boolean, default: false }, // 删评
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const postModel = mongoose.model('posts', PostSchema)
const commentModel = mongoose.model('comments', CommentSchema)

module.exports = {
  postModel,
  commentModel,
  async list(ctx) {
    let { page, pagesize } = ctx.query
    const { _id } = ctx.state.user
    page = Number(page)
    page = page ? page : 0
    pagesize = Number(pagesize)
    pagesize = pagesize ? pagesize : 20
    const skip = page * pagesize
    const sort = { createdAt: -1 }
    const query = { removed: false }
    let data = await postModel.find(query).sort(sort).skip(skip).limit(pagesize).populate([
      { path: 'author', select: { name: 1, avatar: 1 } },
      { path: 'likes', select: { name: 1, avatar: 1 } },
      {
        path: 'comments',
        populate: [{
          path: 'author',
          select: { name: 1, avatar: 1 },
        }, {
          path: 'replyed',
          populate: { path: 'author', select: { name: 1, avatar: 1 } }
        }]
      },
    ]).lean()
    data = data.map(it => ({ ...it, isliked: it.likes.some(el => el._id == _id) }))
    const total = await postModel.countDocuments(query)
    return ctx.body = { data, total }
  },
  async create(ctx) {
    const { content, images, location = '成都市' } = ctx.request.body
    if (!content && !images) throw useError('请发布文案或者图片', 401, false)
    let imageList = []
    if (images) imageList = images.split(',')
    const { _id } = ctx.state.user
    const one = {
      content,
      location,
      images: imageList,
      author: _id
    }
    await postModel.create(one)
  },
  async createComment(ctx) {
    const { postId, content, replyed } = ctx.request.body
    const post = await postModel.findById(postId)
    if (!post) throw useError('帖子不存在', 401)
    if (!content) throw useError('评论内容不允许为空', 401, false)
    const { _id } = ctx.state.user
    const one = { author: _id, content }
    if (replyed) one.replyed = replyed
    const item = await commentModel.create(one)
    post.comments.push(item._id)
    await post.save()
  },
  async liked(ctx) {
    const { postId } = ctx.request.body
    const { _id } = ctx.state.user
    const one = await postModel.findById(postId)
    if (!one) throw useError('帖子不存在', 401)
    const index = one.likes.indexOf(_id)
    if (index >= 0) throw useError('您已经点赞该帖子', 401, false)
    one.likes.push(_id)
    await one.save()
  },
  async disliked(ctx) {
    const { postId } = ctx.request.body
    const { _id } = ctx.state.user
    const one = await postModel.findById(postId)
    if (!one) throw useError('帖子不存在', 401)
    const index = one.likes.indexOf(_id)
    if (index < 0) throw useError('您没有点赞该帖子', 401, false)
    one.likes.splice(index, 1)
    await one.save()
  }
}