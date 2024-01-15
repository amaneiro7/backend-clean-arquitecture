import { type Repository } from '../../../Shared/domain/Repository'
import { type ModelSeriesResponse } from '../../domain/ModelSeriesResponse'

export class searchAllBrands {
  constructor (private readonly repository: Repository) {}

  async run (): Promise<ModelSeriesResponse[]> {
    return await this.repository.modelSeries.searchAll()
  }
}
