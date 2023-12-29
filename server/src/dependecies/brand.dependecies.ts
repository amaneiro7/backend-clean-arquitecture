import { BrandService } from '../application/services/brand.service'
import { brandRepositoryInMemory } from '../infrastructure/persistance/local-file-system/brand'

export const brandService = new BrandService(brandRepositoryInMemory)
