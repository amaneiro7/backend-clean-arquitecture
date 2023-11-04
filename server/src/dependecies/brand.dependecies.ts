import { BrandService } from '../application/services/brand.service'
import { BrandRepositoryInMemory } from '../infrastructure/persistance/local-file-system/brand'
import { BrandController } from '../presentation/controllers/brand.controller'

export const brandRepository = new BrandRepositoryInMemory()

export const brandService = new BrandService(brandRepository)

export const brandController = new BrandController(brandService)
