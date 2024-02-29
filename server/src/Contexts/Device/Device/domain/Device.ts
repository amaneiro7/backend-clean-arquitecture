import { DeviceId } from './DeviceId'
import { DeviceActivo } from './DeviceActivo'
import { DeviceSerial } from './DeviceSerial'
import { ModelSeriesId } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { StatusId } from '../../Status/domain/StatusId'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { BrandId } from '../../../Brand/domain/BrandId'

export interface DevicePrimitives {
  id: Primitives<DeviceId>
  serial: Primitives<DeviceSerial>
  activo: Primitives<DeviceActivo>
  statusId: Primitives<StatusId>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  modelId: Primitives<ModelSeriesId>
}

export class Device {
  constructor (
    private readonly id: DeviceId,
    private serial: DeviceSerial,
    private activo: DeviceActivo,
    private statusId: StatusId,
    private categoryId: CategoryId,
    private brandId: BrandId,
    private modelId: ModelSeriesId
  ) {}

  static create ({ serial, activo, statusId, categoryId, brandId, modelId }: Omit<DevicePrimitives, 'id'>): Device {
    const id = DeviceId.random().toString()
    return new Device(
      new DeviceId(id),
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new CategoryId(categoryId),
      new BrandId(brandId),
      new ModelSeriesId(modelId)
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

  updateModelId (newModelSeriesId: Primitives<ModelSeriesId>): void {
    this.modelId = new ModelSeriesId(newModelSeriesId)
  }

  updateCategoryId (newCategoryId: Primitives<CategoryId>): void {
    this.categoryId = new CategoryId(newCategoryId)
  }

  updateBrandId (newBrandId: Primitives<BrandId>): void {
    this.brandId = new BrandId(newBrandId)
  }

  static fromPrimitives (primitives: DevicePrimitives): Device {
    return new Device(
      new DeviceId(primitives.id),
      new DeviceSerial(primitives.serial),
      new DeviceActivo(primitives.activo),
      new StatusId(primitives.statusId),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new ModelSeriesId(primitives.modelId)
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
      modelId: this.modelSeriesValue
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

  get modelSeriesValue (): Primitives<ModelSeriesId> {
    return this.modelId.value
  }
}
