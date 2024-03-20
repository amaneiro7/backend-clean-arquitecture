'use strict';

const { randomUUID } = require('node:crypto');
const { keyboardModel } = require('./deviceData/keyboardModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      return await queryInterface.sequelize.transaction(async (t) => {        
          await queryInterface.bulkInsert('models', keyboardModel.map((model) => ({
            id: model.id,
            name: model.name,
            category_id: model.categoryId,
            brand_id: model.brandId,
            created_at: new Date(),
            updated_at: new Date()
          })), { transaction: t })
          await queryInterface.bulkInsert('model_keyboards', keyboardModel.map((model) => ({        
            id: model.id,
            model_series_id: model.id,
            category_id: model.categoryId,            
            input_type_id: model.inputType,
            created_at: new Date(),
            updated_at: new Date()
          })), { transaction: t })
        })
    } catch (error) {
      throw new Error(error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      return await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.bulkDelete('model_keyboards', keyboardModel.map(model => ({
          id: model.id
        })), { transaction: t })
        await queryInterface.bulkDelete('models', keyboardModel.map(model => ({
          id: model.id
        })), { transaction: t })
      })      
    } catch (error) {
      throw new Error(error)
    }
  }
};
