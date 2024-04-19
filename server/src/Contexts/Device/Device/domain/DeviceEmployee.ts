import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { EmployeeId } from '../../../Employee/Employee/domain/EmployeeId'
import { type EmployeeRepository } from '../../../employee/Employee/domain/EmployeeRepository'
import { EmployeeDoesNotExistError } from '../../../Employee/Employee/domain/EmployeeDoesNotExistError'
import { type EmployeePrimitives } from '../../../employee/Employee/domain/Employee'
import { type Device } from './Device'

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

  static async updateEmployeeField ({ repository, employee, entity }: { repository: EmployeeRepository, employee?: Primitives<DeviceEmployee>, entity: Device }): Promise<void> {
    // Si no se ha pasado un nuevo empleado no realiza ninguna acción
    if (employee === undefined) {
      return
    }
    // Verifica que si el valor actual y el nuevo valor son iguales no realice ningún cambio
    if (entity.employeeeValue === employee) {
      return
    }
    // Verifica que el empleado exista en la base de datos, si no existe lanza un error {@link EmployeeDoesNotExistError} con el empleado pasado
    await DeviceEmployee.ensureEmployeeExit({ repository, employee })
    // Actualiza el campo empleado de la entidad {@link Device} con el nuevo empleado
    entity.updateEmployee(employee)
  }

  static async ensureEmployeeExit ({ repository, employee }: { repository: EmployeeRepository, employee: Primitives<DeviceEmployee> }): Promise<void> {
    // If the empleado is null, it does not exist, so we don't need to do any verification
    if (employee === null) {
      return
    }
    // Searches for a device with the given empleado in the database
    const deviceWithEmployee: EmployeePrimitives | null = await repository.searchById(new EmployeeId(employee).toString())
    // If a device with the given empleado exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given empleado
    if (deviceWithEmployee !== null) {
      throw new EmployeeDoesNotExistError(employee)
    }
  }
}
