import { Repository } from "../../../Shared/domain/Repository"
import { Primitives } from "../../../Shared/domain/value-object/Primitives"
import { EmployeePrimitives } from "../domain/Employee"
import { EmployeeDoesNotExistError } from "../domain/EmployeeDoesNotExistError"
import { EmployeeId } from "../domain/EmployeeId"

export class EmployeeFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (id: Primitives<EmployeeId>): Promise<EmployeePrimitives> {
    const employeeId = new EmployeeId(id).value
    const employee = await this.repository.employee.searchById(employeeId)

    if (employee === null) {
      throw new EmployeeDoesNotExistError(employeeId)
    }

    return employee
  }
}
