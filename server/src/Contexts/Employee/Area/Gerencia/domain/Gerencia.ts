import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { VicepresidenciaId } from '../../VicePresidencia/domain/vicepresidenciaId'
import { GerenciaId } from './GerenciaId'
import { GerenciaName } from './GerenciaName'

export interface GerenciaPrimitives {
  id: Primitives<GerenciaId>
  vicepresidenciaId: Primitives<VicepresidenciaId>
  name: Primitives<GerenciaName>
}

export class Gerencia {
  constructor (
    private readonly id: GerenciaId,
    private readonly vicepresidenciaId: VicepresidenciaId,
    private readonly name: GerenciaName
  ) {}

  static fromPrimitives (primitives: GerenciaPrimitives): Gerencia {
    return new Gerencia(
      new GerenciaId(primitives.id),
      new VicepresidenciaId(primitives.vicepresidenciaId),
      new GerenciaName(primitives.name)
    )
  }

  toPrimitive (): GerenciaPrimitives {
    return {
      id: this.idValue,
      vicepresidenciaId: this.vicepresidenciaValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<GerenciaId> {
    return this.id.value
  }

  get vicepresidenciaValue (): Primitives<GerenciaId> {
    return this.vicepresidenciaId.value
  }

  get nameValue (): Primitives<GerenciaName> {
    return this.name.value
  }
}
