import { type Sequelize } from 'sequelize'
import { initModelSeriesModel } from '../../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { initCategoryModel } from '../../../../Category/infrastructure/Sequelize/CategorySchema'

import { initBrandModel } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { initDeviceModel } from '../../../../Device/infraestructure/sequelize/DeviceSchema'
import { initUserModel } from '../../../../User/infrastructure/persistence/Sequelize/UserSchema'

export function setupModels (sequelize: Sequelize): void {
  initCategoryModel(sequelize)
  initBrandModel(sequelize)
  initModelSeriesModel(sequelize)
  initDeviceModel(sequelize)
  initUserModel(sequelize)
}
