'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Seat, { foreignKey: 'seatId', as: 'assignedSeat' });
      this.hasMany(models.Payment, { foreignKey: 'userId', as:'payments'});
      this.belongsToMany(models.Notice, { foreignKey: 'userId', through: 'user_notices', as: 'userNotices' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    type: DataTypes.ENUM('1', '2'),
    nid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    defaultScope: {
      // exclude password by default
      attributes: { exclude: ['password'] }
    },
    // scopes: {
    //     //  include password with this scope & get with 
    //     //  User.scope('withHash').findByPk(1)
    //     withHash: { attributes: {}, exclude: ['createdAt', 'updatedAt'] }
    // }
  });
  return User;
};