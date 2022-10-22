'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { foreignKey: 'seatId', as:'assignedUsers'});
    }
  }
  Seat.init({
    building: DataTypes.STRING,
    floor: DataTypes.STRING,
    room: DataTypes.STRING,
    code: DataTypes.STRING,
    rent: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Seat',
    tableName: 'seats'
  });
  return Seat;
};