import { EmployeeId } from '../../../../employee/employee/domain/EmployeeId'
import { AcceptedNullValueObject } from '../../../../shared/domain/value-object/AcceptedNullValueObjects'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { StatusId } from '../../status/domain/StatusId'
import { type DeviceId } from './DeviceId'

export class DeviceEmployee extends AcceptedNullValueObject<Primitives<EmployeeId>> {
  private static errors: string = ''
  constructor (
    readonly value: Primitives<DeviceId> | null,
    private readonly status: Primitives<StatusId>
  ) {
    super(value)

    if (!DeviceEmployee.isValid(this.value, this.status)) {
      throw new Error(DeviceEmployee.invalidMessage())
    }
  }

  private static updateError (error: string): void {
    DeviceEmployee.errors = error
  }

  private static get errorsValue (): string {
    return DeviceEmployee.errors
  }

  public static isValid (value: Primitives<DeviceEmployee>, status: Primitives<StatusId>): boolean {
    if (value === null || value === '') return true
    if (status !== StatusId.StatusOptions.INUSE) {
      DeviceEmployee.errors = 'Si no está en uso no se le puede asignar a un usuario'
      return false
    }
    const employeeId = new EmployeeId(value)
    if (employeeId instanceof EmployeeId) {
      return true
    }
    DeviceEmployee.updateError('El id del empleado proporcionado no es válido')
    return false
  }

  public static invalidMessage (): string {
    return DeviceEmployee.errorsValue
  }
}
