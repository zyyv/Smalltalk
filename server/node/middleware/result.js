const error = async (ctx, next) => {
  try {
    await next()
  } catch ({ status = 500, message = 'Server internal error' }) {
    ctx.body = {
      msg: message,
      status
    }
  }
}

const success = async (ctx, next) => {
  await next()
  ctx.body = {
    status: 200,
    msg: 'success',
    data: {
      ...ctx.body
    }
  }
}

module.exports = {
  error,
  success
}