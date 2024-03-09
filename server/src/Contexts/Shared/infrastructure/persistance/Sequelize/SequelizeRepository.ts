import { type ModelStatic, type Model } from 'sequelize'
import { SequelizeBrandRepository } from '../../../../Brand/infrastructure/Sequelize/SequelizeBrandRepository'
import { SequelizeCategoryRepository } from '../../../../Category/infrastructure/Sequelize/SequelizeCategoryRepository'
import { SequelizeDeviceRepository } from '../../../../Device/Device/infrastructure/sequelize/SequelizeDeviceRepository'
import { SequelizeStatusRepository } from '../../../../Device/Status/infrastructure/sequelize/SequelizeStatusRepository'
import { SequelizeHardDriveCapacityRepository } from '../../../../Features/HardDrive.ts/HardDriveCapacity/infraestructure/sequelize/SequelizeHardDriveCapacity'
import { SequelizeHardDriveTypeRepository } from '../../../../Features/HardDrive.ts/HardDriveType/infraestructure/sequelize/SequelizeHardDriveTypeRepository'
import { SequelizeMemoryRamTypeRepository } from '../../../../Features/MemoryRam/MemoryRamType/infraestructure/sequelize/SequelizeMemoryRamTypeRepository'
import { SequelizeOperatingSystemRepository } from '../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/SequelizeOperatingSystemRepository'
import { SequelizeOperatingSystemArqRepository } from '../../../../Features/OperatingSystem/OperatingSystemArq/infraestructure/sequelize/SequelizeOperatingSystemArqRepository'
import { SequelizeProcessorRepository } from '../../../../Features/Processor/Processor/infrastructure/sequelize/SequelizeProcessorRepository'
import { SequelizeHistoryRepository } from '../../../../History/infrastructure/sequelize/SequelizeHistoryRepository'
import { SequelizeModelSeriesRepository } from '../../../../ModelSeries/ModelSeries/infraestructure/Sequelize/SequelizeModelSeriesRepository'
import { SequelizeRolesRepository } from '../../../../User/Role/infrastructure/sequelize/SequelizeRolesRepository'
import { SequelizeUserRepository } from '../../../../User/user/infrastructure/persistance/Sequelize/SequelizeUserRepository'
import { type Repository } from '../../../domain/Repository'
import { initializeDatabase } from './SequelizeConfig'
import { SequelizeProcessorSocketRepository } from '../../../../Features/Processor/ProcessorSocket/infrastructure/sequelize/SequelizeProcessorSocketRepository'
import { SequelizeStateRepository } from '../../../../Location/State/infrastructure/sequelize/SequelizeStateRepository'
import { SequelizeCityRepository } from '../../../../Location/City/infrastructure/sequelize/SequelizeCityRepository'
import { SequelizeTypeOfSiteRepository } from '../../../../Location/TypeOfSite/infrastructure/sequelize/SequelizeTypeOfSiteRepository'
import { SequelizeRegionRepository } from '../../../../Location/Region/infrastrcuture/sequelize/SequelizeCityRepository'
import { SequelizeSiteRepository } from '../../../../Location/Site/infrastructure/sequelize/SequelizeSiteRepository'
import { SequelizeLocationRepository } from '../../../../Location/Location/infrastructure/sequelize/SequelizeLocationRepository'
import { SequelizeCargoRepository } from '../../../../employee/Cargo/infrastructure/sequelize/SequelizeCargoRepository'
import { SequelizeCoordinacionRepository } from '../../../../employee/Area/Coordinacion/infrastructure/sequelize/SequelizeCoordinacionRepository'
import { SequelizeGerenciaRepository } from '../../../../employee/Area/Gerencia/infrastructure/sequelize/SequelizeGerenciaRepository'
import { SequelizeVicepresidenciaRepository } from '../../../../employee/Area/VicePresidencia/infrastructure/sequelize/SequelizeVicepresidenciaRepository'
import { SequelizeVicepresidenciaEjecutivaRepository } from '../../../../employee/Area/VicepresidenciaEjecutiva/infrastructure/sequelize/SequelizeVicepresidenciaEjecutivaRepository'
import { SequelizeEmployeeRepository } from '../../../../employee/Employee/infrastructure/sequelize/SequelizeEmployeeRepository'

initializeDatabase()

export interface Models {
  Category: ModelStatic<Model<any>>
  Brand: ModelStatic<Model<any>>
  Model: ModelStatic<Model<any>>
  ModelComputer: ModelStatic<Model<any>>
  ModelLaptop: ModelStatic<Model<any>>
  ModelMonitor: ModelStatic<Model<any>>
  ModelPrinter: ModelStatic<Model<any>>
  Status: ModelStatic<Model<any>>
  Device: ModelStatic<Model<any>>
  DeviceComputer: ModelStatic<Model<any>>
  DeviceHardDrive: ModelStatic<Model<any>>
  Processor: ModelStatic<Model<any>>
  ProcessorSocket: ModelStatic<Model<any>>
  MemoryRamType: ModelStatic<Model<any>>
  HardDriveCapacity: ModelStatic<Model<any>>
  HardDriveType: ModelStatic<Model<any>>
  OperatingSystemVersion: ModelStatic<Model<any>>
  OperatingSystemArq: ModelStatic<Model<any>>
  User: ModelStatic<Model<any>>
  Role: ModelStatic<Model<any>>
  History: ModelStatic<Model<any>>
  State: ModelStatic<Model<any>>
  City: ModelStatic<Model<any>>
  TypeOfSite: ModelStatic<Model<any>>
  Region: ModelStatic<Model<any>>
  Site: ModelStatic<Model<any>>
  Location: ModelStatic<Model<any>>
  VicepresidenciaEjecutiva: ModelStatic<Model<any>>
  Vicepresidencia: ModelStatic<Model<any>>
  Gerencia: ModelStatic<Model<any>>
  Coordinacion: ModelStatic<Model<any>>
  Cargo: ModelStatic<Model<any>>
  Employee: ModelStatic<Model<any>>
}

export const sequelizeRepository: Repository = {
  user: new SequelizeUserRepository(),
  brand: new SequelizeBrandRepository(),
  category: new SequelizeCategoryRepository(),
  modelSeries: new SequelizeModelSeriesRepository(),
  status: new SequelizeStatusRepository(),
  device: new SequelizeDeviceRepository(),
  processor: new SequelizeProcessorRepository(),
  processorSocket: new SequelizeProcessorSocketRepository(),
  hardDriveType: new SequelizeHardDriveTypeRepository(),
  hardDriveCapacity: new SequelizeHardDriveCapacityRepository(),
  memoryRamType: new SequelizeMemoryRamTypeRepository(),
  operatingSystemVersion: new SequelizeOperatingSystemRepository(),
  operatingSystemArq: new SequelizeOperatingSystemArqRepository(),
  role: new SequelizeRolesRepository(),
  history: new SequelizeHistoryRepository(),
  state: new SequelizeStateRepository(),
  city: new SequelizeCityRepository(),
  typeOfSite: new SequelizeTypeOfSiteRepository(),
  region: new SequelizeRegionRepository(),
  site: new SequelizeSiteRepository(),
  location: new SequelizeLocationRepository(),
  cargo: new SequelizeCargoRepository(),
  coordinacion: new SequelizeCoordinacionRepository(),
  gerencia: new SequelizeGerenciaRepository(),
  vicepresidencia: new SequelizeVicepresidenciaRepository(),
  vicepresidenciaEjecutiva: new SequelizeVicepresidenciaEjecutivaRepository(),
  employee: new SequelizeEmployeeRepository()
}
