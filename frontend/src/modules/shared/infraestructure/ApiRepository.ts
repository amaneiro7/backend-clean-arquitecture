import { ApiBrandRepository } from '../../devices/brand/infraestructure/ApiBrandRepository'
import { ApiCategoryRepository } from '../../devices/category/infraestructure/ApiCategoryRepository'
import { ApiStatusRepository } from '../../devices/devices/status/infraestructure/ApiStatusRepository'
import { type Repository } from '../domain/repository'

export const apiRepository: Repository = {
  brand: new ApiBrandRepository(),
  category: new ApiCategoryRepository(),
  device: new ApiDeviceRepository(),
  status: new ApiStatusRepository()
}
