import { type Repository } from '../../../../shared/domain/repository'
import { Device } from '../domain/Device'

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async create ({ id, serial, activo, statusId, modelId }: { id: string, serial: string, activo: string | null, statusId: number, modelId: string }): Promise<void> {
    const device = Device.create({ id, serial, activo, statusId, modelId })
    await this.repository.device.save({ device })
  }
}
