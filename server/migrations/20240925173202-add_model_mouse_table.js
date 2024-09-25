'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('model_mouses',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false
        },
        category_id: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isIn: {
              args: [['11']],
              msg: 'No pertenece a esta categoria'
            }
          },
          references: {
            model: 'categories',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        model_series_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'models',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        input_type_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'input_types',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('model_mouses')
  }
};
