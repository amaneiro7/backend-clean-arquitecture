import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { GerenciaId } from './GerenciaId'
import { GerenciaName } from './GerenciaName'

export interface GerenciaPrimitives {
  id: Primitives<GerenciaId>
  name: Primitives<GerenciaName>
}

export class Gerencia {
  constructor (
    private readonly id: GerenciaId,
    private readonly name: GerenciaName
  ) {}

  static fromPrimitives (primitives: GerenciaPrimitives): Gerencia {
    return new Gerencia(
      new GerenciaId(primitives.id),
      new GerenciaName(primitives.name)
    )
  }

  toPrimitive (): GerenciaPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<GerenciaId> {
    return this.id.value
  }

  get nameValue (): Primitives<GerenciaName> {
    return this.name.value
  }
}
