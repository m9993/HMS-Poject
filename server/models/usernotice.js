'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserNotice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Notice, { foreignKey: 'noticeId', as:'notice'});
      this.belongsTo(models.User, { foreignKey: 'userId', as:'user'});
    }
  }
  UserNotice.init({
  }, {
    sequelize,
    modelName: 'UserNotice',
    tableName: 'user_notices',
  });
  return UserNotice;
};