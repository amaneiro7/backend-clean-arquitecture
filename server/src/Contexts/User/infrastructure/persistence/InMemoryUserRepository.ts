import { RoleTypes, Roles } from '../../domain/Role'
import { User } from '../../domain/User'
import { UserEmail } from '../../domain/UserEmail'
import { UserId } from '../../domain/UserId'
import { UserLastName } from '../../domain/UserLastName'
import { UserName } from '../../domain/UserName'
import { UserPassword } from '../../domain/UserPassword'
import { type UserRepository } from '../../domain/UserRepository'

const users: User[] = [
  new User(
    UserId.random(),
    new UserEmail('admin@bnc.com.ve'),
    new UserName('admin'),
    new Roles(RoleTypes.ADMIN),
    new UserLastName('admin'),
    new UserPassword('Admin12345*')
  )
]
export class InMemoryUserRepository implements UserRepository {
  // constructor (private readonly users: User[]) {}

  async save (user: User): Promise<void> {
    users.push(user)
  }

  async searchByEmail (userEmail: UserEmail): Promise<User | null> {
    return users.find(user => user.email === userEmail.value) ?? null
  }
}
