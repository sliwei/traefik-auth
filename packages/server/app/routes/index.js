const router = require('koa-router')()
const swaggerJsdoc = require('swagger-jsdoc')
const { join } = require('path')

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      description: '服务端',
      version: '1.0.0',
      title: '服务端'
    },
    host: '',
    basePath: '/',
    tags: [
      {
        name: 'server',
        description: 'auth'
      },
    ],
    schemes: ['http', 'https'],
    // components: {
    //   schemas: {
    //     Order: {
    //       type: 'object'
    //     }
    //   },
    //   securitySchemes: {
    //     BasicAuth: { type: 'http', scheme: 'basic' }
    //   }
    // }
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [join(__dirname, '../controllers/*.js')]
}

const openapiSpecification = swaggerJsdoc(options)
// 数据校验
const parameter = require('../utils/parameter')
// token校验
const { checkToken } = require('../utils/tool/token')

const { index } = require('../controllers/index')
const { get, post } = require('../controllers/test')
const { fzf } = require('../controllers/fzf')
const { login, userinfo, logout } = require('../controllers/common')

// test
router.get('/server/api/test/get', get)
router.post('/server/api/test/post', post)
// common
router.post('/server/api/login', parameter, login)
router.get('/server/api/userinfo', checkToken, userinfo)
router.post('/server/api/logout', checkToken, logout)

// swagger
router.get('/server/api/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json')
  ctx.body = openapiSpecification
})
// index
router.get('/', index)
// fzf
router.get('*', index)

module.exports = router
