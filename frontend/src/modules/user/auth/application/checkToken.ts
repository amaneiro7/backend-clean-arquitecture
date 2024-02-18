import { type Repository } from '../../../shared/domain/repository'

export class CheckToken {
  constructor (private readonly repository: Repository) {}

  async run (): Promise<boolean> {
    return await this.repository.auth.checkToken().catch((error) => {
      throw new Error(error.message)
    })
  }
}
