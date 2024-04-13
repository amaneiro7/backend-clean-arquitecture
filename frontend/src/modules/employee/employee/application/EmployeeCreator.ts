import { type Repository } from '../../../shared/domain/repository'
import { Employee, type EmployeePrimitives } from '../domain/Employee'
import { EmployeeId } from '../domain/EmployeeId'

export class EmployeeCreator {
  constructor (private readonly repository: Repository) {}

  async create (params: EmployeePrimitives): Promise<void> {
    const employee = Employee.create(params)

    if (params.id === undefined) {
      await this.repository.employee.save({ employee })
    } else {
      const employeeId = new EmployeeId(params.id)
      await this.repository.employee.update({ id: employeeId, employee })
    }
  }
}
