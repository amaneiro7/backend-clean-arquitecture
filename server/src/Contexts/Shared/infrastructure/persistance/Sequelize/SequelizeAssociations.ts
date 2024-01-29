import { BrandModel } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { CategoryModel } from '../../../../Category/infrastructure/Sequelize/CategorySchema'
import { DeviceModel } from '../../../../Device/Device/infrastructure/sequelize/DeviceSchema'
import { StatusModel } from '../../../../Device/Status/infrastructure/sequelize/StatusSchema'
import { ModelSeriesModel } from '../../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'

// Define associations between different Sequelize models
export function InitSequelizeAssociation (): void {
  // A brand can have many model series
  BrandModel.hasMany(ModelSeriesModel, { as: 'model' })

  // A category can have many model series
  CategoryModel.hasMany(ModelSeriesModel, { as: 'model' })

  // A model series belongs to a category
  ModelSeriesModel.belongsTo(CategoryModel, { as: 'category' })

  // A model series belongs to a brand
  ModelSeriesModel.belongsTo(BrandModel, { as: 'brand' })

  // A model series can have many devices
  ModelSeriesModel.hasMany(DeviceModel, { as: 'device' })

  // A status can have many devices
  StatusModel.hasMany(DeviceModel, { as: 'device' })

  // A device belongs to a model series
  DeviceModel.belongsTo(ModelSeriesModel, { as: 'model' })

  // A device belongs to a status
  DeviceModel.belongsTo(StatusModel, { as: 'status' })
}
