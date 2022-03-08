/**
 * 数据校验
 * wiki：https://github.com/node-modules/parameter/blob/master/example.js
 * @type {Parameter}
 */
const { HttpError } = require('../../utils/tool/error')
const Parameter = require('parameter')
const parm = new Parameter()

// 自定义校验
parm.addRule('name', function (e, v) {
  let sta = /^[a-z]$/.test(v)
  return sta || '只能输入一个字母'
})

// 路由校验列表
const ruleList = {
  // 登录
  'post/server/api/login': {
    mobile: { type: 'string', required: true },
    password: { type: 'string', required: true },
  },
}

/**
 * 校验方法
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const parameter = async (ctx, next) => {
  let errors, data
  let method = 'get'
  if (ctx.request.method === 'GET') {
    data = ctx.query
  } else {
    method = 'post'
    data = ctx.request.body
  }
  console.log(method, data)
  try {
    let name = ctx.req._parsedUrl.pathname
    errors = parm.validate(ruleList[method + name], data)
  } catch (e) {
    throw new HttpError(0, e.toString())
  }
  if (errors && errors.length) {
    ctx.DATA.data = errors
    throw new HttpError(0, '数据校验未通过')
  }
  await next()
}

module.exports = parameter
