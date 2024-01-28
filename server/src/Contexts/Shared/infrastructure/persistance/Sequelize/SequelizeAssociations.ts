import { BrandModel } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { CategoryModel } from '../../../../Category/infrastructure/Sequelize/CategorySchema'
import { DeviceModel } from '../../../../Device/infraestructure/sequelize/DeviceSchema'
import { ModelSeriesModel } from '../../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'

export function InitSequelizeAssociation (): void {
  BrandModel.hasMany(ModelSeriesModel)
  CategoryModel.hasMany(ModelSeriesModel)

  ModelSeriesModel.belongsTo(CategoryModel, { as: 'category' })
  ModelSeriesModel.belongsTo(BrandModel, { as: 'brand' })
  ModelSeriesModel.hasMany(DeviceModel, { as: 'device' })

  DeviceModel.belongsTo(ModelSeriesModel)
}
