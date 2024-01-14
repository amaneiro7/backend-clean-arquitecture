interface IModelSeriesResponse {
  modelSeriesId: string
  modelSeriesName: string
  categoryId: string
  categoryName: string
  brandId: string
  brandName: string

}
export class ModelSeriesResponse {
  constructor (readonly modelSeriesResponse: IModelSeriesResponse) {}
}
