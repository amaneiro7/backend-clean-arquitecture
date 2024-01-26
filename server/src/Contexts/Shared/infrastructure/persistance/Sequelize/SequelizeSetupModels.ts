import { type ModelStatic, type Sequelize } from 'sequelize'
import { ModelSeriesModel, ModelSeriesSchema } from '../../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { CategoryModel, CategorySchema } from '../../../../Category/infrastructure/Sequelize/CategorySchema'

import { BrandModel, BrandSchema } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { DeviceModel, DeviceSchema } from '../../../../Device/infraestructure/sequelize/DeviceSchema'
import { UserModel, UserSchema } from '../../../../User/infrastructure/persistence/Sequelize/UserSchema'

export interface SequelizeModels {
  Category: ModelStatic<any>
  Brand: ModelStatic<any>
  Model: ModelStatic<any>
  Device: ModelStatic<any>
  User: ModelStatic<any>
}

export function setupModels (sequelize: Sequelize): SequelizeModels {
  CategoryModel.init(CategorySchema, CategoryModel.config(sequelize))
  BrandModel.init(BrandSchema, BrandModel.config(sequelize))
  ModelSeriesModel.init(ModelSeriesSchema, ModelSeriesModel.config(sequelize))
  DeviceModel.init(DeviceSchema, DeviceModel.config(sequelize))
  UserModel.init(UserSchema, UserModel.config(sequelize))

  CategoryModel.hasMany(ModelSeriesModel)
  BrandModel.hasMany(ModelSeriesModel)
  ModelSeriesModel.belongsTo(CategoryModel)
  ModelSeriesModel.belongsTo(CategoryModel)
  ModelSeriesModel.hasMany(DeviceModel)
  DeviceModel.belongsTo(ModelSeriesModel)

  return {
    Category: CategoryModel,
    Brand: BrandModel,
    Model: ModelSeriesModel,
    Device: DeviceModel,
    User: UserModel

  }
}
