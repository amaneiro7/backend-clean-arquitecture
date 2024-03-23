import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type CategoryId } from './CategoryId'
import { type CategoryName } from './CategoryName'

export interface CategoryPrimitives {
  id: Primitives<CategoryId>
  name: Primitives<CategoryName>
}

export class Category {
  constructor (
    private readonly id: CategoryId,
    private readonly name: CategoryName
  ) {}

  idValue (): Primitives<CategoryId> {
    return this.id.value
  }

  nameValue (): Primitives<CategoryName> {
    return this.name.value
  }

  toPrimitives (): CategoryPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
