import { BrandId } from '../../brand/domain/BrandId'
import { CategoryId } from '../../category/domain/CategoryId'
import { ModelName } from './ModelName'

export interface ModelPrimitives {
  id?: string
  name: string
  categoryId: number
  brandId: string
}
export class Model {
  constructor (
    private readonly name: ModelName,
    private readonly categoryId: CategoryId,
    private readonly brandId: BrandId
  ) {}

  public static create ({ name, categoryId, brandId }: ModelPrimitives): Model {
    return new Model(
      new ModelName(name),
      new CategoryId(categoryId),
      new BrandId(brandId)
    )
  }

  nameValue (): string {
    return this.name.value
  }

  categoryValue (): number {
    return this.categoryId.value
  }

  brandValue (): string {
    return this.brandId.value
  }

  toPrimitives (): ModelPrimitives {
    return {
      name: this.nameValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue()
    }
  }
}
