import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { VicepresidenciaEjecutivaId } from '../../VicepresidenciaEjecutiva/domain/VicepresidenciaEjecutivaId'
import { VicepresidenciaId } from './vicepresidenciaId'
import { VicepresidenciaName } from './vicepresidenciaName'

export interface VicepresidenciaPrimitives {
  id: Primitives<VicepresidenciaId>
  vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
  name: Primitives<VicepresidenciaName>
}

export class Vicepresidencia {
  constructor (
    private readonly id: VicepresidenciaId,
    private readonly vicepresidenciaEjecutivaId: VicepresidenciaEjecutivaId,
    private readonly name: VicepresidenciaName
  ) {}

  static fromPrimitives (primitives: VicepresidenciaPrimitives): Vicepresidencia {
    return new Vicepresidencia(
      new VicepresidenciaId(primitives.id),
      new VicepresidenciaEjecutivaId(primitives.vicepresidenciaEjecutivaId),
      new VicepresidenciaName(primitives.name)
    )
  }

  toPrimitive (): VicepresidenciaPrimitives {
    return {
      id: this.idValue,
      vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<VicepresidenciaId> {
    return this.id.value
  }

  get vicepresidenciaEjecutivaValue (): Primitives<VicepresidenciaEjecutivaId> {
    return this.vicepresidenciaEjecutivaId.value
  }

  get nameValue (): Primitives<VicepresidenciaName> {
    return this.name.value
  }
}
