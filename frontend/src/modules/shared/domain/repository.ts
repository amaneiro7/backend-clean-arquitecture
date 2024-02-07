import { type BrandRepository } from '../../devices/brand/domain/BrandRepository'
import { type CategoryRepository } from '../../devices/category/domain/CategoryRepository'
import { type DeviceRepository } from '../../devices/devices/devices/domain/DeviceRepository'
import { type StatusRepository } from '../../devices/devices/status/domain/StatusRepository'
import { type ProcessorRepository } from '../../devices/fetures/processor/domain/ProcessorRepository'
import { type ModelRepository } from '../../devices/model/domain/ModelRepository'

export interface Repository {
  brand: BrandRepository
  category: CategoryRepository
  status: StatusRepository
  device: DeviceRepository
  model: ModelRepository
  processor: ProcessorRepository
}
