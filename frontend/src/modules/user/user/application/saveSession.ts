import { type Repository } from '../../../shared/domain/repository'
import { type UserPrimitives } from '../../user/domain/User'

export class SaveSession {
  constructor (private readonly repository: Repository) {}

  async save (user: UserPrimitives): Promise<void> {
    await this.repository.user.saveSession({ user })
  }
}
