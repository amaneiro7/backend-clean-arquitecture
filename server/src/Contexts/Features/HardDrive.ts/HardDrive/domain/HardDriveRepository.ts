import { type HardDrivePrimitives } from './HardDriveold'

export abstract class HardDriveRepository {
  abstract searchAll (): Promise<HardDrivePrimitives[]>

  abstract save (payload: HardDrivePrimitives): Promise<void>

  abstract searchById (id: string): Promise<HardDrivePrimitives | null>

  abstract searchByDeviceId (id: string): Promise<HardDrivePrimitives | null>

  abstract remove (id: string): Promise<void>
}
