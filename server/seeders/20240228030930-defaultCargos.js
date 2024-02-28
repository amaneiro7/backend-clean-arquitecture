'use strict';

const cargos = [
  'Analista', 'Especialista Senior', 'Coordinador', 'Gerente', 'Vicepresidente', 'Vicepresidente Ejecutivo'
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('cargos', cargos.map((cargo, index) => ({
      id: index + 1,
      name: cargo
    })))
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('cargos', null, {})
  }
};
