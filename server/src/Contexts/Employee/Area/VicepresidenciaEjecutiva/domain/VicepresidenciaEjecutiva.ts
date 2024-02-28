import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { VicepresidenciaEjecutivaId } from './VicepresidenciaEjecutivaId'
import { VicepresidenciaEjecutivaName } from './VicepresidenciaEjecutivaName'

export interface VicepresidenciaEjecutivaPrimitives {
  id: Primitives<VicepresidenciaEjecutivaId>
  name: Primitives<VicepresidenciaEjecutivaName>
}

export class VicepresidenciaEjecutiva {
  constructor (
    private readonly id: VicepresidenciaEjecutivaId,
    private readonly name: VicepresidenciaEjecutivaName
  ) {}

  static fromPrimitives (primitives: VicepresidenciaEjecutivaPrimitives): VicepresidenciaEjecutiva {
    return new VicepresidenciaEjecutiva(
      new VicepresidenciaEjecutivaId(primitives.id),
      new VicepresidenciaEjecutivaName(primitives.name)
    )
  }

  toPrimitive (): VicepresidenciaEjecutivaPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<VicepresidenciaEjecutivaId> {
    return this.id.value
  }

  get nameValue (): Primitives<VicepresidenciaEjecutivaName> {
    return this.name.value
  }
}
