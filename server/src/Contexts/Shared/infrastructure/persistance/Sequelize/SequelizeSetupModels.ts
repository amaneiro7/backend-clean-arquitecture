import { type ModelStatic, type Sequelize } from 'sequelize'
import { ModelSeriesModel, ModelSeriesSchema } from '../../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { CategoryModel, CategorySchema } from '../../../../Category/infrastructure/Sequelize/CategorySchema'

import { BrandModel, BrandSchema } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { DeviceModel, DeviceSchema } from '../../../../Device/infraestructure/sequelize/DeviceSchema'
import { UserModel, UserSchema } from '../../../../User/infrastructure/persistence/Sequelize/UserSchema'

export interface SequelizeModels {
  Category: ModelStatic<CategoryModel>
  Brand: ModelStatic<BrandModel>
  Model: ModelStatic<ModelSeriesModel>
  Device: ModelStatic<DeviceModel>
  User: ModelStatic<UserModel>
}

export function setupModels (sequelize: Sequelize): SequelizeModels {
  CategoryModel.init(CategorySchema, CategoryModel.config(sequelize))
  BrandModel.init(BrandSchema, BrandModel.config(sequelize))
  ModelSeriesModel.init(ModelSeriesSchema, ModelSeriesModel.config(sequelize))
  DeviceModel.init(DeviceSchema, DeviceModel.config(sequelize))
  UserModel.init(UserSchema, UserModel.config(sequelize))

  CategoryModel.hasMany(ModelSeriesModel, { as: 'model', foreignKey: 'categoryId' })
  BrandModel.hasMany(ModelSeriesModel, { as: 'model', foreignKey: 'brandId' })
  ModelSeriesModel.belongsTo(CategoryModel, { as: 'category' })
  ModelSeriesModel.belongsTo(CategoryModel, { as: 'brand' })
  ModelSeriesModel.hasMany(DeviceModel, { as: 'device', foreignKey: 'modelId' })
  DeviceModel.belongsTo(ModelSeriesModel, { as: 'model' })

  return {
    Category: CategoryModel,
    Brand: BrandModel,
    Model: ModelSeriesModel,
    Device: DeviceModel,
    User: UserModel

  }
}
