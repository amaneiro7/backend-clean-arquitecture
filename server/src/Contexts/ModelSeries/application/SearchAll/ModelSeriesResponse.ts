import { type ModelSeries } from '../../domain/ModelSeries'

interface ModelSerieResponse {
  modelSeriesId: string
  modelSeriesName: string
  categoryId: string
  categoryName: string
  brandId: string
  brandName: string
}

export class ModelSeriesResponse {
  public readonly modelSeries: ModelSerieResponse[]
  constructor (modelSerie: ModelSeries[]) {
    this.modelSeries = modelSerie.map(model => model.toPrimitives())
  }
}
