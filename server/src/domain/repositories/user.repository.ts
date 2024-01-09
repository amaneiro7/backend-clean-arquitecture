import { type Id } from '../../types/types'
import { type UpdateUserRecoveryToken, type CreateUser, type UpdateUser, type User, type UpdateUserPassword } from '../entities/User/user.entity'

export interface UserRepository {
  findByUserId: (id: Id) => Promise<User | undefined>
  findByUserEmail: (email: string) => Promise<User | undefined>

  createNewUser: (payload: CreateUser) => Promise<User>
  updateUser: (id: Id, payload: UpdateUser) => Promise<User | undefined>
  updateUserRecoveryToken: (id: Id, payload: UpdateUserRecoveryToken) => Promise<User | undefined>
  updateUserPassword: (id: Id, payload: UpdateUserPassword) => Promise<User | undefined>
  deleteUser: (id: Id) => Promise<void>
}
