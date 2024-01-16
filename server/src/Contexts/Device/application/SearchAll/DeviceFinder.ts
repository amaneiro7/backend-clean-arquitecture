import { type Repository } from '../../../Shared/domain/Repository'
import { type DevicePrimitives } from '../../domain/Device'

export class SearchAllDevices {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<DevicePrimitives[]> {
    const devices = await this.repository.device.searchAll()
    return devices.map(device => device.toPrimitives())
  }
}
