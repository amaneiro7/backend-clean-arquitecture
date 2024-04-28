import { type Repository } from '../../../shared/domain/repository'
import { EmployeeId } from '../domain/EmployeeId'

export class EmployeeRemover {
  constructor (private readonly repository: Repository) {}

  async remove (id: string): Promise<void> {
    const employeeId = new EmployeeId(id)
    await this.repository.employee.remove({ id: employeeId })
  }
}
