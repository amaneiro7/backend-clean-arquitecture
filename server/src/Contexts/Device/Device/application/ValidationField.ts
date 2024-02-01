/* eslint-disable @typescript-eslint/no-extraneous-class */
import { ModelSeriesDoesNotExistError } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesDoesNotExistError'
import { ModelSeriesId } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { type Repository } from '../../../Shared/domain/Repository'
import { StatusDoesNotExistError } from '../../Status/domain/StatusDoesNotExistError'
import { StatusId } from '../../Status/domain/StatusId'
import { DeviceActivo } from '../domain/DeviceActivo'
import { DeviceAlreadyExistError } from '../domain/DeviceAlreadyExistError'
import { DeviceSerial } from '../domain/DeviceSerial'

export class ValidationField {
  static async ensureSerialDoesNotExist (repository: Repository, serial: string): Promise<void> {
    if (await repository.device.searchBySerial(new DeviceSerial(serial).toString()) !== null) {
      throw new DeviceAlreadyExistError(serial)
    }
  }

  static async ensureActivoDoesNotExist (repository: Repository, activo: string): Promise<void> {
    if (await repository.device.searchByActivo(new DeviceActivo(activo).toString()) !== null) {
      throw new DeviceAlreadyExistError(activo)
    }
  }

  static async ensureModelIdExist (repository: Repository, modelId: string): Promise<void> {
    if (await repository.modelSeries.searchById(new ModelSeriesId(modelId).value) === null) {
      throw new ModelSeriesDoesNotExistError(modelId)
    }
  }

  static async ensureStatusIdExist (repository: Repository, statusId: number): Promise<void> {
    if (await repository.status.searchById(new StatusId(statusId).value) === null) {
      throw new StatusDoesNotExistError(statusId)
    }
  }
}
