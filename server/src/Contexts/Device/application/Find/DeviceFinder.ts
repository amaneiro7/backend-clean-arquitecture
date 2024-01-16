import { type Repository } from '../../../Shared/domain/Repository'
import { type DevicePrimitives } from '../../domain/Device'
import { type DeviceActivo } from '../../domain/DeviceActivo'
import { DeviceDoesNotExistError } from '../../domain/DeviceDoesNotExistError'
import { type DeviceId } from '../../domain/DeviceId'
import { type DeviceSerial } from '../../domain/DeviceSerial'

export class DeviceFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (deviceId: DeviceId): Promise<DevicePrimitives> {
    const device = await this.repository.device.searchById(deviceId)

    if (device === null) {
      throw new DeviceDoesNotExistError(deviceId.toString())
    }

    return device.toPrimitives()
  }

  async searchBySerial (serial: DeviceSerial): Promise<DevicePrimitives> {
    const device = await this.repository.device.searchBySerial(serial)

    if (device === null) {
      throw new DeviceDoesNotExistError(serial.toString())
    }

    return device.toPrimitives()
  }

  async searchByactivo (activo: DeviceActivo): Promise<DevicePrimitives> {
    const device = await this.repository.device.searchByActivo(activo)

    if (device === null) {
      throw new DeviceDoesNotExistError(activo.toString())
    }

    return device.toPrimitives()
  }
}
