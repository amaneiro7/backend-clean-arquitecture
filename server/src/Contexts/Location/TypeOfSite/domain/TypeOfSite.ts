import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { TypeOfSiteId } from './TypeOfSiteId'
import { TypeOfSiteName } from './TypeOfSiteName'

export interface TypeOfSitePrimitives {
  id: Primitives<TypeOfSiteId>
  name: Primitives<TypeOfSiteName>
}

export class TypeOfSite {
  constructor (
    private readonly id: TypeOfSiteId,
    private readonly name: TypeOfSiteName
  ) {}

  static fromPrimitives (primitives: TypeOfSitePrimitives): TypeOfSite {
    return new TypeOfSite(
      new TypeOfSiteId(primitives.id),
      new TypeOfSiteName(primitives.name)
    )
  }

  toPrimitive (): TypeOfSitePrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<TypeOfSiteId> {
    return this.id.value
  }

  get nameValue (): Primitives<TypeOfSiteName> {
    return this.name.value
  }
}
