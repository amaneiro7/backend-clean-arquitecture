import { SequelizeBrandRepository } from '../../../../Brand/infrastructure/Sequelize/SequelizeBrandRepository'
import { SequelizeCategoryRepository } from '../../../../Category/infrastructure/Sequelize/SequelizeCategoryRepository'
import { SequelizeDeviceRepository } from '../../../../Device/Device/infrastructure/sequelize/SequelizeDeviceRepository'
import { SequelizeStatusRepository } from '../../../../Device/Status/infrastructure/sequelize/SequelizeStatusRepository'
import { SequelizeComputerRepository } from '../../../../Features/Computer/infraestructure/sequelize/SequelizeComputerRepository'
import { SequelizeHardDriveRepository } from '../../../../Features/HardDrive.ts/HardDrive/infraestructure/sequelize/SequellizeHardDriveRepository'
import { SequelizeHardDriveCapacityRepository } from '../../../../Features/HardDrive.ts/HardDriveCapacity/infraestructure/sequelize/SequelizeHardDriveCapacity'
import { SequelizeHardDriveTypeRepository } from '../../../../Features/HardDrive.ts/HardDriveType/infraestructure/sequelize/SequelizeHardDriveTypeRepository'
import { SequelizeMemoryRamTypeRepository } from '../../../../Features/MemoryRam/MemoryRamType/infraestructure/sequelize/SequelizeMemoryRamTypeRepository'
import { SequelizeOperatingSystemRepository } from '../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/SequelizeOperatingSystemRepository'
import { SequelizeOperatingSystemArqRepository } from '../../../../Features/OperatingSystem/OperatingSystemArq/infraestructure/sequelize/SequelizeOperatingSystemArqRepository'
import { SequelizeProcessorRepository } from '../../../../Features/Processor/infraestructure/sequelize/SequelizeProcessorRepository'
import { SequelizeModelSeriesRepository } from '../../../../ModelSeries/ModelSeries/infraestructure/Sequelize/SequelizeModelSeriesRepository'
import { SequelizeRolesRepository } from '../../../../User/Role/infrastructure/sequelize/SequelizeRolesRepository'
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
  processor: new SequelizeProcessorRepository(),
  hardDriveType: new SequelizeHardDriveTypeRepository(),
  hardDriveCapacity: new SequelizeHardDriveCapacityRepository(),
  hardDrive: new SequelizeHardDriveRepository(),
  memoryRamType: new SequelizeMemoryRamTypeRepository(),
  operatingSystemVersion: new SequelizeOperatingSystemRepository(),
  operatingSystemArq: new SequelizeOperatingSystemArqRepository(),
  computer: new SequelizeComputerRepository(),
  role: new SequelizeRolesRepository()
}
