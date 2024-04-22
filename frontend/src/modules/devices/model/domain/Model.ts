import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { BrandId } from '../../brand/domain/BrandId'
import { CategoryId } from '../../category/domain/CategoryId'
import { type ModelId } from './ModelId'
import { ModelName } from './ModelName'

export interface ModelPrimitives {
  id?: Primitives<ModelId>
  name: Primitives<ModelName>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
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

  nameValue (): Primitives<ModelName> {
    return this.name.value
  }

  categoryValue (): Primitives<CategoryId> {
    return this.categoryId.value
  }

  brandValue (): Primitives<BrandId> {
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
