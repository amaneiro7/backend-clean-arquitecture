import { type User } from './User'
import { type UserEmail } from './UserEmail'

export abstract class UserRepository {
  abstract save (user: User): void

  abstract search (userEmail: UserEmail): User | null
}
