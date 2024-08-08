import { type AuthRepository } from '../../user/auth/domain/AuthRepository'
import { type UserStorageRepository } from '../../user/user/domain/UserStorageRepository'
export interface Repository {
  // brand: BrandRepository
  // category: CategoryRepository
  // status: StatusRepository
  // device: DeviceRepository
  // model: ModelRepository
  // processor: ProcessorRepository
  // operatingSystem: OperatingSystemRepository
  // operatingSystemArq: OperatingSystemArqRepository
  // hardDriveType: HardDriveTypeRepository
  // hardDriveCapacity: HardDriveCapacityRepository
  // inputType: InputTypeRepository
  // // hardDrive: HardDriveRepository
  // // computer: ComputerRepository
  // memoryRamType: MemoryRamTypeRepository
  // role: RoleRepository
  user: UserStorageRepository
  auth: AuthRepository
  // area
  // vicepresidenciaEjecutiva: VicepresidenciaEjecutivaRepository
  // vicepresidencia: VicepresidenciaRepository
  // gerencia: GerenciaRepository
  // coordinacion: CoordinacionRepository
  // cargo: CargoRepository
  // // location
  // city: CityRepository
  // state: StateRepository
  // region: RegionRepository
  // site: SiteRepository
  // location: LocationRepository
  // typeOfSite: TypeOfSiteRepository
  // // employee
  // employee: EmployeeRepository

}
