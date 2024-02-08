import { type HardDrive, type HardDrivePrimitives } from './HardDrive'
import { type HardDriveId } from './HardDriveId'

export abstract class HardDriveRepository {
  abstract getById ({ id }: { id: HardDriveId }): Promise<HardDrivePrimitives>

  abstract save ({ hardDrive }: { hardDrive: HardDrive }): Promise<void>

  abstract update ({ id, hardDrive }: { id: HardDriveId, hardDrive: HardDrive }): Promise<void>
}
