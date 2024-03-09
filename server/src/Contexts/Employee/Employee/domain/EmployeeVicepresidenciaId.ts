import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { VicepresidenciaId } from '../../Area/VicePresidencia/domain/vicepresidenciaId'
import { type CargoId } from '../../Cargo/domain/CargoId'
import { CargoName, type CargosValues } from '../../Cargo/domain/CargoName'

export class EmployeeVicepresidenciaId extends AcceptedNullValueObject<Primitives<VicepresidenciaId>> {
  constructor (
    readonly value: Primitives<VicepresidenciaId> | null,
    private readonly cargoId: Primitives<CargoId>
  ) {
    super(value)
    this.nullIsCargoisHigherThanCoordinador(cargoId)
    this.ensureIsValidVicepresidenciaId(value)
  }

  toPrimitives (): Primitives<VicepresidenciaId> | null {
    return this.value
  }

  private nullIsCargoisHigherThanCoordinador (cargo: Primitives<CargoId>): void {
    const positionHigerThanCoordinator: CargosValues[] = ['Vicepresidente Ejecutivo']
    const IsPositionHigherThanCoordinator = positionHigerThanCoordinator.includes(CargoName.AcceptedCargos[cargo])
    if (IsPositionHigherThanCoordinator) {
      this.updateValue(null) // Is position higher than coordinator, so set it as null
    }
  }

  private ensureIsValidVicepresidenciaId (id: Primitives<VicepresidenciaId> | null): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('VicepresidenciaId is required')
    }
  }

  private isValid (id: Primitives<VicepresidenciaId> | null): boolean {
    if (id === null) return true
    const vicepresidenciaId = new VicepresidenciaId(id)
    if (vicepresidenciaId instanceof VicepresidenciaId) {
      return true
    }

    return false
  }
}
