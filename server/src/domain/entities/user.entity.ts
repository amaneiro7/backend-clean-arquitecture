import { type RolesValue, type Id } from '../../types/types'

export interface User {
  id: Id
  name: string
  lastName: string
  role: RolesValue
  email: string
  password: string
  recoveryToken: string
}

export interface CreateUser extends Omit<User, 'id'> {}
export interface UpdateUser extends Partial<CreateUser> {}
