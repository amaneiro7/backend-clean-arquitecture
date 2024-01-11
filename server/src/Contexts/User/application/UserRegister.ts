import { User } from '../domain/User'
import { UserAlreadyExistError } from '../domain/UserAlreadyExistError'
import { UserEmail } from '../domain/UserEmail'
import { UserId } from '../domain/UserId'
import { type UserRepository } from '../domain/UserRepository'

export class UserRegister {
  constructor (private readonly repository: UserRepository) {}

  async register (email: string): Promise<void> {
    this.ensureUserDoesNotExist(email)
    const id = String(UserId.random())

    const user = User.create({ id, email })

    await this.repository.save(user)
  }

  private ensureUserDoesNotExist (email: string): void {
    if (this.repository.search(new UserEmail(email)) !== null) {
      throw new UserAlreadyExistError(email)
    }
  }
}
