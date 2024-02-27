import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { VPEId } from './vpeId'
import { VPEName } from './vpeName'

export interface VicepresidenciaEjecutivaPrimitives {
  id: Primitives<VPEId>
  name: Primitives<VPEName>
}

export class VicepresidenciaEjecutiva {
  constructor (
    private readonly id: VPEId,
    private readonly name: VPEName
  ) {}

  static fromPrimitives (primitives: VicepresidenciaEjecutivaPrimitives): VicepresidenciaEjecutiva {
    return new VicepresidenciaEjecutiva(
      new VPEId(primitives.id),
      new VPEName(primitives.name)
    )
  }

  toPrimitive (): VicepresidenciaEjecutivaPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<VPEId> {
    return this.id.value
  }

  get nameValue (): Primitives<VPEName> {
    return this.name.value
  }
}
