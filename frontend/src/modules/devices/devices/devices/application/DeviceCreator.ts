import { type Repository } from '../../../../shared/domain/repository'
import { Computer, type ComputerPrimitives } from '../../../fetures/computer/domain/Computer'
import { HardDrive, type HardDrivePrimitives } from '../../../fetures/hardDrive/hardDrive/domain/HardDrive'
import { Device, type DevicePrimitives } from '../domain/Device'
import { DeviceId } from '../domain/DeviceId'

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async create (params: DevicePrimitives): Promise<void> {
    let device: Device | Computer | HardDrive
    if (Computer.isComputerCategory({ categoryId: params.categoryId })) {
      device = Computer.create(params as ComputerPrimitives)
    } else if (HardDrive.isHardDriveCategory({ categoryId: params.categoryId })) {
      device = HardDrive.create(params as HardDrivePrimitives)
    } else {
      device = Device.create(params)
    }
    
    if (params.id === undefined) {
      await this.repository.device.save({ device })
    } else {
      const deviceId = new DeviceId(params.id)
      await this.repository.device.update({ id: deviceId, device })
    }
  }
}
