import { BrandService } from '../application/services/brand.service'
import { GetByIdUseCase } from '../domain/useCases/getById.useCase'
import { brandRepositoryInMemory } from '../infrastructure/persistance/local-file-system/brand'

export const brandUseCaseGetBydId = new GetByIdUseCase(brandRepositoryInMemory.getById)
export const brandService = new BrandService(brandRepositoryInMemory.execute, brandUseCaseGetBydId)
