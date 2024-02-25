import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type StatePrimitives } from './State'
import { type StateId } from './StateId'

export abstract class StateRepository {
  abstract searchAll (): Promise<StatePrimitives[]>

  abstract searchById (id: Primitives<StateId>): Promise<StatePrimitives | null>
}
