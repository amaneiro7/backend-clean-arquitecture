import { type ModelStatic, type Model } from 'sequelize'
import { type Repository } from '../../../domain/Repository'
import { type CacheRepository } from '../../../domain/CacheRepository'
import { initializeDatabase } from './SequelizeConfig'
import { SequelizeBrandRepository } from '../../../../Brand/infrastructure/Sequelize/SequelizeBrandRepository'
import { SequelizeCategoryRepository } from '../../../../Category/SubCategory/infrastructure/Sequelize/SequelizeCategoryRepository'
import { SequelizeDeviceRepository } from '../../../../Device/Device/infrastructure/sequelize/SequelizeDeviceRepository'
import { SequelizeStatusRepository } from '../../../../Device/Status/infrastructure/sequelize/SequelizeStatusRepository'
import { SequelizeHardDriveCapacityRepository } from '../../../../Features/HardDrive/HardDriveCapacity/infraestructure/sequelize/SequelizeHardDriveCapacity'
import { SequelizeHardDriveTypeRepository } from '../../../../Features/HardDrive/HardDriveType/infraestructure/sequelize/SequelizeHardDriveTypeRepository'
import { SequelizeMemoryRamTypeRepository } from '../../../../Features/MemoryRam/MemoryRamType/infraestructure/sequelize/SequelizeMemoryRamTypeRepository'
import { SequelizeOperatingSystemRepository } from '../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/SequelizeOperatingSystemRepository'
import { SequelizeOperatingSystemArqRepository } from '../../../../Features/OperatingSystem/OperatingSystemArq/infraestructure/sequelize/SequelizeOperatingSystemArqRepository'
import { SequelizeProcessorRepository } from '../../../../Features/Processor/Processor/infrastructure/sequelize/SequelizeProcessorRepository'
import { SequelizeHistoryRepository } from '../../../../History/infrastructure/sequelize/SequelizeHistoryRepository'
import { SequelizeModelSeriesRepository } from '../../../../ModelSeries/ModelSeries/infraestructure/Sequelize/SequelizeModelSeriesRepository'
import { SequelizeRolesRepository } from '../../../../User/Role/infrastructure/sequelize/SequelizeRolesRepository'
import { SequelizeUserRepository } from '../../../../User/user/infrastructure/persistance/Sequelize/SequelizeUserRepository'
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
import { SequelizeInputTypeRepository } from '../../../../ModelSeries/InputType/infrastructure/sequelize/SequelizeInputTypeRepository'
import { SequelizeDashboardRepository } from '../../../../Device/Inventroy/infra/sequelize/SequelizeDashboardRepository'

initializeDatabase()

export interface Models {
  Category: ModelStatic<Model<any>>
  Brand: ModelStatic<Model<any>>
  Model: ModelStatic<Model<any>>
  ModelComputer: ModelStatic<Model<any>>
  ModelLaptop: ModelStatic<Model<any>>
  ModelMonitor: ModelStatic<Model<any>>
  ModelPrinter: ModelStatic<Model<any>>
  ModelKeyboard: ModelStatic<Model<any>>
  ModelMouse: ModelStatic<Model<any>>
  Status: ModelStatic<Model<any>>
  Device: ModelStatic<Model<any>>
  DeviceComputer: ModelStatic<Model<any>>
  DeviceHardDrive: ModelStatic<Model<any>>
  DeviceMFP: ModelStatic<Model<any>>
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
  InputType: ModelStatic<Model<any>>
}

export const sequelizeRepository = (cache: CacheRepository): Repository => ({
  user: new SequelizeUserRepository(cache),
  brand: new SequelizeBrandRepository(cache),
  category: new SequelizeCategoryRepository(cache),
  modelSeries: new SequelizeModelSeriesRepository(cache),
  status: new SequelizeStatusRepository(cache),
  device: new SequelizeDeviceRepository(cache),
  processor: new SequelizeProcessorRepository(cache),
  processorSocket: new SequelizeProcessorSocketRepository(cache),
  hardDriveType: new SequelizeHardDriveTypeRepository(cache),
  hardDriveCapacity: new SequelizeHardDriveCapacityRepository(cache),
  memoryRamType: new SequelizeMemoryRamTypeRepository(cache),
  operatingSystemVersion: new SequelizeOperatingSystemRepository(cache),
  operatingSystemArq: new SequelizeOperatingSystemArqRepository(cache),
  role: new SequelizeRolesRepository(cache),
  history: new SequelizeHistoryRepository(cache),
  state: new SequelizeStateRepository(cache),
  city: new SequelizeCityRepository(cache),
  typeOfSite: new SequelizeTypeOfSiteRepository(cache),
  region: new SequelizeRegionRepository(cache),
  site: new SequelizeSiteRepository(cache),
  location: new SequelizeLocationRepository(cache),
  cargo: new SequelizeCargoRepository(cache),
  coordinacion: new SequelizeCoordinacionRepository(cache),
  gerencia: new SequelizeGerenciaRepository(cache),
  vicepresidencia: new SequelizeVicepresidenciaRepository(cache),
  vicepresidenciaEjecutiva: new SequelizeVicepresidenciaEjecutivaRepository(cache),
  employee: new SequelizeEmployeeRepository(cache),
  inputType: new SequelizeInputTypeRepository(cache),
  dashboard: new SequelizeDashboardRepository(cache)
})
