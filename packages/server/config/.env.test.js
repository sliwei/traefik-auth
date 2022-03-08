'use strict'

module.exports = {
  env: 'test',
  api_url: {
  },
  db: {
    database: 'db',
    username: 'dbuser',
    password: 'dbpassword',
    conf: {
      host: 'localhost',
      port: '3306',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        insecureAuth: true,
        timestamps: false,
      },
      timezone: '+08:00'
    },
  }
}
