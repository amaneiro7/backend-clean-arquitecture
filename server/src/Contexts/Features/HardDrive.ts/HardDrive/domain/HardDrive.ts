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
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { DeviceStocknumber } from '../../../../Device/Device/domain/DeviceStock'

export interface DeviceHardDrivePrimitives extends DevicePrimitives {
  health: Primitives<HardDriveHealth>
  hardDriveCapacityId: Primitives<HDDCapacity>
  hardDriveTypeId: Primitives<HDDType>
}

export class DeviceHardDrive extends Device {
  constructor(
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
    stockNumber: DeviceStocknumber,
    private health: HardDriveHealth,
    private hardDriveCapacityId: HDDCapacity,
    private hardDriveTypeId: HDDType
  ) {
    super(id, serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, stockNumber)

    if (!DeviceHardDrive.isHardDriveCategory({ categoryId: categoryId.value })) {
      throw new InvalidArgumentError('No pertenece a la categoria de Disco duro')
    }
  }

  static create(params: Omit<DeviceHardDrivePrimitives, 'id'>): DeviceHardDrive {
    const id = DeviceId.random().value
    return new DeviceHardDrive(
      new DeviceId(id),
      new DeviceSerial(params.serial),
      new DeviceActivo(params.activo),
      new StatusId(params.statusId),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new ModelSeriesId(params.modelId),
      new DeviceEmployee(params.employeeId, params.statusId),
      new LocationId(params.locationId),
      new DeviceObservation(params.observation),
      new DeviceStocknumber(params.stockNumber, params.statusId),
      new HardDriveHealth(params.health),
      new HDDCapacity(params.hardDriveCapacityId),
      new HDDType(params.hardDriveTypeId)
    )
  }

  static isHardDriveCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedHardDriveCategories: CategoryValues[] = ['Discos Duros']
    return AcceptedHardDriveCategories.includes(CategoryDefaultData[categoryId])
  }

  updateHealth(newHealth: Primitives<HardDriveHealth>): void {
    this.health = new HardDriveHealth(newHealth)
  }

  updateHardDriveCapacity(newHardDriveCapacityId: Primitives<HDDCapacity>): void {
    this.hardDriveCapacityId = new HDDCapacity(newHardDriveCapacityId)
  }

  updateHardDriveType(newHardDriveType: Primitives<HDDType>): void {
    this.hardDriveTypeId = new HDDType(newHardDriveType)
  }

  static fromPrimitives(primitives: DeviceHardDrivePrimitives): DeviceHardDrive {
    return new DeviceHardDrive(
      new DeviceId(primitives.id),
      new DeviceSerial(primitives.serial),
      new DeviceActivo(primitives.activo),
      new StatusId(primitives.statusId),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new ModelSeriesId(primitives.modelId),
      new DeviceEmployee(primitives.employeeId, primitives.statusId),
      new LocationId(primitives.locationId),
      new DeviceObservation(primitives.observation),
      new DeviceStocknumber(primitives.stockNumber, primitives.statusId),
      new HardDriveHealth(primitives.health),
      new HDDCapacity(primitives.hardDriveCapacityId),
      new HDDType(primitives.hardDriveTypeId)
    )
  }

  toPrimitives(): DeviceHardDrivePrimitives {
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
      stockNumber: this.stockNumberValue,
      health: this.healthValue,
      hardDriveCapacityId: this.hardDriveCapacityValue,
      hardDriveTypeId: this.hardDriveTypeValue
    }
  }

  get healthValue(): Primitives<HardDriveHealth> {
    return this.health.value
  }

  get hardDriveCapacityValue(): Primitives<HDDCapacity> {
    return this.hardDriveCapacityId.value
  }

  get hardDriveTypeValue(): Primitives<HDDType> {
    return this.hardDriveTypeId.value
  }
}
