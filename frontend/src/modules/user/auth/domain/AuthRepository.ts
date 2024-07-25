import { type UserPrimitives } from '../../user/domain/User'
export abstract class AuthRepository {
  abstract loginLocal({ email, password }: Pick<UserPrimitives, 'email' | 'password'>): Promise<UserPrimitives>
  abstract checkToken(): Promise<boolean>
  abstract clearToken(): Promise<void>
  abstract changePassword({ password, newPassword, reTypePassword }: { password: string, newPassword: string, reTypePassword: string }): Promise<void>
}
