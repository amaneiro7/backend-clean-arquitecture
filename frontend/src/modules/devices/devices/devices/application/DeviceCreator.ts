import { type Repository } from '../../../../shared/domain/repository'
import { Computer, type ComputerPrimitives } from '../../../fetures/computer/domain/Computer'
import { HardDrive, type HardDrivePrimitives } from '../../../fetures/hardDrive/hardDrive/domain/HardDrive'
import { Device, type DevicePrimitives } from '../domain/Device'
import { DeviceId } from '../domain/DeviceId'

interface Props extends DevicePrimitives {
  categoryId: number
}
export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async create ({ id, serial, activo, statusId, modelId, categoryId, ...otherParams }: Props): Promise<void> {
    let device
    if (Computer.isComputerCategory({ categoryId })) {
      const { processorId, memoryRamCapacity, hardDriveTypeId, hardDriveCapacityId, operatingSystemArqId, operatingSystemId, ipAddress, macAddress } = otherParams as ComputerPrimitives

      device = Computer.create({
        serial,
        activo,
        statusId,
        modelId,
        processorId,
        memoryRamCapacity,
        hardDriveTypeId,
        hardDriveCapacityId,
        operatingSystemArqId,
        operatingSystemId,
        ipAddress,
        macAddress
      })
    } else if (HardDrive.isHardDriveCategory({ categoryId })) {
      const { hardDriveCapacityId, hardDriveTypeId, health } = otherParams as HardDrivePrimitives
      device = HardDrive.create({
        serial,
        activo,
        statusId,
        modelId,
        hardDriveCapacityId,
        hardDriveTypeId,
        health
      })
    } else {
      device = Device.create({ serial, activo, statusId, modelId })
    }

    if (id === undefined) {
      await this.repository.device.save({ device })
    } else {
      const deviceId = new DeviceId(id)
      await this.repository.device.update({ id: deviceId, device })
    }
  }
}
