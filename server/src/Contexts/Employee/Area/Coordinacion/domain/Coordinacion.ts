import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { GerenciaId } from '../../Gerencia/domain/GerenciaId'
import { CoordinacionId } from './CoordinacionId'
import { CoordinacionName } from './CoordinacionName'

export interface CoordinacionPrimitives {
  id: Primitives<CoordinacionId>
  gerenciaId: Primitives<GerenciaId>
  name: Primitives<CoordinacionName>
}

export class Coordinacion {
  constructor (
    private readonly id: CoordinacionId,
    private readonly gerenciaId: GerenciaId,
    private readonly name: CoordinacionName
  ) {}

  static fromPrimitives (primitives: CoordinacionPrimitives): Coordinacion {
    return new Coordinacion(
      new CoordinacionId(primitives.id),
      new GerenciaId(primitives.gerenciaId),
      new CoordinacionName(primitives.name)
    )
  }

  toPrimitive (): CoordinacionPrimitives {
    return {
      id: this.idValue,
      gerenciaId: this.gerenciaValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<CoordinacionId> {
    return this.id.value
  }

  get gerenciaValue (): Primitives<GerenciaId> {
    return this.gerenciaId.value
  }

  get nameValue (): Primitives<CoordinacionName> {
    return this.name.value
  }
}
