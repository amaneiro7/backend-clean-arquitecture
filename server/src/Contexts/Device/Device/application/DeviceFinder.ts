import { type Repository } from '../../../Shared/domain/Repository'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type DevicePrimitives } from '../domain/Device'
import { DeviceDoesNotExistError } from '../domain/DeviceDoesNotExistError'
import { DeviceId } from '../domain/DeviceId'

export class DeviceFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (id: Primitives<DeviceId>): Promise<DevicePrimitives> {

    const deviceId = new DeviceId(id).value

    const device = await this.repository.device.searchById(deviceId)

    if (device === null) {
      throw new DeviceDoesNotExistError(id.toString())
    }

    return device
  }
}
