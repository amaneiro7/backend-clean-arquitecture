import { ModelSeriesAlreadyExistError } from '../../../../ModelSeries/domain/ModelSeriesAlreadyExistError'
import { ModelSeriesId } from '../../../../ModelSeries/domain/ModelSeriesId'
import { type Repository } from '../../../../Shared/domain/Repository'
import { Device } from '../../domain/Device'
import { DeviceActivo } from '../../domain/DeviceActivo'
import { DeviceAlreadyExistError } from '../../domain/DeviceAlreadyExistError'
import { DeviceDoesNotExistError } from '../../domain/DeviceDoesNotExistError'
import { DeviceId } from '../../domain/DeviceId'
import { DeviceSerial } from '../../domain/DeviceSerial'
import { type StatusTypes } from '../../domain/Status'

export class DeviceUpdater {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string, activo?: string, serial?: string, modelId?: string, status?: StatusTypes }): Promise<void> {
    const { id } = params
    const devideId = new DeviceId(id).toString()

    const device = await this.repository.device.searchById(devideId)

    if (device === null) {
      throw new DeviceDoesNotExistError(id)
    }
    const deviceEntity = Device.fromPrimitives(device)

    if (params.activo !== undefined) {
      await this.ensureActivoDoesNotExist(params.activo)
      deviceEntity.updateActivo(params.activo)
    }

    if (params.serial !== undefined) {
      await this.ensureSerialDoesNotExist(params.serial)
      deviceEntity.updateSerial(params.serial)
    }

    if (params.modelId !== undefined) {
      await this.ensureModelIdExist(params.modelId)
      deviceEntity.updateModelId(params.modelId)
    }
    if (params.status !== undefined) {
      deviceEntity.updateStatus(params.status)
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
      throw new ModelSeriesAlreadyExistError(modelId)
    }
  }
}
