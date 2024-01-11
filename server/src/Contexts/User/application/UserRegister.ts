import { User } from '../domain/User'
import { UserAlreadyExistError } from '../domain/UserAlreadyExistError'
import { UserEmail } from '../domain/UserEmail'
import { type UserRepository } from '../domain/UserRepository'

export class UserRegister {
  constructor (private readonly repository: UserRepository) {}

  register (id: string, email: string): void {
    this.ensureUserDoesNotExist(email)

    const user = User.create({ id, email })

    this.repository.save(user)
  }

  private ensureUserDoesNotExist (email: string): void {
    if (this.repository.search(new UserEmail(email)) !== null) {
      throw new UserAlreadyExistError(email)
    }
  }
}
