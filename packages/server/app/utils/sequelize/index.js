const Sequelize = require('sequelize')
const { db, mode } = require('../../config')
var args = process.argv.splice(2)
const sequelize = new Sequelize(args[0] || db.database, args[1] || db.username, args[2] || db.password, {
  ...db.conf,
  host: args[3] || db.conf.host,
  port: args[4] || db.conf.port,
})

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功'.green)
    // if (mode !== 'development') {
      sequelize.sync({ alter: true })
    // }
  })
  .catch((err) => {
    console.log('数据库连接失败'.red)
  })

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
