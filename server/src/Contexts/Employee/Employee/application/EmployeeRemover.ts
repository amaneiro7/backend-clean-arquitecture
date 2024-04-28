import { Repository } from "../../../Shared/domain/Repository"
import { Primitives } from "../../../Shared/domain/value-object/Primitives"
import { EmployeeId } from "../domain/EmployeeId"

export class EmployeeRemover {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: Primitives<EmployeeId> }): Promise<void> {
    const { id } = params
    const employeeId = new EmployeeId(id)

    await this.repository.employee.remove(employeeId.value)
  }
}
