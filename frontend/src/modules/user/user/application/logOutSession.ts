import { type Repository } from '../../../shared/domain/repository'

export class LogOutSession {
  constructor (private readonly repository: Repository) {}

  async run (): Promise<void> {
    await this.repository.user.logOutSession()
  }
}
