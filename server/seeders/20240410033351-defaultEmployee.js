'use strict';

const employees = require('./employee/employee/torreEmployee');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees', employees.map((employee) => ({
      id: employee.id,
      user_name: employee.userName,
      // name: employee.name,
      // last_name: employee.lastName,
      // cedula: employee.cedula,
      // location_id: employee.locationId,
      // email: employee.email,
      // cargo_id: employee.cargoId,
      // extension: employee.extension,
      // phone_number: employee.phoneNumber,
      // vicepresidencia_ejecutiva_id: employee.vicepresidenciaEjecutivaId,
      // vicepresidencia_id: employee.vicepresidenciaId,
      // gerencia_id: employee.gerenciaId,
      // coordinacion_id: employee.coordinacionId,
      created_at: new Date(),
      updated_at: new Date()
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employees', null, {})
  }
};
