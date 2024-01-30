import { type Sequelize } from 'sequelize'
import { initModelSeriesModel } from '../../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { initCategoryModel } from '../../../../Category/infrastructure/Sequelize/CategorySchema'

import { initBrandModel } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { initDeviceModel } from '../../../../Device/Device/infrastructure/sequelize/DeviceSchema'
import { initUserModel } from '../../../../User/infrastructure/persistence/Sequelize/UserSchema'
import { initStatusModel } from '../../../../Device/Status/infrastructure/sequelize/StatusSchema'
import { initHardDriveCapacityModel } from '../../../../Features/HardDrive.ts/HardDriveCapacity/infraestructure/sequelize/HardDriveCapacitySchema'
import { initHardDriveTypeModel } from '../../../../Features/HardDrive.ts/HardDriveType/infraestructure/sequelize/HardDriveTypeSchema'
import { initHardDriveModel } from '../../../../Features/HardDrive.ts/HardDrive/infraestructure/sequelize/HardDriveSchema'
import { initProcessorModel } from '../../../../Features/Processor/infraestructure/sequelize/ProcessorSchema'
import { initMemoryRamTypeModel } from '../../../../Features/MemoryRam/MemoryRamType/infraestructure/sequelize/MemoryRamTypeSchema'
import { initMemoryRamCapacityModel } from '../../../../Features/MemoryRam/MemoryRamCapacity/infraestructure/sequelize/MemoryRamCapacitySchema'
import { initOperatingSystemModel } from '../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/OperatingSystemSchema'
import { initOperatingSystemArqModel } from '../../../../Features/OperatingSystem/OperatingSystemArq/infraestructure/sequelize/OperatingSystemArqSchema'
import { initComputerModel } from '../../../../Features/Computer/infraestructure/sequelize/ComputerSchema'

export function setupModels (sequelize: Sequelize): void {
  initCategoryModel(sequelize)
  initBrandModel(sequelize)
  initModelSeriesModel(sequelize)
  initStatusModel(sequelize)
  initDeviceModel(sequelize)
  initUserModel(sequelize)
  initHardDriveCapacityModel(sequelize)
  initHardDriveTypeModel(sequelize)
  initHardDriveModel(sequelize)
  initProcessorModel(sequelize)
  initMemoryRamTypeModel(sequelize)
  initMemoryRamCapacityModel(sequelize)
  initOperatingSystemModel(sequelize)
  initOperatingSystemArqModel(sequelize)
  initComputerModel(sequelize)
}
