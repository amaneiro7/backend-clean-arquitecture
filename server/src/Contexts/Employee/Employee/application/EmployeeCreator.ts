
import { Repository } from '../../../Shared/domain/Repository'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { Employee, EmployeePrimitives } from '../domain/Employee'
import { EmployeeUserName } from '../domain/EmployeeUsername'

export class EmployeeCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: Omit<EmployeePrimitives, 'id'>): Promise<void> {    

    const employee = Employee.create(params)

    await EmployeeUserName.ensureEmployeeDoesNotExit({repository: this.repository.employee, userName: params.userName})

    await this.repository.employee.save(employee.toPrimitive())
  }
  
}
