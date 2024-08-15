'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('devices', 'stock_number', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('devices', 'stock_number')
  }
};
