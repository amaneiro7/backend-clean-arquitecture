import { ComputerValidation } from '../../../../Features/Computer/application/ComputerCreator'
import { Computer } from '../../../../Features/Computer/domain/Computer.old'
import { HardDriveValidation } from '../../../../Features/HardDrive.ts/HardDrive/application/HardDriveCreator'
import { HardDrive } from '../../../../Features/HardDrive.ts/HardDrive/domain/HardDrive'
import { ModelSeriesFinder } from '../../../../ModelSeries/ModelSeries/application/ModelSeriesFinder'
import { ModelSeriesId } from '../../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { type Repository } from '../../../../Shared/domain/Repository'
import { Device } from '../../domain/Device'
import { ValidationField } from '../ValidationField'

interface DeviceParams {
  activo: string
  serial: string
  statusId: number
  modelId: string
  processorId: string
  memoryRamCapacity: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
  health: number
  operatingSystemId: number
  operatingSystemArqId: number
  ipAddress: string
  macAddress: string
}

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: DeviceParams): Promise<void> {
    const { activo, serial, statusId, modelId, ...otherParams } = params

    const device = Device.create({ activo, serial, statusId, modelId })
    await ValidationField.ensureActivoDoesNotExist(this.repository, activo)
    await ValidationField.ensureSerialDoesNotExist(this.repository, serial)
    await ValidationField.ensureModelIdExist(this.repository, modelId)
    await ValidationField.ensureStatusIdExist(this.repository, statusId)

    const modelSeriesId = new ModelSeriesId(device.modelSeriesValue)
    const modelSeriesCategory = await new ModelSeriesFinder(this.repository).searchById(modelSeriesId)
    const categoryId = modelSeriesCategory.category.id

    if (Computer.isComputerCategory({ categoryId })) {
      const computer = await new ComputerValidation(this.repository).run({ ...otherParams, categoryId, deviceId: device.idValue })
      await this.repository.device.save(device.toPrimitives())
      await this.repository.computer.save(computer.toPrimitive())
    } else if (HardDrive.isHardDriveCategory({ categoryId })) {
      const hardDrive = await new HardDriveValidation(this.repository).run({ ...otherParams, categoryId, deviceId: device.idValue })
      await this.repository.device.save(device.toPrimitives())
      await this.repository.hardDrive.save(hardDrive.toPrimitive())
    } else {
      await this.repository.device.save(device.toPrimitives())
    }
  }
}
