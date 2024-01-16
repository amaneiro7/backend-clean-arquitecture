import { BrandId } from '../../Brand/domain/BrandId'
import { CategoryId } from '../../Category/domain/CategoryId'
import { ModelSeriesId } from './ModelSeriesId'
import { ModelSeriesName } from './ModelSeriesName'

export interface ModelSeriesPrimitives {
  id: string
  name: string
  brandId: string
  categoryId: string
}

export class ModelSeries {
  constructor (
    private readonly _id: ModelSeriesId,
    private _name: ModelSeriesName,
    private _brandId: BrandId,
    private _categoryId: CategoryId
  ) {}

  static create ({ name, brandId, categoryId }: { name: string, brandId: string, categoryId: string }): ModelSeries {
    const id = String(ModelSeriesId.random())
    return new ModelSeries(
      new ModelSeriesId(id),
      new ModelSeriesName(name),
      new CategoryId(categoryId),
      new BrandId(brandId)
    )
  }

  updateName (newName: string): void {
    this._name = new ModelSeriesName(newName)
  }

  updateCategoryId (newCategoryId: string): void {
    this._categoryId = new CategoryId(newCategoryId)
  }

  updateBrandId (newBrandId: string): void {
    this._brandId = new BrandId(newBrandId)
  }

  static fromPrimitives (primitives: ModelSeriesPrimitives): ModelSeries {
    return new ModelSeries(
      new ModelSeriesId(primitives.id),
      new ModelSeriesName(primitives.name),
      new BrandId(primitives.brandId),
      new CategoryId(primitives.categoryId)
    )
  }

  toPrimitives (): ModelSeriesPrimitives {
    return {
      id: this._id.value,
      name: this._name.value,
      categoryId: this._categoryId.value,
      brandId: this._brandId.value
    }
  }

  get id (): string {
    return this._id.value
  }

  get name (): string {
    return this._name.value
  }

  get brandId (): string {
    return this._brandId.value
  }

  get categoryId (): string {
    return this._categoryId.value
  }
}
