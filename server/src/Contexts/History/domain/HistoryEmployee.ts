import { EmployeeId } from "../../Employee/Employee/domain/EmployeeId"
import { AcceptedNullValueObject } from "../../Shared/domain/value-object/AcceptedNullValueObjects"
import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError"
import { Primitives } from "../../Shared/domain/value-object/Primitives"

export class HistoryEmployee extends AcceptedNullValueObject<Primitives<EmployeeId>> {
  constructor(
    readonly value: Primitives<EmployeeId> | null,
  ) {
    super(value)
    this.ensureIsValidEmployeeId(value)
  }

  toPrimitives(): Primitives<EmployeeId> | null {
    return this.value
  }

  private ensureIsValidEmployeeId(id: Primitives<EmployeeId> | null): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('EmployeeId is required')
    }
  }

  private isValid(id: Primitives<EmployeeId> | null): boolean {
    if (id === null) return true
    const employeeId = new EmployeeId(id)
    if (employeeId instanceof EmployeeId) {
      return true
    }

    return false
  }


}
