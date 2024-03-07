import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { GerenciaId } from '../../Area/Gerencia/domain/GerenciaId'

export class EmployeeGerenciaId extends AcceptedNullValueObject<Primitives<GerenciaId>> {
  constructor (readonly value: Primitives<GerenciaId> | null) {
    super(value)

    this.ensureIsValidGerenciaId(value)
  }

  toPrimitives (): Primitives<GerenciaId> | null {
    return this.value
  }

  private ensureIsValidGerenciaId (id: Primitives<GerenciaId> | null): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('GerenciaId is required')
    }
  }

  private isValid (id: Primitives<GerenciaId> | null): boolean {
    if (id === null) return true
    const gerenciaId = new GerenciaId(id)
    if (gerenciaId instanceof GerenciaId) {
      return true
    }

    return false
  }
}
