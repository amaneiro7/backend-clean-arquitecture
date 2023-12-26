import { type Id } from '../../types/types'
import { type CreateUser, type UpdateUser, type User } from '../entities/user.entity'

export interface UserRepository {
  findByUserId: ({ id }: { id: Id }) => Promise<User | undefined>
  findByUserEmail: ({ id }: { id: Id }) => Promise<User | undefined>

  createNewUser: (payload: CreateUser) => Promise<User>
  updateUser: (id: Id, payload: UpdateUser) => Promise<User | undefined>
  deleteUser: (id: Id) => Promise<boolean>
}
