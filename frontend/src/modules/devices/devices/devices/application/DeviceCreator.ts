import { type Repository } from '../../../../shared/domain/repository'
import { Computer, type ComputerPrimitives } from '../../../fetures/computer/domain/Computer'
import { HardDrive, type HardDrivePrimitives } from '../../../fetures/hardDrive/hardDrive/domain/HardDrive'
import { Device, type DevicePrimitives } from '../domain/Device'

interface Props extends DevicePrimitives {
  categoryId: number
}
export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async create ({ serial, activo, statusId, modelId, categoryId, ...resParams }: Props): Promise<void> {
    if (Computer.isComputerCategory({ categoryId })) {
      const { processorId, memoryRamCapacity, hardDriveTypeId, hardDriveCapacityId, operatingSystemArqId, operatingSystemId, ipAddress, macAddress } = resParams as ComputerPrimitives

      const deviceWithComputerFeatures = Computer.create({
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
      console.log(deviceWithComputerFeatures)
      await this.repository.device.save({ device: deviceWithComputerFeatures })
    } else if (HardDrive.isHardDriveCategory({ categoryId })) {
      const { hardDriveCapacityId, hardDriveTypeId, health } = resParams as HardDrivePrimitives
      const deviceWithHardDriveFeatures = HardDrive.create({
        serial,
        activo,
        statusId,
        modelId,
        hardDriveCapacityId,
        hardDriveTypeId,
        health
      })
      await this.repository.device.save({ device: deviceWithHardDriveFeatures })
    } else {
      const device = Device.create({ serial, activo, statusId, modelId })

      await this.repository.device.save({ device })
    }
  }
}
