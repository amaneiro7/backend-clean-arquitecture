import { type Repository } from '../../../shared/domain/repository'
import { type UserPrimitives } from '../../user/domain/User'

export class Login {
  constructor(private readonly repository: Repository) { }

  async run(email: string, password: string): Promise<UserPrimitives & { accessToken: string }> {
    return await this.repository.auth.loginLocal({ email, password })
  }
}
