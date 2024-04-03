import { LocationId } from '../../../../location/locations/domain/locationId'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { BrandId } from '../../../brand/domain/BrandId'
import { CategoryId } from '../../../category/domain/CategoryId'
import { ModelId } from '../../../model/domain/ModelId'
import { StatusId } from '../../status/domain/StatusId'
import { DeviceActivo } from './DeviceActivo'
import { DeviceEmployee } from './DeviceEmployee'
import { type DeviceId } from './DeviceId'
import { DeviceObservation } from './DeviceObservation'
import { DeviceSerial } from './DeviceSerial'

export interface DevicePrimitives {
  id?: Primitives<DeviceId>
  serial: Primitives<DeviceSerial>
  activo: Primitives<DeviceActivo>
  statusId: Primitives<StatusId>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  modelId: Primitives<ModelId>
  employeeId: Primitives<DeviceEmployee>
  locationId: Primitives<LocationId>
  observation: Primitives<DeviceObservation>
}
export class Device {
  constructor (
    private readonly serial: DeviceSerial,
    private readonly activo: DeviceActivo,
    private readonly statusId: StatusId,
    private readonly categoryId: CategoryId,
    private readonly brandId: BrandId,
    private readonly modelId: ModelId,
    private readonly employeeId: DeviceEmployee,
    private readonly locationId: LocationId,
    private readonly observation: DeviceObservation
  ) {}

  public static create ({ serial, activo, statusId, modelId, categoryId, brandId, employeeId, locationId, observation }: DevicePrimitives): Device {
    return new Device(
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new CategoryId(categoryId),
      new BrandId(brandId),
      new ModelId(modelId),
      new DeviceEmployee(employeeId),
      new LocationId(locationId),
      new DeviceObservation(observation)
    )
  }

  serialValue (): Primitives<DeviceSerial> {
    return this.serial.value
  }

  activoValue (): Primitives<DeviceActivo> | null {
    return this.activo.value
  }

  statusValue (): Primitives<StatusId> {
    return this.statusId.value
  }

  categoryValue (): Primitives<CategoryId> {
    return this.categoryId.value
  }

  brandValue (): Primitives<BrandId> {
    return this.brandId.value
  }

  modelValue (): Primitives<ModelId> {
    return this.modelId.value
  }

  employeeValue (): Primitives<DeviceEmployee> {
    return this.employeeId.value
  }

  locationValue (): Primitives<LocationId> {
    return this.locationId.value
  }

  observationValue (): Primitives<DeviceObservation> {
    return this.observation.value
  }

  toPrimitives (): DevicePrimitives {
    return {
      serial: this.serialValue(),
      activo: this.activoValue(),
      statusId: this.statusValue(),
      modelId: this.modelValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue(),
      employeeId: this.employeeValue(),
      locationId: this.locationValue(),
      observation: this.observationValue()
    }
  }
}
