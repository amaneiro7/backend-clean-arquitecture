import { SequelizeBrandRepository } from '../../../../Brand/infrastructure/Sequelize/SequelizeBrandRepository'
import { SequelizeCategoryRepository } from '../../../../Category/infrastructure/Sequelize/SequelizeCategoryRepository'
import { SequelizeModelSeriesRepository } from '../../../../ModelSeries/infraestructure/Sequelize/SequelizeModelSeriesRepository'
import { type Repository } from '../../../domain/Repository'

export const sequelizeRepository: Repository = {
    user
  brand: new SequelizeBrandRepository(),
  category: new SequelizeCategoryRepository(),
  modelSeries: new SequelizeModelSeriesRepository(),
  device: 
}

