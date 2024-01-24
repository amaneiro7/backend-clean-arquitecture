import { User } from '../../domain/User'
import { UserEmail } from '../../domain/UserEmail'
import { UserAlreadyExistError } from '../../domain/UserAlreadyExistError'
import { type RoleTypes } from '../../domain/Role'
import { type Repository } from '../../../Shared/domain/Repository'

export class UserRegister {
  constructor (private readonly repository: Repository) {}

  async register ({ name, lastName, role, email, password }: { name: string, lastName: string, role: RoleTypes, email: string, password: string }): Promise<void> {
    this.ensureUserDoesNotExist(email)
    const user = User.create({ name, lastName, email, role, password })

    await this.repository.user.save(user.toPrimitives())
  }

  private ensureUserDoesNotExist (email: string): void {
    if (this.repository.user.searchByEmail(new UserEmail(email).toString()) !== null) {
      throw new UserAlreadyExistError(email)
    }
  }
}
