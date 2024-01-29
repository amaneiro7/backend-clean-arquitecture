import { type Repository } from '../../../Shared/domain/Repository'
import { type StatusPrimitives } from '../domain/Status'

export class SearchAllStatus {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<StatusPrimitives[]> {
    return await this.repository.status.searchAll()
  }
}
