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
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
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