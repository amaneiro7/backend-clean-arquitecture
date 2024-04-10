'use strict';

const vicepresidencia = require('./employee/area/vicepresidencia');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('vicepresidencia', vicepresidencia.map(({ id, name, vicepresidenciaEjecutivaId }) =>
      ({
        id,
        name,
        vicepresidencia_ejecutiva_id: vicepresidenciaEjecutivaId
      }))
      , {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('vicepresidencia', null, {})
  }
};
