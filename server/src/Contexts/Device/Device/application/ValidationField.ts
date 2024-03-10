/* eslint-disable @typescript-eslint/no-extraneous-class */
import { LocationDoesNotExistError } from '../../../Location/Location/domain/LocationDoesNotExistError'
import { LocationId } from '../../../Location/Location/domain/LocationId'
import { ModelSeriesFinder } from '../../../ModelSeries/ModelSeries/application/ModelSeriesFinder'
import { ModelSeriesDoesNotExistError } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesDoesNotExistError'
import { ModelSeriesId } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { type Repository } from '../../../Shared/domain/Repository'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { EmployeeDoesNotExistError } from '../../../employee/Employee/domain/EmployeeDoesNotExistError'
import { EmployeeId } from '../../../employee/Employee/domain/EmployeeId'
import { StatusDoesNotExistError } from '../../Status/domain/StatusDoesNotExistError'
import { StatusId } from '../../Status/domain/StatusId'
import { type Device } from '../domain/Device'
import { DeviceActivo } from '../domain/DeviceActivo'
import { DeviceAlreadyExistError } from '../domain/DeviceAlreadyExistError'
import { type DeviceEmployee } from '../domain/DeviceEmployee'
import { DeviceSerial } from '../domain/DeviceSerial'

export class ValidationField {
  static async ensureSerialDoesNotExist (repository: Repository, serial: Primitives<DeviceSerial>, entity?: Device): Promise<void> {
    if (serial === null || (entity !== undefined && serial === entity.serialValue)) {
      return
    }
    if (await repository.device.searchBySerial(new DeviceSerial(serial).toString()) !== null) {
      throw new DeviceAlreadyExistError(serial)
    }
  }

  static async ensureActivoDoesNotExist (repository: Repository, activo: Primitives<DeviceActivo>, entity?: Device): Promise<void> {
    if (activo === null || (entity !== undefined && activo === entity.activoValue)) {
      return
    }
    if (await repository.device.searchByActivo(new DeviceActivo(activo).toString()) !== null) {
      throw new DeviceAlreadyExistError(activo)
    }
  }

  static async ensureModelIdExist (repository: Repository, modelId: string, entity?: Device): Promise<void> {
    if (entity !== undefined && modelId === entity.modelSeriesValue) {
      return
    }
    const modelSeries = await new ModelSeriesFinder(repository).searchById(new ModelSeriesId(modelId))
    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(modelId)
    }
    const { brandId, categoryId } = modelSeries
    entity?.updateBrandId(brandId)
    entity?.updateCategoryId(categoryId)
  }

  static async ensureStatusIdExist (repository: Repository, statusId: number, entity?: Device): Promise<void> {
    if (entity !== undefined && statusId === entity.statusValue) {
      return
    }
    if (await repository.status.searchById(new StatusId(statusId).value) === null) {
      throw new StatusDoesNotExistError(statusId)
    }
  }

  static async ensureLocationIdExist (repository: Repository, locationId: Primitives<LocationId>, entity?: Device): Promise<void> {
    if (entity !== undefined && locationId === entity.statusValue) {
      return
    }
    const location = await repository.location.searchById(new LocationId(locationId).value)
    if (location === null) {
      throw new LocationDoesNotExistError(locationId)
    }
  }

  static async ensureEmployeeIdExist (repository: Repository, employeeId: Primitives<DeviceEmployee>, entity?: Device): Promise<void> {
    if (entity !== undefined && employeeId === entity.employeeeValue) {
      return
    }

    if (employeeId == null) {
      return
    }
    if (await repository.employee.searchById(new EmployeeId(employeeId).value) === null) {
      throw new EmployeeDoesNotExistError(employeeId)
    }
  }
}
