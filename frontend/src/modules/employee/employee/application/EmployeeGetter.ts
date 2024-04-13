import { type Repository } from '../../../shared/domain/repository'
import { type EmployeePrimitives } from '../domain/Employee'
import { EmployeeId } from '../domain/EmployeeId'

export class EmployeeGetter {
  constructor (private readonly repository: Repository) {}

  async getById (id: string): Promise<EmployeePrimitives> {
    const employeeId = new EmployeeId(id)
    return await this.repository.employee.getById({ id: employeeId })
  }
}
