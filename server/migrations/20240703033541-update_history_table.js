'use strict';


const acionTypes = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('histories')
    return await queryInterface.createTable('histories',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false
        },
        device_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'devices',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        employee_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'employees',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        action: {
          type: Sequelize.ENUM,
          values: Object.values(acionTypes),
          allowNull: false
        },
        old_data: {
          type: Sequelize.JSON,
          allowNull: false
        },
        new_data: {
          type: Sequelize.JSON,
          allowNull: false
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
    return await queryInterface.dropTable('histories')
  }
};
