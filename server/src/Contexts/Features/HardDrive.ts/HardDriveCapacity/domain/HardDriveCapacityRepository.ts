import { type HardDriveCapacityPrimitives } from './HardDriveCapacity'

export abstract class HardDriveCapacityRepository {
  abstract searchAll (): Promise<HardDriveCapacityPrimitives[]>

  abstract searchById (id: number): Promise<HardDriveCapacityPrimitives | null>
}
