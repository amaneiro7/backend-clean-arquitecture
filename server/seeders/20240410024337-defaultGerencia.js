'use strict';

const gerencia = require('./employee/area/gerencia');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('gerencia', gerencia.map(({id, name, vicepresidenciaId }) => ({
      id, 
      name,
      vicepresidencia_id: vicepresidenciaId
    })), {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('gerencia', null, {})
  }
};
