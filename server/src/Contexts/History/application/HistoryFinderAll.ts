import { type Repository } from '../../Shared/domain/Repository'
import { type HistoryPrimitives } from '../domain/History'

export class SearchAllHistories {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<HistoryPrimitives[]> {
    return await this.repository.history.searchAll()
  }
}
