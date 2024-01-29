import { type Repository } from '../../../../Shared/domain/Repository'
import { Device } from '../../domain/Device'
import { DeviceActivo } from '../../domain/DeviceActivo'
import { DeviceAlreadyExistError } from '../../domain/DeviceAlreadyExistError'
import { DeviceSerial } from '../../domain/DeviceSerial'

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { activo: string, serial: string, statusId: number, modelId: string }): Promise<void> {
    const { activo, serial, statusId, modelId } = params

    await this.ensureSerialDoesNotExist(serial)
    await this.ensureActivoDoesNotExist(activo)

    const device = Device.create({ activo, serial, statusId, modelId })

    await this.repository.device.save(device.toPrimitives())
  }

  private async ensureSerialDoesNotExist (name: string): Promise<void> {
    if (await this.repository.device.searchByActivo(new DeviceActivo(name).toString()) !== null) {
      throw new DeviceAlreadyExistError(name)
    }
  }

  private async ensureActivoDoesNotExist (name: string): Promise<void> {
    if (await this.repository.device.searchBySerial(new DeviceSerial(name).toString()) !== null) {
      throw new DeviceAlreadyExistError(name)
    }
  }
}
