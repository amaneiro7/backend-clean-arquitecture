'use strict';
'6e4a952a-dc5c-4202-898a-ad33319d4907'

const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('computers', [
      {
        id: randomUUID(),
        category_id: 1,
        device_id: '6e4a952a-dc5c-4202-898a-ad33319d4907',
        processor_id: '1229f9dd-9039-45b9-8eef-e1ac7a4aeef4',
        memoryRamCapacity: [6, 6],
        hard_drive_capacity_id: 7,
        hard_drive_type_id: 1,
        operating_system_version_id: 2, 
        operating_system_arq_id: 2,
        mac_address: '00-15-5D-F8-0E-41',
        ip_address: '10.0.12.169',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('computers', null, {})
  }
};
