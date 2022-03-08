/* jshint indent: 2 */
const moment = require('moment')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true},
      mobile: { type: DataTypes.STRING(500), allowNull: true },
      password: { type: DataTypes.STRING(500), allowNull: true }, // "https://thirdwx.qlogo.cn/mmopen/vi_32/P6jgrVJDHKVCbDSURQkXb5AWe78Yf59ccyniawZFayVbMiaJrGjD0papBPxUoXdyAEJZ3BszuDHsu0geuOVOTKOg/132"
      ctime: { type: DataTypes.INTEGER(10), allowNull: true }, // ""
    },
    {
      tableName: 'user'
    }
  )
}
