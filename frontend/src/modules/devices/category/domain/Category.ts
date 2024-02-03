import { type CategoryId } from './CategoryId'
import { type CategoryName } from './CategoryName'

export interface CategoryPrimitives {
  id: number
  name: string
}

export class Category {
  constructor (
    private readonly id: CategoryId,
    private readonly name: CategoryName
  ) {}

  idValue (): number {
    return this.id.value
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): CategoryPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
