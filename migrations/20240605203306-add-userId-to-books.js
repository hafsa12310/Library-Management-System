'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'userId');
  }
};
