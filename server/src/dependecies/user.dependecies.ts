import { CreateUserService } from '../application/services/create_user.service'
import { CreateUseCase } from '../domain/useCases/create.useCase'
import { GetByEmailUseCase } from '../domain/useCases/getByEmail.useCase'
import { GetByIdUseCase } from '../domain/useCases/getById.useCase'
import { UpdateUseCase } from '../domain/useCases/update.useCase'
import { userRepositoryInMemory } from '../infrastructure/persistance/local-file-system/user'

export const userUseCaseGetBydId = new GetByIdUseCase(userRepositoryInMemory.getById)
export const userUseCaseGetBydEmail = new GetByEmailUseCase(userRepositoryInMemory.getByEmail)
export const userUseCaseCreate = new CreateUseCase(userRepositoryInMemory.create)
export const userUseCaseUpdate = new UpdateUseCase(userRepositoryInMemory.update)

export const createUserService = new CreateUserService(userUseCaseCreate)
