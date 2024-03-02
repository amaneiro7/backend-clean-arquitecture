import { ModelSeriesDoesNotExistError } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesDoesNotExistError'
import { type Repository } from '../../../Shared/domain/Repository'
import { Device } from '../domain/Device'
import { DeviceDoesNotExistError } from '../domain/DeviceDoesNotExistError'
import { DeviceId } from '../domain/DeviceId'
import { type DeviceParams } from './DeviceCreator'
import { ValidationField } from './ValidationField'

export interface PartialDeviceParams extends DeviceParams {}

type FieldValidator = (repository: Repository, field: any, entity: Device) => Promise<void>
type FieldUpdater = (field: any) => void

interface ValidationConfig {
  field: any
  validator: FieldValidator
  updater: FieldUpdater
}

export class DeviceUpdater {
  constructor (private readonly repository: Repository) {}

  async run ({ id, params }: { id: string, params: PartialDeviceParams }): Promise<void> {
    const { activo, modelId, serial, statusId, brandId, categoryId } = params
    const devideId = new DeviceId(id).value

    const device = await this.repository.device.searchById(devideId)

    if (device === null) {
      throw new DeviceDoesNotExistError(id)
    }
    const deviceEntity = Device.fromPrimitives(device)
    const model = await this.repository.modelSeries.searchById(device.modelId)
    if (model === null) {
      throw new ModelSeriesDoesNotExistError(id)
    }

    const validations: ValidationConfig[] = [
      { field: activo, validator: ValidationField.ensureActivoDoesNotExist, updater: deviceEntity.updateActivo },
      { field: serial, validator: ValidationField.ensureSerialDoesNotExist, updater: deviceEntity.updateSerial },
      { field: modelId, validator: ValidationField.ensureModelIdExist, updater: deviceEntity.updateModelId },
      { field: statusId, validator: ValidationField.ensureStatusIdExist, updater: deviceEntity.updateStatus }
    ]

    for (const validation of validations) {
      if (validation.field !== undefined) {
        await validation.validator(this.repository, validation.field, deviceEntity)
        validation.updater(validation.field)
      }
    }

    // if (Computer.isComputerCategory({ categoryId: model?.categoryId })) {
    //   await new ComputerUpdater(this.repository).run({ deviceId: new DeviceId(device.id), params })
    // }

    // if (HardDrive.isHardDriveCategory({ categoryId: model?.categoryId })) {
    //   await new HardDriveUpdater(this.repository).run({ deviceId: new DeviceId(device.id), params })
    // }

    await this.repository.device.save(deviceEntity.toPrimitives())
  }
}
