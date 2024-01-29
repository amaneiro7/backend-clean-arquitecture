import { type Repository } from '../../../../Shared/domain/Repository'
import { Device } from '../../domain/Device'
import { DeviceDoesNotExistError } from '../../domain/DeviceDoesNotExistError'
import { DeviceId } from '../../domain/DeviceId'
import { ValidationField } from '../ValidationField'

export class DeviceUpdater {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string, activo?: string, serial?: string, modelId?: string, statusId?: number }): Promise<void> {
    const { id, activo, modelId, serial, statusId } = params
    const devideId = new DeviceId(id).toString()

    const device = await this.repository.device.searchById(devideId)

    if (device === null) {
      throw new DeviceDoesNotExistError(id)
    }
    const deviceEntity = Device.fromPrimitives(device)

    if (activo !== undefined) {
      await ValidationField.ensureActivoDoesNotExist(this.repository, activo)
      deviceEntity.updateActivo(activo)
    }

    if (serial !== undefined) {
      await ValidationField.ensureSerialDoesNotExist(this.repository, serial)
      deviceEntity.updateSerial(serial)
    }

    if (modelId !== undefined) {
      await ValidationField.ensureModelIdExist(this.repository, modelId)
      deviceEntity.updateModelId(modelId)
    }
    if (statusId !== undefined) {
      await ValidationField.ensureStatusIdExist(this.repository, statusId)
      deviceEntity.updateStatus(statusId)
    }

    await this.repository.device.save(deviceEntity.toPrimitives())
  }
}
