'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('device_mfp',
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
              args: [['13']],
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
        device_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'models',
            key: 'id'
          },          
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        ip_address: {
          type: Sequelize.INET,
          allowNull: true,
          validate: {
            isIPv4: true
          }
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
    return await queryInterface.dropTable('device_mfp')
  }
};
