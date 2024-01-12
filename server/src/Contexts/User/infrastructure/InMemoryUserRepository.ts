import { type User } from '../domain/User'
import { type UserEmail } from '../domain/UserEmail'
import { type UserRepository } from '../domain/UserRepository'

const users: User[] = []
export class InMemoryUserRepository implements UserRepository {
  // constructor (private readonly users: User[]) {}

  async save (user: User): Promise<void> {
    users.push(user)
  }

  async search (userEmail: UserEmail): Promise<User | null> {
    return users.find(user => user.emailValue === userEmail.value) ?? null
  }
}
