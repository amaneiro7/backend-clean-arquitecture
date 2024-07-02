'use strict';

const { modelMonitor } = require('./modelsSeries/modelMonitor');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      return await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.bulkInsert('models', modelMonitor.map(({ id, name, categoryId, brandId }) => ({
          id,
          name,
          category_id: categoryId,
          brand_id: brandId,
          created_at: new Date(),
          updated_at: new Date()
        })), { transaction: t })
        await queryInterface.bulkInsert('model_monitors', modelMonitor.map(({ id, categoryId, screenSize, hasDVI, hasHDMI, hasVGA }) => ({
          id,
          model_series_id: id,
          category_id: categoryId,
          screen_size: screenSize,
          has_dvi: hasDVI,
          has_hdmi: hasHDMI,
          has_vga: hasVGA,
          created_at: new Date(),
          updated_at: new Date()
        })), { transaction: t })
      })
    } catch (error) {
      throw new Error(error)
    }

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('models', null, {})
      .then(() => queryInterface.bulkDelete('model_monitors', null, {})
      )
  }
};
