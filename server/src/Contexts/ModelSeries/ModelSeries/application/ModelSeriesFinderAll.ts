import { type Repository } from '../../../Shared/domain/Repository'
import { type ModelSeriesPrimitives } from '../domain/ModelSeries'

export class SearchAllModelSeries {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<ModelSeriesPrimitives[]> {
    return await this.repository.modelSeries.searchAll()
  }
}
