import { type Repository } from '../../../../shared/domain/repository'
import { type DevicePrimitives } from '../domain/Device'

export class AllDeviceGetter {
  constructor (private readonly repository: Repository) {}
  async get (): Promise<DevicePrimitives[]> {
    return await this.repository.device.getAll()
  }
}
