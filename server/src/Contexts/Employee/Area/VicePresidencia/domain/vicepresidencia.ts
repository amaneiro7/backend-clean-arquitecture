import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { VicePresidenciaId } from './vicepresidenciaId'
import { VicePresidenciaName } from './vicepresidenciaName'

export interface VicepresidenciaPrimitives {
  id: Primitives<VicePresidenciaId>
  name: Primitives<VicePresidenciaName>
}

export class Vicepresidencia {
  constructor (
    private readonly id: VicePresidenciaId,
    private readonly name: VicePresidenciaName
  ) {}

  static fromPrimitives (primitives: VicepresidenciaPrimitives): Vicepresidencia {
    return new Vicepresidencia(
      new VicePresidenciaId(primitives.id),
      new VicePresidenciaName(primitives.name)
    )
  }

  toPrimitive (): VicepresidenciaPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<VicePresidenciaId> {
    return this.id.value
  }

  get nameValue (): Primitives<VicePresidenciaName> {
    return this.name.value
  }
}
