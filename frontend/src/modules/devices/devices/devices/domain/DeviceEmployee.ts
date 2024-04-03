import { EmployeeId } from '../../../../employee/employee/domain/EmployeeId'
import { AcceptedNullValueObject } from '../../../../shared/domain/value-object/AcceptedNullValueObjects'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type DeviceId } from './DeviceId'

export class DeviceEmployee extends AcceptedNullValueObject<Primitives<EmployeeId>> {
  constructor (
    readonly value: Primitives<DeviceId> | null
  ) {
    super(value)

    if (!DeviceEmployee.isValid(this.value)) {
      throw new Error(DeviceEmployee.invalidMessage(this.value))
    }
  }

  public static isValid (id: Primitives<DeviceEmployee> | null): boolean {
    if (id === null || id === '') return true
    const employeeId = new EmployeeId(id)
    if (employeeId instanceof EmployeeId) {
      return true
    }

    return false
  }

  public static invalidMessage (value: string): string {
    return `El id del empleado proporcionado ${value} no es válido`
  }
}
