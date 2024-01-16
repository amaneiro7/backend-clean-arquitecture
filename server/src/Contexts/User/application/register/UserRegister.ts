import { User } from '../../domain/User'
import { UserEmail } from '../../domain/UserEmail'
import { UserAlreadyExistError } from '../../domain/UserAlreadyExistError'
import { type RoleTypes } from '../../domain/Role'
import { type UserRepository } from '../../domain/UserRepository'

export class UserRegister {
  constructor (private readonly repository: UserRepository) {}

  async register ({ name, lastName, role, email, password }: { name: string, lastName: string, role: RoleTypes, email: string, password: string }): Promise<void> {
    this.ensureUserDoesNotExist(email)
    const user = User.create({ name, lastName, email, role, password })

    await this.repository.save(user)
  }

  private ensureUserDoesNotExist (email: string): void {
    if (this.repository.search(new UserEmail(email)) !== null) {
      throw new UserAlreadyExistError(email)
    }
  }
}
