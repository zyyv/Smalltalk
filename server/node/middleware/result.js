const error = async (ctx, next) => {
  try {
    await next()
  } catch ({ status = 500, message, same = true, originalError }) {
    if (same) ctx.status = status
    ctx.body = {
      msg: originalError ? originalError.message : message,
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