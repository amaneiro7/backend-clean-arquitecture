import { CategoryId } from '../../../../Category/domain/CategoryId'
import { HardDriveHealth } from './HardDriveHealth'
import { DeviceId } from '../../../../Device/Device/domain/DeviceId'
import { CategoryDefaultData, type CategoryValues } from '../../../../Category/domain/CategoryDefaultData'
import { Device, type DevicePrimitives } from '../../../../Device/Device/domain/Device'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { ModelSeriesId } from '../../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { BrandId } from '../../../../Brand/domain/BrandId'
import { StatusId } from '../../../../Device/Status/domain/StatusId'
import { DeviceActivo } from '../../../../Device/Device/domain/DeviceActivo'
import { DeviceSerial } from '../../../../Device/Device/domain/DeviceSerial'
import { DeviceEmployee } from '../../../../Device/Device/domain/DeviceEmployee'
import { LocationId } from '../../../../Location/Location/domain/LocationId'
import { DeviceObservation } from '../../../../Device/Device/domain/DeviceObservation'
import { HDDCapacity } from './HDDCapacity'
import { HDDType } from './HDDType'

export interface DeviceHardDrivePrimitives extends DevicePrimitives {
  health: Primitives<HardDriveHealth>
  hardDriveCapacityId: Primitives<HDDCapacity>
  hardDriveTypeId: Primitives<HDDType>
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
    employeeId: DeviceEmployee,
    locationId: LocationId,
    observation: DeviceObservation,
    private health: HardDriveHealth,
    private hardDriveCapacityId: HDDCapacity,
    private hardDriveTypeId: HDDType
  ) {
    super(id, serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation)
  }

  static create ({
    serial,
    activo,
    statusId,
    categoryId,
    brandId,
    modelId,
    employeeId,
    locationId,
    observation,
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
      new DeviceEmployee(employeeId),
      new LocationId(locationId),
      new DeviceObservation(observation),
      new HardDriveHealth(health),
      new HDDCapacity(hardDriveCapacityId),
      new HDDType(hardDriveTypeId)
    )
  }

  static isHardDriveCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedHardDriveCategories: CategoryValues[] = ['Discos Duros']
    return AcceptedHardDriveCategories.includes(CategoryDefaultData[categoryId])
  }

  updateHealth (newHealth: Primitives<HardDriveHealth>): void {
    this.health = new HardDriveHealth(newHealth)
  }

  updateHardDriveCapacity (newHardDriveCapacityId: Primitives<HDDCapacity>): void {
    this.hardDriveCapacityId = new HDDCapacity(newHardDriveCapacityId)
  }

  updateHardDriveType (newHardDriveType: Primitives<HDDType>): void {
    this.hardDriveTypeId = new HDDType(newHardDriveType)
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
      new DeviceEmployee(primitives.employeeId),
      new LocationId(primitives.locationId),
      new DeviceObservation(primitives.observation),
      new HardDriveHealth(primitives.health),
      new HDDCapacity(primitives.hardDriveCapacityId),
      new HDDType(primitives.hardDriveTypeId)
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
      employeeId: this.employeeeValue,
      locationId: this.locationValue,
      observation: this.observationValue,
      health: this.healthValue,
      hardDriveCapacityId: this.hardDriveCapacityValue,
      hardDriveTypeId: this.hardDriveTypeValue
    }
  }

  get healthValue (): Primitives<HardDriveHealth> {
    return this.health.value
  }

  get hardDriveCapacityValue (): Primitives<HDDCapacity> {
    return this.hardDriveCapacityId.value
  }

  get hardDriveTypeValue (): Primitives<HDDType> {
    return this.hardDriveTypeId.value
  }
}
