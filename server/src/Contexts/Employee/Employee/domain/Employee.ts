import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { EmployeeId } from './EmployeeId'
import { EmployeeUserName } from './EmployeeUsername'

export interface EmployeePrimitives {
  id: Primitives<EmployeeId>
  userName: Primitives<EmployeeUserName>
}

export class Employee {
  constructor (
    private readonly id: EmployeeId,
    private userName: EmployeeUserName

  ) {}

  static create (params: Omit<EmployeePrimitives, 'id'>): Employee {
    const id = EmployeeId.random().value
    return new Employee(
      new EmployeeId(id),
      new EmployeeUserName(params.userName)
    )
  }

  updateUserName (newName: Primitives<EmployeeUserName>): void {
    this.userName = new EmployeeUserName(newName)
  }

  static fromPrimitives (primitives: EmployeePrimitives): Employee {
    return new Employee(
      new EmployeeId(primitives.id),
      new EmployeeUserName(primitives.userName)
    )
  }

  toPrimitive (): EmployeePrimitives {
    return {
      id: this.idValue,
      userName: this.userNameValue
    }
  }

  get idValue (): Primitives<EmployeeId> {
    return this.id.value
  }

  get userNameValue (): Primitives<EmployeeUserName> {
    return this.userName.value
  }
}
