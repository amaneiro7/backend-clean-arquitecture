import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { MainCategoryId } from './MainCategoryId'
import { MainCategoryName } from './MainCategoryName'

export interface MainCategoryPrimitives {
  id: Primitives<MainCategoryId>
  name: Primitives<MainCategoryName>
}

export const MainCategoryList = {
  COMPUTER: '1',
  SCREENS: '2',
  PRINTERS: '3',
  PARTS: '4'
} as const

export class MainCategory {
  constructor(
    private readonly id: MainCategoryId,
    private readonly name: MainCategoryName
  ) { }

  static fromPrimitives(primitives: MainCategoryPrimitives): MainCategory {
    return new MainCategory(
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
