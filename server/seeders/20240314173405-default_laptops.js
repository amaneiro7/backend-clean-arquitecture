'use strict';

const { randomUUID } = require('node:crypto');
const { lenovoLaptops } = require('./deviceData/LaptopsLenovoAlmacen');
const { HPLaptops } = require('./deviceData/LaptopsHPAlmacen');




/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const laptopsDevice = lenovoLaptops.concat(HPLaptops)
    const deviceWithRandomUUID = laptopsDevice.map((device) => {
      const id = randomUUID()
      return {
        ...device,
        id
      }
    })
    try {
      return await queryInterface.sequelize.transaction(async (t) => {        
          await queryInterface.bulkInsert('devices', deviceWithRandomUUID.map((device) => ({
            id: device.id,
            serial: device.serial,
            activo: device.activo,
            status_id: device.statusId,
            category_id: device.categoryId,
            brand_id: device.brandId,
            model_id: device.modelId,
            employee_id: device.employeeId,
            location_id: device.locationId,
            observation: device.observation,
            created_at: new Date(),
            updated_at: new Date()
          })), { transaction: t })
          await queryInterface.bulkInsert('device_computers', deviceWithRandomUUID.map((device) => ({        
            id: device.id,
            category_id: device.categoryId,
            device_id: device.id,
            processor_id: device.processorId,
            computer_name: device.computerName,
            memory_ram_capacity: device.memoryRamCapacity,
            hard_drive_capacity_id: device.hardDriveCapacityId,
            hard_drive_type_id: device.hardDriveTypeId,
            operating_system_version_id: device.operatingSystemVersionId,
            operating_system_arq_id: device.operatingSystemArqId,
            mac_address: device.macAddress,
            ip_address: device.ipAddress,
            created_at: new Date(),
            updated_at: new Date()
          })), { transaction: t })
        })
    } catch (error) {
      throw new Error(error)
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('devices', null, {}).then(() => {
      return queryInterface.bulkDelete('device_computers', null, {})
    })
  }
};
