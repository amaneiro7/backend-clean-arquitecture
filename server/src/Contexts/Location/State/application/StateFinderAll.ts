import { type Repository } from '../../../Shared/domain/Repository'
import { type StatePrimitives } from '../domain/State'

export class SearchAllState {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<StatePrimitives[]> {
    return await this.repository.state.searchAll()
  }
}
