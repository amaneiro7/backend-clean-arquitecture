import { type Repository } from '../../../Shared/domain/Repository'
import { type DevicePrimitives } from '../domain/Device'
import { type DeviceActivo } from '../domain/DeviceActivo'
import { DeviceDoesNotExistError } from '../domain/DeviceDoesNotExistError'
import { type DeviceId } from '../domain/DeviceId'
import { type DeviceSerial } from '../domain/DeviceSerial'

export class DeviceFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (id: DeviceId): Promise<DevicePrimitives> {
    const device = await this.repository.device.searchById(id.value)

    if (device === null) {
      throw new DeviceDoesNotExistError(id.toString())
    }

    return device
  }

  async searchBySerial (serial: DeviceSerial): Promise<DevicePrimitives> {
    const device = await this.repository.device.searchBySerial(serial.toString())

    if (device === null) {
      throw new DeviceDoesNotExistError(serial.toString())
    }

    return device
  }

  async searchByactivo (activo: DeviceActivo): Promise<DevicePrimitives> {
    const device = await this.repository.device.searchByActivo(activo.toString())

    if (device === null) {
      throw new DeviceDoesNotExistError(activo.toString())
    }

    return device
  }
}
