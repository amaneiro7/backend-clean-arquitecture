'use strict';

const processorSockets = require('./processor/processorSocket');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('processor_sockets', processorSockets.map(({ id, name }) => ({ id, name })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('processor_sockets', null, {})
  }
};
