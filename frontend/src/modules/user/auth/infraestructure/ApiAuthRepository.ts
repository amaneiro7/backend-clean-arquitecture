import { makeRequest } from "@/modules/shared/infraestructure/fetching"
import { type UserPrimitives } from "../../user/domain/User"
import { type AuthRepository } from "../domain/AuthRepository"


export class ApiAuthRepository implements AuthRepository {
  async loginLocal({ email, password }: Pick<UserPrimitives, 'email' | 'password'>): Promise<UserPrimitives & { accessToken: string }> {
    return await makeRequest({
      method: 'POST',
      url: 'auth/login/local',
      data: { email, password }
    })
  }

  async refreshToken(): Promise<boolean> {
    return await makeRequest({ url: 'refresh-token', method: 'GET' }).then(() => { return true })
  }

  async checkToken(): Promise<boolean> {
    return await makeRequest({ url: 'check-token', method: 'GET' }).then(() => { return true })
  }

  async clearToken(): Promise<void> {
    await makeRequest({ url: 'auth/logout', method: 'DELETE' })
  }

  async changePassword({ password, newPassword, reTypePassword }: { password: string, newPassword: string, reTypePassword: string }): Promise<void> {
    return await makeRequest({ url: 'users/change-password', method: 'PATCH', data: { password, newPassword, reTypePassword } })
  }
}
