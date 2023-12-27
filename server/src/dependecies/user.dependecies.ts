import { CreateUserService } from '../application/services/create_user.service'
import { userRepositoryInMemory } from '../infrastructure/persistance/local-file-system/user'

export const createUserService = new CreateUserService(userRepositoryInMemory)
