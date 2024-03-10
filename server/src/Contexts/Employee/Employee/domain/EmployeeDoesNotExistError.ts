import { type DeviceEmployee } from '../../../Device/Device/domain/DeviceEmployee'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'

export class EmployeeDoesNotExistError extends Error {
  constructor (public readonly value: Primitives<DeviceEmployee>) {
    super(`The employee ${value} does not exist`)
  }
}
