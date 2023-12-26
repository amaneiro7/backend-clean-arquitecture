import { BrandService } from '../application/services/brand.service'
import { GetByIdUseCase } from '../domain/useCases/getById.useCase'
import { brandRepositoryInMemory } from '../infrastructure/persistance/local-file-system/brand'
import { BrandController } from '../presentation/controllers/brand.controller'

// export const brandRepository = new BrandRepositoryInMemory()
// export const brandGetById = new BrandGetByIdInMemory()

export const brandUseCaseGetBydId = new GetByIdUseCase(brandRepositoryInMemory.getById)
export const brandService = new BrandService(brandRepositoryInMemory.execute, brandUseCaseGetBydId)

export const brandController = new BrandController(brandService)
