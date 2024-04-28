import { Repository } from "../../../Shared/domain/Repository"
import { Primitives } from "../../../Shared/domain/value-object/Primitives"
import { Employee, EmployeePrimitives } from "../domain/Employee"
import { EmployeeDoesNotExistError } from "../domain/EmployeeDoesNotExistError"
import { EmployeeId } from "../domain/EmployeeId"
import { EmployeeUserName } from "../domain/EmployeeUsername"

export class EmployeeUpdater {
  constructor (private readonly repository: Repository) {}

  async run ({id, params}: { id: Primitives<EmployeeId>, params: Partial<Omit<EmployeePrimitives, 'id'>> }): Promise<void> {
    const employeeId = new EmployeeId(id).value
    const employee = await this.repository.employee.searchById(employeeId)
    if (employee === null) {
      throw new EmployeeDoesNotExistError(id)
    }

    const employeeEntity = Employee.fromPrimitives(employee)

    await EmployeeUserName.updateUserNameField({repository: this.repository.employee, userName: params.userName, entity: employeeEntity})

    await this.repository.employee.save(employeeEntity.toPrimitive())
    
  }
}
