import { type HardDrive } from './HardDrive'
import { type HardDriveCapacityType } from './HardDriveCapacity'
import { type HardDriveId } from './HardDriveId'

export abstract class HardDriveRepository {
  abstract searchAll (): Promise<HardDrive[]>

  abstract save (payload: HardDrive): Promise<void>

  abstract searchById (id: HardDriveId): Promise<HardDrive | null>

  abstract searchByCapacity (capacity: HardDriveCapacityType): Promise<HardDrive | null>

  abstract remove (id: HardDriveId): Promise<void>
}
