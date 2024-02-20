import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type UserPrimitives } from '../../user/domain/User'
import { type AuthRepository } from '../domain/AuthRepository'

export class ApiAuthRepository implements AuthRepository {
  async loginLocal ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>): Promise<UserPrimitives> {
    return await makeRequest<UserPrimitives>({
      method: 'POST',
      endpoint: 'auth/login/local',
      data: { email, password }
    })
  }

  async checkToken (): Promise<boolean> {
    return await makeRequest({ endpoint: 'check-token', method: 'GET' }).then(() => { return true })
  }

  async clearToken (): Promise<void> {
    await makeRequest({ endpoint: 'auth/logout', method: 'DELETE' })
  }
}
