import { type HardDriveTypePrimitives } from './HardDriveType'

export abstract class HardDriveTypeRepository {
  abstract searchAll (): Promise<HardDriveTypePrimitives[]>

  abstract searchById (id: number): Promise<HardDriveTypePrimitives | null>
}
