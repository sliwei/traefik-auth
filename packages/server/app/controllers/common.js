const {User} = require('../models')
const {createToken} = require('../utils/tool/token')
const conf = require('../config')
const moment = require("moment");

/**
 * @swagger
 * /server/api/login:
 *   post:
 *     tags:
 *       - server
 *     summary: 登录
 *     description: 说明
 *     requestBody:
 *       description: Pet object that needs to be added to the store
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: mobile
 *               password:
 *                 type: string
 *                 description: password
 *     responses:
 *       '200':
 *         description: 成功说明
 *       '400':
 *         description: 失败说明
 */
const login = async (ctx, next) => {
  const {mobile, password} = ctx.request.body

  let user_res = await User.findOne({
    where: {mobile, password}
  })

  if (ctx.state(user_res)) {
    ctx.DATA.code = 0
    ctx.DATA.message = '授权错误'
  } else {
    ctx.DATA.data = {
      ...user_res.dataValues,
      token: `${createToken({
        id: user_res.id,
        mobile: user_res.mobile,
      })}`
    }
  }
  ctx.body = ctx.json(ctx.DATA)
}

/**
 * @swagger
 * /server/api/userinfo:
 *   get:
 *     tags:
 *       - server
 *     summary: 用户信息
 *     description: 说明
 *     responses:
 *       '200':
 *         description: 成功说明
 *       '400':
 *         description: 失败说明
 */
const userinfo = async (ctx, next) => {
  ctx.DATA.data = {
    ...ctx.res.USER
  }
  ctx.body = ctx.json(ctx.DATA)
}

/**
 * @swagger
 * /server/api/logout:
 *   get:
 *     tags:
 *       - server
 *     summary: 用户信息
 *     description: 说明
 *     responses:
 *       '200':
 *         description: 成功说明
 *       '400':
 *         description: 失败说明
 */
const logout = async (ctx, next) => {
  // ctx.DATA.data = {
  //   ...ctx.res.USER
  // }
  // redis
  ctx.body = ctx.json(ctx.DATA)
}

module.exports = {login, userinfo, logout}
