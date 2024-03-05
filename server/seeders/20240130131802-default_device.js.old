'use strict';

const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('devices', [
      {
        id: '6e4a952a-dc5c-4202-898a-ad33319d4907',
        serial: 'MJHCWKR',
        activo: '212578',
        status_id: 1,
        model_id: "83c38f9b-a0ac-4350-9204-886ea8e4e967",
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('devices', null, {})
  }
};
