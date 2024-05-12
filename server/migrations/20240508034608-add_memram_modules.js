'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('device_computers', 'memory_ram', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
      defaultValue: [0]
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('device_computers', 'memory_ram')
  }
};
