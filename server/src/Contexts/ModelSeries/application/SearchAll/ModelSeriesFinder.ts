import { type Repository } from '../../../Shared/domain/Repository'
import { ModelSeriesResponse } from './ModelSeriesResponse'

export class searchAllBrands {
  constructor (private readonly repository: Repository) {}

  async run (): Promise<ModelSeriesResponse> {
    const modelSeries = await this.repository.modelSeries.searchAll()

    return new ModelSeriesResponse(modelSeries)
  }
}
