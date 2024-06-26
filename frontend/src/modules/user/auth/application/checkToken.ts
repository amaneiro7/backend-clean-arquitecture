import { type Repository } from '../../../shared/domain/repository'

export class CheckToken {
  constructor (private readonly repository: Repository) {}

  async run (): Promise<boolean> {
    return await this.repository.auth.checkToken()
  }
}
