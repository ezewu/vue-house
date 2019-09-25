const svgCaptcha = require('svg-captcha')
const nanoid = require('nanoid')
const User = require('../models/users')
const redis = require('../redis')
//用户登陆
exports.verify = async(ctx, next) => {
  let { tel, name, code } = ctx.request.body
  let captcha = ctx.session.captcha
  let resData = await User.findOne({ tel, name })
  if (!resData || resData.length) {
    ctx.body = {
      success: false,
      msg: '用户姓名与手机号不匹配'
    }
    return
  }
  if (code !== captcha) {
    ctx.body = {
      success: false,
      msg: '输入正确的图形验证码'
    }
    return
  }
  let { _id } = resData
  let tokenKey = nanoid(128)
  let seaveToken = await redis.setString(tokenKey, _id, 7200 * 8)
  ctx.body = {
    success: true,
    msg: '登录成功',
    token: tokenKey,
    users: {
      tel: resData.tel,
      name: resData.name
    }
  }
}

//验证表单是否为空
exports.hasBody = async(ctx, next) => {
  let body = ctx.request.body || {}
  if (Object.keys(body).length === 0) {
    ctx.body = {
      success: false,
      msg: '是不是漏掉什么了'
    }
    return next
  }
  await next()
}

//验证Token是否过期
exports.hasToken = async(ctx, next) => {
  let accessToken = ctx.header.authorization
  if (!accessToken) {
    ctx.body = {
      code: 204,
      success: false,
      msg: '钥匙丢了'
    }
    return next
  }
  let userToken = await redis.getString(accessToken)
  if (!userToken) {
    ctx.body = {
      code: 204,
      success: false,
      msg: 'token过期 重新登录'
    }
    return next
  }
  ctx.session = ctx.session || {}
  ctx.session.token = userToken
  await next()
}


//生成验证码
exports.captcha = async(ctx, next) => {
  let codeConfig = {
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    color: true,
    fontSize: 60 //验证码文本大小
  }
  let captcha = svgCaptcha.create(codeConfig)
  ctx.session.captcha = captcha.text.toLowerCase()
  ctx.type = 'svg'
  ctx.body = captcha.data
}
