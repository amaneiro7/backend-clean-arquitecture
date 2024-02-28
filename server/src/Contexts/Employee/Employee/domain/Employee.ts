import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type UserEmail } from '../../../User/user/domain/UserEmail'
import { type CargoId } from '../../Cargo/domain/CargoId'
import { EmployeeId } from './EmployeeId'
import { EmployeeName } from './EmployeeName'

export interface EmployeePrimitives {
  id: Primitives<EmployeeId>
  name: Primitives<EmployeeName>
}

export class Employee {
  constructor (
    private readonly id: EmployeeId,
    private readonly name: EmployeeName,
    private readonly lastName: EmployeeLastName,
    private readonly cedula: EmployeeCedula,
    private readonly email: UserEmail,
    private readonly cargoId: CargoId,
    private readonly extension: Extension,
    private readonly telefono: Telefono
  ) {}

  static fromPrimitives (primitives: EmployeePrimitives): Employee {
    return new Employee(
      new EmployeeId(primitives.id),
      new EmployeeName(primitives.name)
    )
  }

  toPrimitive (): EmployeePrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<EmployeeId> {
    return this.id.value
  }

  get nameValue (): Primitives<EmployeeName> {
    return this.name.value
  }
}
