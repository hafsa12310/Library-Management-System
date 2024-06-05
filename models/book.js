'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'borrower',
      });
    }
  }

  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    borrowed: DataTypes.BOOLEAN,
    publicationYear: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};
