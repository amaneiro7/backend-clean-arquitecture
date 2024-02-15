import { type UserPrimitives } from './User'

export abstract class UserRepository {
  abstract loginLocal ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>): Promise<UserPrimitives>
}
