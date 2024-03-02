import { type Repository } from '../../../Shared/domain/Repository'
import { DeviceDoesNotExistError } from '../domain/DeviceDoesNotExistError'
import { DeviceId } from '../domain/DeviceId'

export class DeviceRemover {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string }): Promise<void> {
    const { id } = params
    const deviceId = new DeviceId(id).toString()

    const device = await this.repository.device.searchById(deviceId)
    if (device === null) {
      throw new DeviceDoesNotExistError(id)
    }

    await this.repository.device.remove(deviceId)
  }
}
