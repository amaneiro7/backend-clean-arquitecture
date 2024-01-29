import { type Sequelize } from 'sequelize'
import { initModelSeriesModel } from '../../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { initCategoryModel } from '../../../../Category/infrastructure/Sequelize/CategorySchema'

import { initBrandModel } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { initDeviceModel } from '../../../../Device/Device/infrastructure/sequelize/DeviceSchema'
import { initUserModel } from '../../../../User/infrastructure/persistence/Sequelize/UserSchema'
import { initStatusModel } from '../../../../Device/Status/infrastructure/sequelize/StatusSchema'
import { initHardDriveCapacityModel } from '../../../../Features/HardDrive.ts/HardDriveCapacity/infraestructure/sequelize/HardDriveCapacitySchema'
import { initHardDriveTypeModel } from '../../../../Features/HardDrive.ts/HardDriveType/infraestructure/sequelize/HardDriveTypeSchema'

export function setupModels (sequelize: Sequelize): void {
  initCategoryModel(sequelize)
  initBrandModel(sequelize)
  initModelSeriesModel(sequelize)
  initStatusModel(sequelize)
  initDeviceModel(sequelize)
  initUserModel(sequelize)
  initHardDriveCapacityModel(sequelize)
  initHardDriveTypeModel(sequelize)
}
