'use strict';

const { statusData } = require('./statusData/statusData');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('status', statusData.map(({id, name}) => ({
      id,
      name
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('status', null, {})
  }
};
