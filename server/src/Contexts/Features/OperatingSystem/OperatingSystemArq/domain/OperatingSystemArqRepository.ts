import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemArqPrimitives } from './OperatingSystemArq'
import { type OperatingSystemArqId } from './OperatingSystemArqID'

export abstract class OperatingSystemArqRepository {
  abstract searchAll (): Promise<OperatingSystemArqPrimitives[]>

  abstract searchById (id: Primitives<OperatingSystemArqId>): Promise<OperatingSystemArqPrimitives | null>
}
