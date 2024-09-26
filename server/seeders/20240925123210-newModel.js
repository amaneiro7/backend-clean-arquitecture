'use strict';

const { categoryData, categoryOnlyNames } = require('./categoryData/categoryData');
const { modelBAM: models } = require('./modelsSeries/modelBram');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mouseModel = models.filter(model => categoryData.filter(category => category.name === categoryOnlyNames.MOUSE)[0].id.includes(model.categoryId))
    try {
      return await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.bulkInsert('models', models.map(({ id, name, categoryId, brandId }) => ({
          id,
          name,
          category_id: categoryId,
          brand_id: brandId,
          created_at: new Date(),
          updated_at: new Date()
        })), { transaction: t })
        await queryInterface.bulkInsert('model_mouses', mouseModel.map((model) => ({
          id: model.id,
          model_series_id: model.id,
          category_id: model.categoryId,
          input_type_id: model.inputTypesId,
          created_at: new Date(),
          updated_at: new Date()
        })), { transaction: t })
      })
    } catch (error) {
      throw new Error(error)
    }
  },

  async down (queryInterface, Sequelize) {
    const mouseModel = models.filter(model => categoryData.filter(category => category.name === categoryOnlyNames.MOUSE)[0].id.includes(model.categoryId))
    try {
      return await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.bulkDelete('models', {
          id: {
            [Sequelize.Op.in]: models.map(model => model.id)
          }
        }, { transaction })
        await queryInterface.bulkDelete('model_mouses', {
          id: {
            [Sequelize.Op.in]: mouseModel.map(mouse => mouse.id)
          }
        }, { transaction })
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}
