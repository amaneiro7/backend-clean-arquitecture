import { type UserPrimitives } from '../../User/domain/User'

export function SendUserWithoutPassowrd (user: UserPrimitives): Omit<UserPrimitives, 'password'> {
  const { id, lastName, name, email, role } = user

  return {
    id,
    name,
    lastName,
    email,
    role
  }
}
