import { type User } from './User'
import { type UserEmail } from './UserEmail'

export abstract class UserRepository {
  abstract save (user: User): Promise<void>

  abstract search (userEmail: UserEmail): Promise<User | null>
}
