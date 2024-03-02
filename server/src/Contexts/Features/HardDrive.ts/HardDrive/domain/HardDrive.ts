import { CategoryId } from '../../../../Category/domain/CategoryId'
import { HardDriveHealth } from './HardDriveHealth'
import { HardDriveCapacityId } from '../../HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../HardDriveType/domain/HardDriveTypeId'
import { DeviceId } from '../../../../Device/Device/domain/DeviceId'
import { CategoryDefaultData, type CategoryValues } from '../../../../Category/domain/CategoryDefaultData'
import { Device, type DevicePrimitives } from '../../../../Device/Device/domain/Device'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { ModelSeriesId } from '../../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { BrandId } from '../../../../Brand/domain/BrandId'
import { StatusId } from '../../../../Device/Status/domain/StatusId'
import { DeviceActivo } from '../../../../Device/Device/domain/DeviceActivo'
import { DeviceSerial } from '../../../../Device/Device/domain/DeviceSerial'

export interface DeviceHardDrivePrimitives extends DevicePrimitives {
  health: Primitives<HardDriveHealth>
  hardDriveCapacityId: Primitives<HardDriveCapacityId>
  hardDriveTypeId: Primitives<HardDriveTypeId>
}

export class DeviceHardDrive extends Device {
  constructor (
    id: DeviceId,
    serial: DeviceSerial,
    activo: DeviceActivo,
    statusId: StatusId,
    categoryId: CategoryId,
    brandId: BrandId,
    modelId: ModelSeriesId,
    private health: HardDriveHealth,
    private readonly hardDriveCapacityId: HardDriveCapacityId,
    private readonly hardDriveTypeId: HardDriveTypeId
  ) {
    super(id, serial, activo, statusId, categoryId, brandId, modelId)
  }

  static create ({
    serial,
    activo,
    statusId,
    categoryId,
    brandId,
    modelId,
    health,
    hardDriveCapacityId,
    hardDriveTypeId
  }: Omit<DeviceHardDrivePrimitives, 'id'>): DeviceHardDrive {
    const id = DeviceId.random().value
    return new DeviceHardDrive(
      new DeviceId(id),
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new CategoryId(categoryId),
      new BrandId(brandId),
      new ModelSeriesId(modelId),
      new HardDriveHealth(health),
      new HardDriveCapacityId(hardDriveCapacityId),
      new HardDriveTypeId(hardDriveTypeId)
    )
  }

  static isHardDriveCategory ({ categoryId }: { categoryId: number }): boolean {
    const AcceptedHardDriveCategories: CategoryValues[] = ['Discos Duros']
    return AcceptedHardDriveCategories.includes(CategoryDefaultData[categoryId])
  }

  updateHealth (newHealth: number): void {
    this.health = new HardDriveHealth(newHealth)
  }

  static fromPrimitives (primitives: DeviceHardDrivePrimitives): DeviceHardDrive {
    return new DeviceHardDrive(
      new DeviceId(primitives.id),
      new DeviceSerial(primitives.serial),
      new DeviceActivo(primitives.activo),
      new StatusId(primitives.statusId),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new ModelSeriesId(primitives.modelId),
      new HardDriveHealth(primitives.health),
      new HardDriveCapacityId(primitives.hardDriveCapacityId),
      new HardDriveTypeId(primitives.hardDriveTypeId)
    )
  }

  toPrimitive (): DeviceHardDrivePrimitives {
    return {
      id: this.idValue,
      activo: this.activoValue,
      serial: this.serialValue,
      statusId: this.statusValue,
      categoryId: this.categoryValue,
      brandId: this.brandValue,
      modelId: this.modelSeriesValue,
      health: this.healthValue,
      hardDriveCapacityId: this.hardDriveCapacityValue,
      hardDriveTypeId: this.hardDriveTypeValue
    }
  }

  get healthValue (): Primitives<HardDriveHealth> {
    return this.health.value
  }

  get hardDriveCapacityValue (): Primitives<HardDriveCapacityId> {
    return this.hardDriveCapacityId.value
  }

  get hardDriveTypeValue (): Primitives<HardDriveTypeId> {
    return this.hardDriveTypeId.value
  }
}
