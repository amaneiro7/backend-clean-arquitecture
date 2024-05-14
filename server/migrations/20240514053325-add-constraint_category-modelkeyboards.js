'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addConstraint('model_keyboards', 
    {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'model_keyboards_category_id_fkey',
      references: {
        table: 'categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'no action'
    },
    {
      fields: ['model_series_id'],
      type: 'foreign key',
      name: 'model_keyboards_model_series_id_fkey',
      references: {
        table: 'models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'no action'
    },
    {
      fields: ['input_type_id'],
      type: 'foreign key',
      name: 'model_keyboards_input_type_id_fkey',
      references: {
        table: 'input_types',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'no action'
    },
  )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('model_keyboards', 'model_keyboards_category_id_fkey')
    await queryInterface.removeConstraint('model_keyboards', 'model_keyboards_model_series_id_fkey')
    await queryInterface.removeConstraint('model_keyboards', 'model_keyboards_input_type_id_fkey')
    return
  }
};
