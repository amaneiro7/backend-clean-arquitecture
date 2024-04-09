import { type Criteria } from '../../../Shared/domain/criteria/Criteria'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type EmployeePrimitives } from './Employee'
import { type EmployeeId } from './EmployeeId'

export abstract class EmployeeRepository {
  abstract save (payload: EmployeePrimitives): Promise<void>

  abstract searchAll (): Promise<EmployeePrimitives[]>

  abstract matching (criteria: Criteria): Promise<EmployeePrimitives[]>

  abstract searchById (employeeId: Primitives<EmployeeId>): Promise<EmployeePrimitives | null>

  abstract remove (employeeId: Primitives<EmployeeId>): Promise<void>
}
