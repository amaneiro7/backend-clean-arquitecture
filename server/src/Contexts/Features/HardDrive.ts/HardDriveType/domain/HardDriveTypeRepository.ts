import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type HardDriveTypePrimitives } from './HardDriveType'
import { type HardDriveTypeId } from './HardDriveTypeId'

export abstract class HardDriveTypeRepository {
  abstract searchAll (): Promise<HardDriveTypePrimitives[]>

  abstract searchById (id: Primitives<HardDriveTypeId>): Promise<HardDriveTypePrimitives | null>
}
