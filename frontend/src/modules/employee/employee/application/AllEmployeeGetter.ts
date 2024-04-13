import { type Repository } from '../../../shared/domain/repository'
import { type EmployeePrimitives } from '../domain/Employee'

export class AllEmployeeGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<EmployeePrimitives[]> {
    return await this.repository.employee.getAll()
  }
}
