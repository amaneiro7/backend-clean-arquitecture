import { type RolesValue, type Id } from '../../types/types'

export interface User {
  id: Id
  name: string
  lastName: string
  email: string
  role: RolesValue
  password: string
  recoveryPassword?: string | undefined | null
}

export interface CreateUser extends Omit<User, 'id' | 'recoveryPassword'> {}
export interface UpdateUser extends Partial<CreateUser> {}
