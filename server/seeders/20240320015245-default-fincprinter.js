'use strict';

const { randomUUID } = require('crypto');
const { impresorasFinancieraAlmacen } = require('./deviceData/ImpFinancieraAlmacen');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('devices', impresorasFinancieraAlmacen.map((printer) => ({
      id: randomUUID(),
      serial: printer.serial,
      activo: printer.activo,
      status_id: printer.statusId,
      category_id: printer.categoryId,
      brand_id: printer.brandId,
      model_id: printer.modelId,
      employee_id: printer.employeeId,
      location_id: printer.locationId,
      observation: printer.observation,
      created_at: new Date(),
      updated_at: new Date()
    })))
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('devices', impresorasFinancieraAlmacen.map((printer) => printer.serial), {})
  }
};
