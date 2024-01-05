import { randomUUID } from 'node:crypto'
import { conflict } from '@hapi/boom'
import { type UpdateUser, type CreateUser, type User } from '../../../domain/entities/user.entity'
import { type UserRepository } from '../../../domain/repositories/user.repository'

const users: User[] = [
  {
    id: '712e52cd-30f9-4015-acdb-56c8553ef888',
    name: 'admin',
    lastName: 'admin',
    email: 'admin@mail.com',
    role: 'Admin',
    recoveryPassword: null,
    password: 'admin123'
  },
  {
    id: 'e612b294-8c00-4469-8086-b4c10773131f',
    name: 'Andres',
    lastName: 'Maneiro',
    email: 'amaneiro7@gmail.com',
    role: 'Especialista',
    recoveryPassword: null,
    password: 'password'
  }
]

export class UserRepositoryImpl implements UserRepository {
  async findByUserId (id: `${string}-${string}-${string}-${string}-${string}`): Promise<User | undefined> {
    return users.find(user => user.id === id)
  }

  async findByUserEmail (email: string): Promise<User | undefined> {
    return users.find(user => user.email.toLowerCase().trim() === email.toLowerCase().trim())
  }

  async createNewUser (payload: CreateUser): Promise<User> {
    const { email } = payload
    const user = users.find(user => user.email === email)
    if (user !== undefined) {
      throw conflict()
    }
    const newUser = {
      id: randomUUID(),
      ...payload
    }
    users.push(newUser)
    return newUser
  }

  async updateUser (id: `${string}-${string}-${string}-${string}-${string}`, payload: UpdateUser): Promise<User | undefined> {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return undefined
    users[userIndex] = {
      ...users[userIndex],
      ...payload
    }
    return users[userIndex]
  }

  async deleteUser (id: `${string}-${string}-${string}-${string}-${string}`): Promise<void> {
    users.find(user => user.id !== id)
  }
}
