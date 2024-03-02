import { ComputerValidation } from '../../../../Features/Computer/application/ComputerCreator'
import { DeviceComputer, type DeviceComputerPrimitives } from '../../../../Features/Computer/domain/Computer'
import { type Repository } from '../../../../Shared/domain/Repository'
import { Device, type DevicePrimitives } from '../../domain/Device'
import { ValidationField } from '../ValidationField'

export interface DeviceParams extends Omit<DevicePrimitives, 'id'> {}

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async run ({ serial, activo, statusId, categoryId, brandId, modelId, ...otherParams }: DeviceParams): Promise<void> {
    await ValidationField.ensureActivoDoesNotExist(this.repository, activo)
    await ValidationField.ensureSerialDoesNotExist(this.repository, serial)
    await ValidationField.ensureModelIdExist(this.repository, modelId)
    await ValidationField.ensureStatusIdExist(this.repository, statusId)

    let device

    // const modelSeriesId = new ModelSeriesId(device.modelSeriesValue)
    // const modelSeriesCategory = await new ModelSeriesFinder(this.repository).searchById(modelSeriesId)
    // const categoryId = modelSeriesCategory.category.id

    if (DeviceComputer.isComputerCategory({ categoryId })) {
      const { processorId, memoryRamCapacity, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress } = otherParams as DeviceComputerPrimitives
      device = await new ComputerValidation(this.repository).run({ serial, activo, statusId, categoryId, brandId, modelId, processorId, memoryRamCapacity, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress })
    } else {
      device = Device.create({ serial, activo, statusId, categoryId, brandId, modelId })
    }
    await this.repository.device.save(device.toPrimitives())
  }
}
