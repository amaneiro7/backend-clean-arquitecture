import { API_URL } from '../../../shared/infraestructure/config'
import { type UserPrimitives } from '../../user/domain/User'
import { type AuthRepository } from '../domain/AuthRepository'

export class ApiAuthRepository implements AuthRepository {
  async loginLocal ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>): Promise<UserPrimitives> {
    try {
      const res = await fetch(`${API_URL}/auth/login/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
      return await (res.json() as Promise<UserPrimitives>)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
