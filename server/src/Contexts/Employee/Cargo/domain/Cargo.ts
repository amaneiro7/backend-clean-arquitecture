import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { CargoId } from './CargoId'
import { CargoName } from './CargoName'

export interface CargoPrimitives {
  id: Primitives<CargoId>
  name: Primitives<CargoName>
}

export class Cargo {
  constructor (
    private readonly id: CargoId,
    private readonly name: CargoName
  ) {}

  static fromPrimitives (primitives: CargoPrimitives): Cargo {
    return new Cargo(
      new CargoId(primitives.id),
      new CargoName(primitives.name)
    )
  }

  toPrimitive (): CargoPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<CargoId> {
    return this.id.value
  }

  get nameValue (): Primitives<CargoName> {
    return this.name.value
  }
}
