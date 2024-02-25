import { type UserPrimitives } from '../../User/user/domain/User'

type UserWithoutPassowrd = Omit<UserProps, 'password'>
interface Return {
  user: UserWithoutPassowrd
  refreshToken: string
}
interface UserProps extends UserPrimitives {
  role: {
    id: number
    name: string
  }
}

export function SendUserWithoutPassowrd (user: UserPrimitives, refreshToken: string): Return {
  const { id, lastName, name, email, roleId, role } = user as UserProps

  return {
    user: {
      id,
      name,
      lastName,
      email,
      roleId,
      role
    },

    refreshToken
  }
}
