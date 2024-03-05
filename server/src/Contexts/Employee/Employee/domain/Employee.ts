import { type LocationId } from '../../../Location/Location/domain/LocationId'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type UserEmail } from '../../../User/user/domain/UserEmail'
import { type CargoId } from '../../Cargo/domain/CargoId'
import { type EmployeeCedula } from './EmployeeCedula'
import { EmployeeId } from './EmployeeId'
import { type EmployeeLastName } from './EmployeeLastName'
import { EmployeeName } from './EmployeeName'
import { type Extension } from './Extension'
import { type PhoneNumber } from './PhoneNumber'

export interface EmployeePrimitives {
  id: Primitives<EmployeeId>
  name: Primitives<EmployeeName>
  lastName: Primitives<EmployeeLastName>
  cedula: Primitives<EmployeeCedula>
  location: Primitives<LocationId>
  email: Primitives<UserEmail>
  cargoId: Primitives<CargoId>
  extension: Primitives<Extension>
  phoneNumber: Primitives<PhoneNumber>
}

export class Employee {
  constructor (
    private readonly id: EmployeeId,
    private readonly name: EmployeeName,
    private readonly lastName: EmployeeLastName,
    private readonly cedula: EmployeeCedula,
    private readonly location: LocationId,
    private readonly email: UserEmail,
    private readonly cargoId: CargoId,
    private readonly extension: Extension,
    private readonly phoneNumber: PhoneNumber
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
