import { type Repository } from '../../../../shared/domain/repository'
import { type DevicePrimitives } from '../domain/Device'
import { DeviceId } from '../domain/DeviceId'

export class DeviceGetter {
  constructor (private readonly repository: Repository) {}

  async getById (id: string): Promise<DevicePrimitives> {
    const deviceId = new DeviceId(id)
    return await this.repository.device.getById({ id: deviceId })
  }
}
