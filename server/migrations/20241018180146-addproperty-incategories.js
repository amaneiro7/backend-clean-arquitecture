'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'main_category_id', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'main_categories',
        key: 'id'
      },
      defaultValue: '4',
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'main_category_id')
  }
};
