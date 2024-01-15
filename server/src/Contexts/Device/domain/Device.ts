import { BrandId } from '../../Brand/domain/BrandId'
import { CategoryId } from '../../Category/domain/CategoryId'
import { type Status } from '../../Status/domain/Status'
import { DeviceId, ModelSeriesId } from './DeviceId'
import { ModelSeriesName } from './DeviceName'

export interface DevicePrimitives {
  deviceId: string
  serial: string
  activo: string
  status: string
  modelId: string
}

export class Device {
  constructor (
    private readonly deviceId: DeviceId,
    private readonly serial: ModelSeriesName,
    private readonly activo: BrandId,
    private readonly status: Status,
    private readonly modelId: ModelSeriesId
  ) {}

  static create ({ name, brandId, categoryId }: { name: string, brandId: string, categoryId: string }): ModelSeries {
    const id = String(DeviceId.random())
    return new Device(
      new DeviceId(id),
      new ModelSeriesName(name),
      new CategoryId(categoryId),
      new BrandId(brandId)
    )
  }

  updateName (newName: string): void {
    this.modelSeriesName = new ModelSeriesName(newName)
  }

  updateCategoryId (newCategoryId: string): void {
    this.categoryId = new CategoryId(newCategoryId)
  }

  updateBrandId (newBrandId: string): void {
    this.brandId = new BrandId(newBrandId)
  }

  static fromPrimitives (primitives: ModelSeriesPrimitives): ModelSeries {
    return new ModelSeries(
      new ModelSeriesId(primitives.modelSeriesId),
      new ModelSeriesName(primitives.modelSeriesName),
      new BrandId(primitives.brandId),
      new CategoryId(primitives.categoryId)
    )
  }

  toPrimitives (): ModelSeriesPrimitives {
    return {
      modelSeriesId: this.modelSeriesId.value,
      modelSeriesName: this.modelSeriesName.value,
      categoryId: this.categoryId.value,
      brandId: this.brandId.value
    }
  }

  get IdValue (): string {
    return this.modelSeriesId.value
  }

  get nameValue (): string {
    return this.modelSeriesName.value
  }

  get brandIdValue (): string {
    return this.brandId.value
  }

  get categoryIdValue (): string {
    return this.categoryId.value
  }
}
