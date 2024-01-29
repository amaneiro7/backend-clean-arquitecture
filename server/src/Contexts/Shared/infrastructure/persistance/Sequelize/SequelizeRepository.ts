import { SequelizeBrandRepository } from '../../../../Brand/infrastructure/Sequelize/SequelizeBrandRepository'
import { SequelizeCategoryRepository } from '../../../../Category/infrastructure/Sequelize/SequelizeCategoryRepository'
import { SequelizeDeviceRepository } from '../../../../Device/Device/infrastructure/sequelize/SequelizeDeviceRepository'
import { SequelizeStatusRepository } from '../../../../Device/Status/infrastructure/sequelize/SequelizeStatusRepository'
import { SequelizeHardDriveRepository } from '../../../../Features/HardDrive.ts/HardDrive/infraestructure/sequelize/SequellizeHardDriveRepository'
import { SequelizeHardDriveCapacityRepository } from '../../../../Features/HardDrive.ts/HardDriveCapacity/infraestructure/sequelize/SequelizeHardDriveCapacity'
import { SequelizeHardDriveTypeRepository } from '../../../../Features/HardDrive.ts/HardDriveType/infraestructure/sequelize/SequelizeHardDriveType'
import { SequelizeModelSeriesRepository } from '../../../../ModelSeries/infraestructure/Sequelize/SequelizeModelSeriesRepository'
import { SequelizeUserRepository } from '../../../../User/infrastructure/persistence/Sequelize/SequelizeUserRepository'
import { type Repository } from '../../../domain/Repository'
import { initializeDatabase } from './SequelizeConfig'

initializeDatabase()

export const sequelizeRepository: Repository = {
  user: new SequelizeUserRepository(),
  brand: new SequelizeBrandRepository(),
  category: new SequelizeCategoryRepository(),
  modelSeries: new SequelizeModelSeriesRepository(),
  status: new SequelizeStatusRepository(),
  device: new SequelizeDeviceRepository(),
  hardDriveType: new SequelizeHardDriveTypeRepository(),
  hardDriveCapacity: new SequelizeHardDriveCapacityRepository(),
  hardDrive: new SequelizeHardDriveRepository()

}
