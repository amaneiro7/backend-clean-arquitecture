import { CategoryId } from './CategoryId'
import { CategoryName } from './CategoryName'

export interface CategoryPrimitives {
  id: string
  name: string
}

export class Category {
  constructor (
    private readonly id: CategoryId,
    private readonly name: CategoryName
  ) {}

  static fromPrimitives (primitives: CategoryPrimitives): Category {
    return new Category(
      new CategoryId(primitives.id),
      new CategoryName(primitives.name)
    )
  }

  toPrimitive (): any {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): string {
    return this.id.value
  }

  get nameValue (): string {
    return this.name.value
  }
}
