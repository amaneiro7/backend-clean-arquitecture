import { BrandId } from '../../Brand/domain/BrandId'
import { CategoryId } from '../../Category/domain/CategoryId'
import { ModelSeriesId } from './ModelSeriesId'
import { ModelSeriesName } from './ModelSeriesName'

export interface ModelSeriesPrimitives {
  id: string
  name: string
  brandId: string
  categoryId: number
}

export class ModelSeries {
  constructor (
    private readonly id: ModelSeriesId,
    private name: ModelSeriesName,
    private categoryId: CategoryId,
    private brandId: BrandId
  ) {}

  static create ({ name, brandId, categoryId }: { name: string, brandId: string, categoryId: number }): ModelSeries {
    const id = String(ModelSeriesId.random())
    return new ModelSeries(
      new ModelSeriesId(id),
      new ModelSeriesName(name),
      new CategoryId(categoryId),
      new BrandId(brandId)
    )
  }

  updateName (newName: string): void {
    this.name = new ModelSeriesName(newName)
  }

  updateCategoryId (newCategoryId: number): void {
    this.categoryId = new CategoryId(newCategoryId)
  }

  updateBrandId (newBrandId: string): void {
    this.brandId = new BrandId(newBrandId)
  }

  static fromPrimitives (primitives: ModelSeriesPrimitives): ModelSeries {
    return new ModelSeries(
      new ModelSeriesId(primitives.id),
      new ModelSeriesName(primitives.name),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId)
    )
  }

  toPrimitives (): ModelSeriesPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      categoryId: this.categoryIdValue,
      brandId: this.brandIdValue
    }
  }

  get idValue (): string {
    return this.id.value
  }

  get nameValue (): string {
    return this.name.value
  }

  get categoryIdValue (): number {
    return this.categoryId.value
  }

  get brandIdValue (): string {
    return this.brandId.value
  }
}
