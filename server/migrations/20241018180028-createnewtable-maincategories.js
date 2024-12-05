'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('main_categories',
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('main_categories')
  }
};
