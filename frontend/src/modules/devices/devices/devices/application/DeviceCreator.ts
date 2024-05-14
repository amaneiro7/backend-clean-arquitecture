import { Computer, type ComputerPrimitives } from '../../../fetures/computer/domain/Computer'
import { HardDrive, type HardDrivePrimitives } from '../../../fetures/hardDrive/hardDrive/domain/HardDrive'
import { Device, type DevicePrimitives } from '../domain/Device'
import { DeviceId } from '../domain/DeviceId'
import { DeviceRepository } from '../domain/DeviceRepository'

export class DeviceCreator {
  constructor (private readonly repository: DeviceRepository) {}

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
      await this.repository.save({ device })
    } else {
      const deviceId = new DeviceId(params.id)
      await this.repository.update({ id: deviceId, device })
    }
  }
}
