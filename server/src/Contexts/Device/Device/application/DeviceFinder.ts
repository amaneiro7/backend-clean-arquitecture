import { type Repository } from '../../../Shared/domain/Repository'
import { type DevicePrimitives } from '../domain/Device'
import { DeviceDoesNotExistError } from '../domain/DeviceDoesNotExistError'
import { type DeviceId } from '../domain/DeviceId'

export class DeviceFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (id: DeviceId): Promise<DevicePrimitives> {
    const device = await this.repository.device.searchById(id.value)

    if (device === null) {
      throw new DeviceDoesNotExistError(id.toString())
    }

    return device
  }
}
