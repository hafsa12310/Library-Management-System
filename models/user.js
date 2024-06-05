'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Book, {
        foreignKey: 'userId',
        as: 'borrowedBooks',
      });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
