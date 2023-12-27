import { type CreateUser, type User } from '../../domain/entities/user.entity'
import { type CreateUseCase } from '../../domain/useCases/create.useCase'

export class CreateUserService {
  constructor (
    private readonly store: CreateUseCase<User, CreateUser>
  ) {}

  async create (payload: CreateUser): Promise<User | undefined> {
    return await this.store.exec(payload)
  }
}
