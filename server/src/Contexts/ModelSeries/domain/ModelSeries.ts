import { BrandId } from '../../Brand/domain/BrandId'
import { CategoryId } from '../../Category/domain/CategoryId'
import { ModelSeriesId } from './ModelSeriesId'
import { ModelSeriesName } from './ModelSeriesName'

export interface ModelSeriesPrimitives {
  modelSeriesId: string
  modelSeriesName: string
  brandId: string
  categoryId: string
}

export class ModelSeries {
  constructor (
    private readonly modelSeriesId: ModelSeriesId,
    private modelSeriesName: ModelSeriesName,
    private brandId: BrandId,
    private categoryId: CategoryId
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
    this.modelSeriesName = new ModelSeriesName(newName)
  }

  updateCategoryId (newCategoryId: string): void {
    this.categoryId = new CategoryId(newCategoryId)
  }

  updateBrandId (newBrandId: string): void {
    this.brandId = new BrandId(newBrandId)
  }

  static fromPrimitives (primitives: ModelSeriesPrimitives): ModelSeries {
    return new ModelSeries(
      new ModelSeriesId(primitives.modelSeriesId),
      new ModelSeriesName(primitives.modelSeriesName),
      new BrandId(primitives.brandId),
      new CategoryId(primitives.categoryId)
    )
  }

  toPrimitives (): ModelSeriesPrimitives {
    return {
      modelSeriesId: this.modelSeriesId.value,
      modelSeriesName: this.modelSeriesName.value,
      categoryId: this.categoryId.value,
      brandId: this.brandId.value
    }
  }

  get IdValue (): string {
    return this.modelSeriesId.value
  }

  get nameValue (): string {
    return this.modelSeriesName.value
  }

  get brandIdValue (): string {
    return this.brandId.value
  }

  get categoryIdValue (): string {
    return this.categoryId.value
  }
}
