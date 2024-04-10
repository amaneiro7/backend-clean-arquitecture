'use strict';

const vicepresidenciaEjecutiva = require('./employee/area/vicepresidenciaEjecutiva');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('vicepresidencia_ejecutivas', vicepresidenciaEjecutiva.map(({ id, name }) => 
      ({ 
        id, 
        name 
      }))
    , {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('vicepresidencia_ejecutivas', null, {})
  }
};
