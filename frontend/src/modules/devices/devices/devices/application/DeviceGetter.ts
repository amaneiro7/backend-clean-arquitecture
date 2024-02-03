import { type Repository } from '../../../../shared/domain/repository'
import { type DevicePrimitives } from '../domain/Device'
import { type DeviceId } from '../domain/DeviceId'

export class DeviceGetter {
  constructor (private readonly repository: Repository) {}

  async getById (id: DeviceId): Promise<DevicePrimitives | null> {
    return await this.repository.device.getById({ id })
  }
}
