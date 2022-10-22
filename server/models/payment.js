'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'paidBy' });
    }
  }
  Payment.init({
    method: DataTypes.ENUM('1', '2', '3', '4', '5'),
    isApproved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
  });
  return Payment;
};