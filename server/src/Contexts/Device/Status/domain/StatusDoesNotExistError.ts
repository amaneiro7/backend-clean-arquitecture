import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type StatusId } from './StatusId'

export class StatusDoesNotExistError extends Error {
  constructor (public readonly value: Primitives<StatusId>) {
    super(`The status ${value} does not exist`)
  }
}
