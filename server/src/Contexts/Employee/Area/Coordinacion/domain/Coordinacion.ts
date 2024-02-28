import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { CoordinacionId } from './CoordinacionId'
import { CoordinacionName } from './CoordinacionName'

export interface CoordinacionPrimitives {
  id: Primitives<CoordinacionId>
  name: Primitives<CoordinacionName>
}

export class Coordinacion {
  constructor (
    private readonly id: CoordinacionId,
    private readonly name: CoordinacionName
  ) {}

  static fromPrimitives (primitives: CoordinacionPrimitives): Coordinacion {
    return new Coordinacion(
      new CoordinacionId(primitives.id),
      new CoordinacionName(primitives.name)
    )
  }

  toPrimitive (): CoordinacionPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<CoordinacionId> {
    return this.id.value
  }

  get nameValue (): Primitives<CoordinacionName> {
    return this.name.value
  }
}
