import { ModelSeriesDoesNotExistError } from '../../../../ModelSeries/domain/ModelSeriesDoesNotExistError'
import { ModelSeriesId } from '../../../../ModelSeries/domain/ModelSeriesId'
import { type Repository } from '../../../../Shared/domain/Repository'
import { StatusDoesNotExistError } from '../../../Status/domain/StatusDoesNotExistError'
import { StatusId } from '../../../Status/domain/StatusId'
import { Device } from '../../domain/Device'
import { DeviceActivo } from '../../domain/DeviceActivo'
import { DeviceAlreadyExistError } from '../../domain/DeviceAlreadyExistError'
import { DeviceDoesNotExistError } from '../../domain/DeviceDoesNotExistError'
import { DeviceId } from '../../domain/DeviceId'
import { DeviceSerial } from '../../domain/DeviceSerial'

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
      await this.ensureActivoDoesNotExist(activo)
      deviceEntity.updateActivo(activo)
    }

    if (serial !== undefined) {
      await this.ensureSerialDoesNotExist(serial)
      deviceEntity.updateSerial(serial)
    }

    if (modelId !== undefined) {
      await this.ensureModelIdExist(modelId)
      deviceEntity.updateModelId(modelId)
    }
    if (statusId !== undefined) {
      await this.ensureStatusIdExist(statusId)
      deviceEntity.updateStatus(statusId)
    }

    await this.repository.device.save(deviceEntity.toPrimitives())
  }

  private async ensureSerialDoesNotExist (name: string): Promise<void> {
    if (await this.repository.device.searchByActivo(new DeviceActivo(name).toString()) !== null) {
      throw new DeviceAlreadyExistError(name)
    }
  }

  private async ensureActivoDoesNotExist (name: string): Promise<void> {
    if (await this.repository.device.searchBySerial(new DeviceSerial(name).toString()) !== null) {
      throw new DeviceAlreadyExistError(name)
    }
  }

  private async ensureModelIdExist (modelId: string): Promise<void> {
    if (await this.repository.modelSeries.searchById(new ModelSeriesId(modelId).toString()) === null) {
      throw new ModelSeriesDoesNotExistError(modelId)
    }
  }

  private async ensureStatusIdExist (statusId: number): Promise<void> {
    if (await this.repository.modelSeries.searchById(new StatusId(statusId).toString()) === null) {
      throw new StatusDoesNotExistError(statusId)
    }
  }
}
