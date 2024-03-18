import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { EmployeeId } from '../../../Employee/Employee/domain/EmployeeId'

export class DeviceEmployee extends AcceptedNullValueObject<Primitives<EmployeeId>> {
  constructor (
    readonly value: Primitives<EmployeeId> | null
  ) {
    super(value)
    // this.nullIsCargoisHigherThanCoordinador(cargoId)
    this.ensureIsValidEmployeeId(value)
  }

  toPrimitives (): Primitives<EmployeeId> | null {
    return this.value
  }

  //   private nullIsCargoisHigherThanCoordinador (cargo: Primitives<CargoId>): void {
  //     const positionHigerThanCoordinator: CargosValues[] = ['Vicepresidente Ejecutivo']
  //     const IsPositionHigherThanCoordinator = positionHigerThanCoordinator.includes(CargoName.AcceptedCargos[cargo])
  //     if (IsPositionHigherThanCoordinator) {
  //       this.updateValue(null) // Is position higher than coordinator, so set it as null
  //     }
  //   }

  private ensureIsValidEmployeeId (id: Primitives<EmployeeId> | null): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('EmployeeId is required')
    }
  }

  private isValid (id: Primitives<EmployeeId> | null): boolean {
    if (id === null) return true
    const employeeId = new EmployeeId(id)
    if (employeeId instanceof EmployeeId) {
      return true
    }

    return false
  }
}
