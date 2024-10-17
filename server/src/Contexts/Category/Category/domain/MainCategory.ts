import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { MainCategoryId } from './MainCategoryId'
import { MainCategoryName } from './MainCategoryName'

export interface MainCategoryPrimitives {
  id: Primitives<MainCategoryId>
  name: Primitives<MainCategoryName>
}

export class Category {
  constructor(
    private readonly id: MainCategoryId,
    private readonly name: MainCategoryName
  ) { }

  static fromPrimitives(primitives: MainCategoryPrimitives): Category {
    return new Category(
      new MainCategoryId(primitives.id),
      new MainCategoryName(primitives.name)
    )
  }

  toPrimitive(): MainCategoryPrimitives {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue(): Primitives<MainCategoryId> {
    return this.id.value
  }

  get nameValue(): Primitives<MainCategoryName> {
    return this.name.value
  }
}
