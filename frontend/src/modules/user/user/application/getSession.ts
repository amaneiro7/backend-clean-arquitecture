import { type Repository } from '../../../shared/domain/repository'
import { type UserPrimitives } from '../../user/domain/User'

export class GetSession {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<UserPrimitives> {
    return await this.repository.user.getSession()
  }
}
