import { type DeviceId } from '../../../../Device/Device/domain/DeviceId'
import { type Repository } from '../../../../Shared/domain/Repository'
import { HardDrive } from '../domain/HardDrive'
import { HardDriveDoesNotExistError } from '../domain/HardDriveDoesNotExist'

interface HardDriveParams {
  health: number
}
export class HardDriveUpdater {
  constructor (private readonly repository: Repository) {}
  async run ({ deviceId, params }: { deviceId: DeviceId, params: Partial<HardDriveParams> }): Promise<void> {
    const { health } = params

    const hardDrive = await this.repository.hardDrive.searchByDeviceId(deviceId.value)

    if (hardDrive === null) throw new HardDriveDoesNotExistError(deviceId.toString())
    const hardDriveEntity = HardDrive.fromPrimitives(hardDrive)

    if (health !== undefined) {
      hardDriveEntity.updateHealth(health)
    }

    await this.repository.hardDrive.save(hardDriveEntity.toPrimitive())
  }
}
