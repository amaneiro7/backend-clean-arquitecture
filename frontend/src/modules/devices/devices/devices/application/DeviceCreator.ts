import { type Repository } from '../../../../shared/domain/repository'
import { Device, type DevicePrimitives } from '../domain/Device'

type Props = ComputerProps | HardDriveProps
interface ComputerProps extends DevicePrimitives {
  categroyName: 'Computadoras'
}
interface HardDriveProps extends DevicePrimitives {
  categroyName: ''
}
export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async create ({ id, serial, activo, statusId, modelId }: Props): Promise<void> {
    const device = Device.create({ id, serial, activo, statusId, modelId })
    await this.repository.device.save({ device })
  }
}
