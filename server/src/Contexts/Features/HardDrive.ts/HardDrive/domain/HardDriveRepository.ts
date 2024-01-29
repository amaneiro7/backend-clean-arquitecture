import { type HardDrivePrimitives } from './HardDrive'

export abstract class HardDriveRepository {
  abstract searchAll (): Promise<HardDrivePrimitives[]>

  abstract save (payload: HardDrivePrimitives): Promise<void>

  abstract searchById (id: number): Promise<HardDrivePrimitives | null>

  abstract remove (id: number): Promise<void>
}
