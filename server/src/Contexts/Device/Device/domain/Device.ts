import { DeviceId } from './DeviceId'
import { DeviceActivo } from './DeviceActivo'
import { DeviceSerial } from './DeviceSerial'
import { StatusId } from '../../Status/domain/StatusId'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { BrandId } from '../../../Brand/domain/BrandId'
import { DeviceEmployee } from './DeviceEmployee'
import { DeviceObservation } from './DeviceObservation'
import { DeviceLocation } from './DeviceLocation'
import { DeviceModelSeries } from './DeviceModelSeries'

export interface DevicePrimitives {
  id: Primitives<DeviceId>
  serial: Primitives<DeviceSerial>
  activo: Primitives<DeviceActivo>
  statusId: Primitives<StatusId>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  modelId: Primitives<DeviceModelSeries>
  employeeId: Primitives<DeviceEmployee>
  locationId: Primitives<DeviceLocation>
  observation: Primitives<DeviceObservation>
}

export class Device {
  constructor (
    private readonly id: DeviceId,
    private serial: DeviceSerial,
    private activo: DeviceActivo,
    private statusId: StatusId,
    private categoryId: CategoryId,
    private brandId: BrandId,
    private modelId: DeviceModelSeries,
    private employeeId: DeviceEmployee,
    private locationId: DeviceLocation,
    private observation: DeviceObservation
  ) {}

  static create ({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation }: Omit<DevicePrimitives, 'id'>): Device {
    const id = DeviceId.random().value
    return new Device(
      new DeviceId(id),
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new CategoryId(categoryId),
      new BrandId(brandId),
      new DeviceModelSeries(modelId),
      new DeviceEmployee(employeeId),
      new DeviceLocation(locationId),
      new DeviceObservation(observation)
    )
  }

  updateSerial (newSerial: Primitives<DeviceSerial>): void {
    this.serial = new DeviceSerial(newSerial)
  }

  updateActivo (newActivo: Primitives<DeviceActivo>): void {
    this.activo = new DeviceActivo(newActivo)
  }

  updateStatus (newStatusId: Primitives<StatusId>): void {
    this.statusId = new StatusId(newStatusId)
  }

  updateModelId (newDeviceModelSeries: Primitives<DeviceModelSeries>): void {
    this.modelId = new DeviceModelSeries(newDeviceModelSeries)
  }

  updateCategoryId (newCategoryId: Primitives<CategoryId>): void {
    this.categoryId = new CategoryId(newCategoryId)
  }

  updateBrandId (newBrandId: Primitives<BrandId>): void {
    this.brandId = new BrandId(newBrandId)
  }

  updateEmployee (newEmployee: Primitives<DeviceEmployee>): void {
    this.employeeId = new DeviceEmployee(newEmployee)
  }

  updateLocation (newLocation: Primitives<DeviceLocation>): void {
    this.locationId = new DeviceLocation(newLocation)
  }

  updateObservation (observation: Primitives<DeviceObservation>): void {
    this.observation = new DeviceObservation(observation)
  }

  static fromPrimitives (primitives: DevicePrimitives): Device {
    return new Device(
      new DeviceId(primitives.id),
      new DeviceSerial(primitives.serial),
      new DeviceActivo(primitives.activo),
      new StatusId(primitives.statusId),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new DeviceModelSeries(primitives.modelId),
      new DeviceEmployee(primitives.employeeId),
      new DeviceLocation(primitives.locationId),
      new DeviceObservation(primitives.observation)
    )
  }

  toPrimitives (): DevicePrimitives {
    return {
      id: this.idValue,
      serial: this.serialValue,
      activo: this.activoValue,
      statusId: this.statusValue,
      categoryId: this.categoryValue,
      brandId: this.brandValue,
      modelId: this.modelSeriesValue,
      employeeId: this.employeeeValue,
      locationId: this.locationValue,
      observation: this.observationValue
    }
  }

  get idValue (): Primitives<DeviceId> {
    return this.id.value
  }

  get serialValue (): Primitives<DeviceSerial> {
    return this.serial.value
  }

  get activoValue (): Primitives<DeviceActivo> {
    return this.activo.value
  }

  get statusValue (): Primitives<StatusId> {
    return this.statusId.value
  }

  get categoryValue (): Primitives<CategoryId> {
    return this.categoryId.value
  }

  get brandValue (): Primitives<BrandId> {
    return this.brandId.value
  }

  get modelSeriesValue (): Primitives<DeviceModelSeries> {
    return this.modelId.value
  }

  get employeeeValue (): Primitives<DeviceEmployee> {
    return this.employeeId.value
  }

  get locationValue (): Primitives<DeviceLocation> {
    return this.locationId.value
  }

  get observationValue (): Primitives<DeviceObservation> {
    return this.observation.value
  }
}
