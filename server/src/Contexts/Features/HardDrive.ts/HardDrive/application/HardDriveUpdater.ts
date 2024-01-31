import { type Repository } from '../../../../Shared/domain/Repository'
import { HardDrive } from '../domain/HardDrive'
import { HardDriveDoesNotExistError } from '../domain/HardDriveDoesNotExist'
import { HardDriveId } from '../domain/HardDriveId'

export class HardDriveUpdater {
  constructor (private readonly repository: Repository) {}
  async run (params: { id: string, newHealth?: number }): Promise<void> {
    const { id, newHealth } = params

    const hardDrive = await this.repository.hardDrive.searchById(new HardDriveId(id).value)

    if (hardDrive === null) throw new HardDriveDoesNotExistError(id)
    const hardDriveEntity = HardDrive.fromPrimitives(hardDrive)

    if (newHealth !== undefined) {
      hardDriveEntity.updateHealth(newHealth)
    }

    await this.repository.hardDrive.save(hardDriveEntity.toPrimitive())
  }
}
