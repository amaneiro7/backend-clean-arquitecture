import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type StatusPrimitives } from './Status'
import { type StatusId } from './StatusId'

export abstract class StatusRepository {
  abstract searchAll (): Promise<StatusPrimitives[]>

  abstract searchById (id: Primitives<StatusId>): Promise<StatusPrimitives | null>
}
