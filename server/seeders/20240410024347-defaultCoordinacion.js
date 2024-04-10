'use strict';

const coordinacion = require('./employee/area/coordinacion');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('coordinacions', coordinacion.map(({ id, name,gerenciaId  }) => 
      ({ 
        id, 
        name,
        gerencia_id: gerenciaId
      }))
    , {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('coordinacions', null, {})
  }
};
