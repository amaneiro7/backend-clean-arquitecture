import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { CoordinacionId } from '../../Area/Coordinacion/domain/CoordinacionId'
import { type CargoId } from '../../Cargo/domain/CargoId'
import { CargoName, type CargosValues } from '../../Cargo/domain/CargoName'

export class EmployeeCoordinacionId extends AcceptedNullValueObject<Primitives<CoordinacionId>> {
  constructor (
    readonly value: Primitives<CoordinacionId> | null,
    private readonly cargoId: Primitives<CargoId>
  ) {
    super(value)
    this.nullIsCargoisHigherThanCoordinador(cargoId)
    this.ensureIsValidCoordinacionId(value)
  }

  toPrimitives (): Primitives<CoordinacionId> | null {
    return this.value
  }

  private nullIsCargoisHigherThanCoordinador (cargo: Primitives<CargoId>): void {
    const positionHigerThanCoordinator: CargosValues[] = ['Gerente', 'Vicepresidente', 'Vicepresidente Ejecutivo']
    const IsPositionHigherThanCoordinator = positionHigerThanCoordinator.includes(CargoName.AcceptedCargos[cargo])
    if (IsPositionHigherThanCoordinator) {
      this.updateValue(null) // Is position higher than coordinator, so set it as null
    }
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
