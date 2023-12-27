import { type CreateUser, type User } from '../../domain/entities/user.entity'
// import { type CreateUseCase } from '../../domain/useCases/create.useCase'
import { type UserRepositotoryInterface } from '../../infrastructure/persistance/local-file-system/user'

export class CreateUserService {
  constructor (
    private readonly store: UserRepositotoryInterface
  ) {}

  async create (payload: CreateUser): Promise<User | undefined> {
    return await this.store.create.exec(payload)
  }
}
