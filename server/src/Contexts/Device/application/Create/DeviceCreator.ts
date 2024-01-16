import { type Repository } from '../../../Shared/domain/Repository'
import { type StatusTypes } from '../../../Status/domain/Status'
import { Device } from '../../domain/Device'
import { DeviceActivo } from '../../domain/DeviceActivo'
import { DeviceAlreadyExistError } from '../../domain/DeviceAlreadyExistError'
import { DeviceSerial } from '../../domain/DeviceSerial'

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { activo: string, serial: string, status: StatusTypes, modelId: string }): Promise<void> {
    const { activo, serial, status, modelId } = params

    this.ensureSerialDoesNotExist(serial)
    this.ensureActivoDoesNotExist(activo)

    const device = Device.create({ activo, serial, status, modelId })

    await this.repository.device.save(device)
  }

  private ensureSerialDoesNotExist (name: string): void {
    if (this.repository.device.searchByActivo(new DeviceActivo(name)) !== null) {
      throw new DeviceAlreadyExistError(name)
    }
  }

  private ensureActivoDoesNotExist (name: string): void {
    if (this.repository.device.searchBySerial(new DeviceSerial(name)) !== null) {
      throw new DeviceAlreadyExistError(name)
    }
  }
}
