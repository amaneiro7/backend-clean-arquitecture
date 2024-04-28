import { EmployeePrimitives } from '../../../employee/Employee/domain/Employee'
import { type Repository } from '../../../Shared/domain/Repository'

export class SearchAllEmployees {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<EmployeePrimitives[]> {
    return await this.repository.employee.searchAll()
  }
}
