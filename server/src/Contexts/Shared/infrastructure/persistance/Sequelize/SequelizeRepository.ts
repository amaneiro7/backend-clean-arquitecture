import { SequelizeBrandRepository } from '../../../../Brand/infrastructure/Sequelize/SequelizeBrandRepository'
import { SequelizeCategoryRepository } from '../../../../Category/infrastructure/Sequelize/SequelizeCategoryRepository'
import { SequelizeDeviceRepository } from '../../../../Device/Device/infrastructure/sequelize/SequelizeDeviceRepository'
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
  device: new SequelizeDeviceRepository()

}
