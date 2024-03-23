import { type Repository } from '../domain/repository'
import { ApiBrandRepository } from '../../devices/brand/infraestructure/ApiBrandRepository'
import { ApiCategoryRepository } from '../../devices/category/infraestructure/ApiCategoryRepository'
import { ApiDeviceRepository } from '../../devices/devices/devices/infraestructure/ApiDeviceRepository'
import { ApiStatusRepository } from '../../devices/devices/status/infraestructure/ApiStatusRepository'
import { ApiHardDriveCapacityRepository } from '../../devices/fetures/hardDrive/hardDriveCapacity/infrastructure/ApiHardDriveCapacityRepository'
import { ApiHardDriveTypeRepository } from '../../devices/fetures/hardDrive/hardDriveType/infrastructure/ApiHardDriveTypeRepository'
import { ApiMemoryRamTypeRepository } from '../../devices/fetures/memoryRam/memoryRamType/infrastructure/ApiMemoryRamTypeRepository'
import { ApiOperatingSystemRepository } from '../../devices/fetures/operatingSystem/operatingSystem/infrastructure/ApiOperatingSystemRepository'
import { ApiOperatingSystemArqRepository } from '../../devices/fetures/operatingSystem/operatingSystemArq/infrastructure/ApiOperatingSystemArqRepository'
import { ApiProcessorRepository } from '../../devices/fetures/processor/infrastructure/ApiProcessorRepository'
import { ApiModelRepository } from '../../devices/model/infraestructure/ApiModelRepository'
import { ApiRoleRepository } from '../../user/role/infrastructure/ApiRoleRepository'
import { ApiAuthRepository } from '../../user/auth/infraestructure/ApiAuthRepository'
import { SessionStorageRepository } from '../../user/user/infrastructure/SessionStorageRepository'
import { ApiVicepresidenciaEjecutivaRepository } from '../../employee/area/vicepresidenciaejecutiva/infraestructure/ApiVicepresidenciaEjecutivaRepository'
import { ApiVicepresidenciaRepository } from '../../employee/area/vicepresidencia/infraestructure/ApiVicepresidenciaRepository'
import { ApiGerenciaRepository } from '../../employee/area/gerencia/infraestructure/ApiGerenciaRepository'
import { ApiCoordinacionRepository } from '../../employee/area/coordinacion/infraestructure/ApiGerenciaRepository'
import { ApiCargoRepository } from '../../employee/cargo/infraestructure/ApiCargoRepository'
import { ApiCityRepository } from '../../location/city/infraestructure/ApiCityRepository'
import { ApiLocationRepository } from '../../location/locations/infraestructure/ApiLocationRepository'
import { ApiRegionRepository } from '../../location/region/infraestructure/ApiRegionRepository'
import { ApiStateRepository } from '../../location/state/infraestructure/ApiStateRepository'
import { ApiSiteRepository } from '../../location/site/infraestructure/ApiSiteRepository'
import { ApiTypeOfSiteRepository } from '../../location/typeofsites/infraestructure/ApiTypeOfSiteRepository'

export const apiRepository: Repository = {
  brand: new ApiBrandRepository(),
  category: new ApiCategoryRepository(),
  device: new ApiDeviceRepository(),
  status: new ApiStatusRepository(),
  model: new ApiModelRepository(),
  processor: new ApiProcessorRepository(),
  operatingSystem: new ApiOperatingSystemRepository(),
  operatingSystemArq: new ApiOperatingSystemArqRepository(),
  hardDriveCapacity: new ApiHardDriveCapacityRepository(),
  hardDriveType: new ApiHardDriveTypeRepository(),
  memoryRamType: new ApiMemoryRamTypeRepository(),
  role: new ApiRoleRepository(),
  auth: new ApiAuthRepository(),
  user: new SessionStorageRepository(),
  vicepresidenciaEjecutiva: new ApiVicepresidenciaEjecutivaRepository(),
  vicepresidencia: new ApiVicepresidenciaRepository(),
  gerencia: new ApiGerenciaRepository(),
  coordinacion: new ApiCoordinacionRepository(),
  cargo: new ApiCargoRepository(),
  city: new ApiCityRepository(),
  location: new ApiLocationRepository(),
  region: new ApiRegionRepository(),
  state: new ApiStateRepository(),
  site: new ApiSiteRepository(),
  typeOfSite: new ApiTypeOfSiteRepository()
}
