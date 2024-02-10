import { type Repository } from '../../../../shared/domain/repository'
import { Device, type DevicePrimitives } from '../domain/Device'

export type CreateDeviceProps = ComputerProps | HardDriveProps
interface ComputerProps extends DevicePrimitives {
  categroyName: 'Computadoras'
  processorId: string
  memoryRamCapacity: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
  operatingSystemId: number
  operatingSystemArqId: number
  ipAddress: string
  macAddress: string
}
interface HardDriveProps extends DevicePrimitives {
  categroyName: 'Discos Duros'
  hardDriveCapacityId: number
  hardDriveTypeId: number
  health: number
}
export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async create ({ id, serial, activo, statusId, modelId }: CreateDeviceProps): Promise<void> {
    // if ()
    const device = Device.create({ id, serial, activo, statusId, modelId })
    await this.repository.device.save({ device })
  }
}
