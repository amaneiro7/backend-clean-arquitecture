import { type DeviceId } from '../../../Device/Device/domain/DeviceId'
import { type Repository } from '../../../Shared/domain/Repository'
import { type ComputerPrimitives } from '../domain/Computer'
import { ComputerDoesNotExistError } from '../domain/ComputerDoesNotExistError'

export class ComputerFinder {
  constructor (private readonly repository: Repository) {}

  async searchByDeviceId (deviceId: DeviceId): Promise<ComputerPrimitives> {
    const computer = await this.repository.computer.searchByDeviceId(deviceId.value)
    if (computer === null) throw new ComputerDoesNotExistError(deviceId.value)
    return computer
  }
}
