import { CategoryId } from './CategoryId'
import { CategoryName } from './CategoryName'

export interface CategoryPrimitives {
  id: string
  name: string
}

export class Category {
  constructor (
    private readonly _id: CategoryId,
    private readonly _name: CategoryName
  ) {}

  static fromPrimitives (primitives: CategoryPrimitives): Category {
    return new Category(
      new CategoryId(primitives.id),
      new CategoryName(primitives.name)
    )
  }

  toPrimitive (): any {
    return {
      id: this._id.value,
      name: this._name.value
    }
  }

  get id (): string {
    return this._id.value
  }

  get name (): string {
    return this._name.value
  }
}
