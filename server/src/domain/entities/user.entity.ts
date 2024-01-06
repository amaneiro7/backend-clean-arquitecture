import { type RolesValue, type Id } from '../../types/types'

export interface User {
  id: Id
  name: string
  lastName: string
  email: string
  role: RolesValue
  password: string
  recoveryToken?: string | undefined | null
}

export interface CreateUser extends Omit<User, 'id' | 'recoveryToken'> {}
export interface UpdateUser extends Partial<CreateUser> {}
export interface UserOutput extends Omit<User, 'password' > {}
