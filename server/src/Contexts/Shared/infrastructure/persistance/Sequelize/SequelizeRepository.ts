import { SequelizeBrandRepository } from '../../../../Brand/infrastructure/Sequelize/SequelizeBrandRepository'
import { SequelizeCategoryRepository } from '../../../../Category/infrastructure/Sequelize/SequelizeCategoryRepository'
import { SequelizeDeviceRepository } from '../../../../Device/infraestructure/sequelize/SequelizeDeviceRepository'
import { SequelizeModelSeriesRepository } from '../../../../ModelSeries/infraestructure/Sequelize/SequelizeModelSeriesRepository'
import { type Repository } from '../../../domain/Repository'

export const sequelizeRepository: Repository = {
    user: new SequelizeUser
  brand: new SequelizeBrandRepository(),
  category: new SequelizeCategoryRepository(),
  modelSeries: new SequelizeModelSeriesRepository(),
  device: new SequelizeDeviceRepository()
}

