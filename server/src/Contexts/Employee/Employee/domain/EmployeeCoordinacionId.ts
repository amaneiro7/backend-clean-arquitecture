import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { CoordinacionId } from '../../Area/Coordinacion/domain/CoordinacionId'
import { type CargoId } from '../../Cargo/domain/CargoId'

export class EmployeeCoordinacionId extends AcceptedNullValueObject<Primitives<CoordinacionId>> {
  constructor (
    readonly value: Primitives<CoordinacionId> | null,
    private readonly cargoId: Primitives<CargoId>
  ) {
    super(value)

    this.ensureIsValidCoordinacionId(value)
  }

  toPrimitives (): Primitives<CoordinacionId> | null {
    return this.value
  }

  private ensureIsValidCoordinacionId (id: Primitives<CoordinacionId> | null): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('CoordinacionId is required')
    }
  }

  private isValid (id: Primitives<CoordinacionId> | null): boolean {
    if (id === null) return true
    const coordinacionId = new CoordinacionId(id)
    if (coordinacionId instanceof CoordinacionId) {
      return true
    }

    return false
  }
}
