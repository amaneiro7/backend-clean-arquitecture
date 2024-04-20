import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemPrimitives } from './OperatingSystem'
import { type OperatingSystemId } from './OperatingSystemId'

export abstract class OperatingSystemRepository {
  abstract searchAll (): Promise<OperatingSystemPrimitives[]>

  abstract searchById (id: Primitives<OperatingSystemId>): Promise<OperatingSystemPrimitives | null>
}
