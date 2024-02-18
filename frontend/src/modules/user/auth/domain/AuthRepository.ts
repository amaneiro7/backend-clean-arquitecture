import { type UserPrimitives } from '../../user/domain/User'
export abstract class AuthRepository {
  abstract loginLocal ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>): Promise<UserPrimitives>
  abstract checkToken (): Promise<boolean>
}
