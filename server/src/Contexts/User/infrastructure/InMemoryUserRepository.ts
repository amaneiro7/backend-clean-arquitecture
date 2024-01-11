import { type User } from '../domain/User'
import { type UserEmail } from '../domain/UserEmail'
import { type UserRepository } from '../domain/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  constructor (private readonly users: User[]) {}

  save (user: User): void {
    this.users.push(user)
  }

  search (userEmail: UserEmail): User | null {
    return this.users.find(user => user.emailValue === userEmail.value) ?? null
  }
}
