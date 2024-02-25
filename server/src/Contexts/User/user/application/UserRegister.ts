import { User, type UserPrimitives } from '../domain/User'
import { UserEmail } from '../domain/UserEmail'
import { UserAlreadyExistError } from '../domain/UserAlreadyExistError'
import { type Repository } from '../../../Shared/domain/Repository'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'

export class UserRegister {
  constructor (private readonly repository: Repository) {}

  async register ({ name, lastName, roleId, email, password }: UserPrimitives): Promise<void> {
    this.ensureUserDoesNotExist(email)
    const user = User.create({ name, lastName, email, roleId, password })

    await this.repository.user.save(user.toPrimitives())
  }

  private ensureUserDoesNotExist (email: Primitives<UserEmail>): void {
    if (this.repository.user.searchByEmail(new UserEmail(email).toString()) !== null) {
      throw new UserAlreadyExistError(email)
    }
  }
}
