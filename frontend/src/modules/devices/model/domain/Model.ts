import { BrandId } from '../../brand/domain/BrandId'
import { CategoryId } from '../../category/domain/CategoryId'
import { ModelId } from './ModelId'
import { ModelName } from './ModelName'

export interface ModelPrimitives {
  id: string
  name: string
  categoryId: number
  brandId: string
}
export class Model {
  constructor (
    private readonly id: ModelId,
    private readonly name: ModelName,
    private readonly categoryId: CategoryId,
    private readonly brandId: BrandId
  ) {}

  public static create ({ id, name, categoryId, brandId }: ModelPrimitives): Model {
    return new Model(
      new ModelId(id),
      new ModelName(name),
      new CategoryId(categoryId),
      new BrandId(brandId)
    )
  }

  idValue (): string {
    return this.id.value
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
      id: this.idValue(),
      name: this.nameValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue()
    }
  }
}
