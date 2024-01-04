import { randomUUID } from 'node:crypto'
import { conflict } from '@hapi/boom'
import { type Id } from '../../../types/types'
import { type GetByIdRepository } from '../../../domain/repositories/getById.repositoy'
import { type UpdateUser, type CreateUser, type User } from '../../../domain/entities/user.entity'
import { type CreateRepository } from '../../../domain/repositories/create.repository'
import { type GetByEmailRepository } from '../../../domain/repositories/getByEmail.repository'
import { type UpdateRepository } from '../../../domain/repositories/update.repository'

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

class UserGetByIdInMemory implements GetByIdRepository<User> {
  exec = async ({ id }: { id: Id }): Promise<User | undefined> => {
    const user = users.find(user => user.id === id)
    return user
  }
}
class UserGetByEmailInMemory implements GetByEmailRepository {
  exec = async ({ email }: { email: string }): Promise<User | undefined> => {
    const user = users.find(user => user.email === email)
    return user
  }
}

class UserCreateInMemory implements CreateRepository<User, CreateUser> {
  exec = async (payload: CreateUser): Promise<User> => {
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
}

class UserUpdateInMemory implements UpdateRepository<User, UpdateUser> {
  exec = async (id: Id, payload: UpdateUser): Promise<User | undefined> => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return undefined
    users[userIndex] = {
      ...users[userIndex],
      ...payload
    }
    return users[userIndex]
  }
}

export interface UserRepositotoryInterface {
  getById: UserGetByIdInMemory
  getByEmail: UserGetByEmailInMemory
  create: UserCreateInMemory
  update: UserUpdateInMemory
}

export const userRepositoryInMemory: UserRepositotoryInterface = {
  getById: new UserGetByIdInMemory(),
  getByEmail: new UserGetByEmailInMemory(),
  create: new UserCreateInMemory(),
  update: new UserUpdateInMemory()
}