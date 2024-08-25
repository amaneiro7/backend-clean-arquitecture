import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type HardDriveCapacityPrimitives } from './HardDriveCapacity'
import { type HardDriveCapacityId } from './HardDriveCapacityId'

export abstract class HardDriveCapacityRepository {
  abstract searchAll (): Promise<HardDriveCapacityPrimitives[]>

  abstract searchById (id: Primitives<HardDriveCapacityId>): Promise<HardDriveCapacityPrimitives | null>
}
