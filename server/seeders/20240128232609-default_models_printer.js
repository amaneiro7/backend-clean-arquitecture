'use strict';
const { randomUUID } = require('node:crypto')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('models', [
      {
        id: '97306e00-0f7a-49d6-bc89-65b3944d15ad',
        name: 'HighPrint 4915',
        category_id: 6,
        brand_id: '6b4b6a1f-e938-47fe-b637-c4402625b6cd',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '162468dc-73a4-4e9c-9925-721392b245d2',
        name: 'HighPrint 4915+',
        category_id: 6,
        brand_id: '6b4b6a1f-e938-47fe-b637-c4402625b6cd',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '1739931e-7808-443e-a895-a74d4e65ac90',
        name: 'HighPrint 4915xe',
        category_id: 6,
        brand_id: '6b4b6a1f-e938-47fe-b637-c4402625b6cd',
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('models', null, {})
  }
};
