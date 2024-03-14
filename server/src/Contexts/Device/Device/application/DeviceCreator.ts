import { ComputerValidation } from '../../../Features/Computer/application/ComputerValidation'
import { DeviceComputer, type DeviceComputerPrimitives } from '../../../Features/Computer/domain/Computer'
import { HardDriveValidation } from '../../../Features/HardDrive.ts/HardDrive/application/HardDriveValidation'
import { DeviceHardDrive, type DeviceHardDrivePrimitives } from '../../../Features/HardDrive.ts/HardDrive/domain/HardDrive'
import { ModelSeriesFinder } from '../../../ModelSeries/ModelSeries/application/ModelSeriesFinder'
import { ModelSeriesId } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { type Repository } from '../../../Shared/domain/Repository'
import { Device, type DevicePrimitives } from '../domain/Device'
import { ValidationField } from './ValidationField'

export interface DeviceParams extends Omit<DevicePrimitives, 'id'> {}

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async run ({ serial, activo, statusId, modelId, employeeId, locationId, observation, ...otherParams }: DeviceParams): Promise<void> {
    let device
    const modelSeriesId = new ModelSeriesId(modelId)
    const { brandId, categoryId } = await new ModelSeriesFinder(this.repository).searchById(modelSeriesId)

    if (DeviceComputer.isComputerCategory({ categoryId })) {
      const { processorId, memoryRamCapacity, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress } = otherParams as DeviceComputerPrimitives
      device = await new ComputerValidation(this.repository).run({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, processorId, memoryRamCapacity, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress })
    } else if (DeviceHardDrive.isHardDriveCategory({ categoryId })) {
      const { hardDriveCapacityId, hardDriveTypeId, health } = otherParams as DeviceHardDrivePrimitives
      device = await new HardDriveValidation(this.repository).run({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, hardDriveCapacityId, hardDriveTypeId, health })
    } else {
      device = Device.create({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation })
    }
    await ValidationField.ensureActivoDoesNotExist(this.repository, activo)
    await ValidationField.ensureSerialDoesNotExist(this.repository, serial)
    await ValidationField.ensureStatusIdExist(this.repository, statusId)
    await ValidationField.ensureEmployeeIdExist(this.repository, employeeId)
    await ValidationField.ensureLocationIdExist(this.repository, locationId, device)

    await this.repository.device.save(device.toPrimitives())
  }
}
