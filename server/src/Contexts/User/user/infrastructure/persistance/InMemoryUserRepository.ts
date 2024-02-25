import { type UserPrimitives } from '../../domain/User'
import { UserPassword } from '../../domain/UserPassword'
import { type UserRepository } from '../../domain/UserRepository'

const users: UserPrimitives[] = [
  {
    id: '4a9c8e24-58b3-4cf7-b7a1-db67d4f11d07',
    email: 'admin@bnc.com.ve',
    name: 'admin',
    lastName: 'admin',
    roleId: 1,
    password: new UserPassword('Admin12345*').toString()
  }
]
export class InMemoryUserRepository implements UserRepository {
// Asynchronously save a user payload to the data store
  async save (payload: UserPrimitives): Promise<void> {
  // Find the index of the user with the same id in the users array
    const userIndex = users.findIndex(user => user.id === payload.id)

    // If the user with the same id is found, update its data with the payload
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        ...payload
      }
    } else {
    // If the user with the same id is not found, add the payload as a new user
      users.push(payload)
    }
  }

  async searchByEmail (userEmail: string): Promise<UserPrimitives | null> {
    return users.find(user => user.email === userEmail) ?? null
  }

  async searchById (id: string): Promise<UserPrimitives | null> {
    return users.find(user => user.id === id) ?? null
  }
}
