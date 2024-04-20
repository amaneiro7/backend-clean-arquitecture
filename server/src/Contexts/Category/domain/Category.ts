import { type Primitives } from '../../Shared/domain/value-object/Primitives'
import { CategoryId } from './CategoryId'
import { CategoryName } from './CategoryName'

export interface CategoryPrimitives {
  id: Primitives<CategoryId>
  name: Primitives<CategoryName>
}

export const CategoryValues = {
  COMPUTADORAS: '1',
  SERVIDORES: '2',
  LAPTOPS: '3',
  ALLINONE: '4',
  MONITORES: '5',
  FINANCIERASPRINTER: '6',
  LASERPRINTER: '7',
  INKPRINTER: '8',
  HARDDRIVE: '9',
  KEYBOARD: '10'
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

  get idValue (): Primitives<CategoryId> {
    return this.id.value
  }

  get nameValue (): Primitives<CategoryName> {
    return this.name.value
  }
}
