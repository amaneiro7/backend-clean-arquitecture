import { ApiBrandRepository } from '../../devices/brand/infraestructure/ApiBrandRepository'
import { ApiCategoryRepository } from '../../devices/category/infraestructure/ApiCategoryRepository'
import { ApiDeviceRepository } from '../../devices/devices/devices/infraestructure/ApiDeviceRepository'
import { ApiStatusRepository } from '../../devices/devices/status/infraestructure/ApiStatusRepository'
import { ApiModelRepository } from '../../devices/model/infraestructure/ApiModelRepository'
import { type Repository } from '../domain/repository'

export const apiRepository: Repository = {
  brand: new ApiBrandRepository(),
  category: new ApiCategoryRepository(),
  device: new ApiDeviceRepository(),
  status: new ApiStatusRepository(),
  model: new ApiModelRepository()
}
