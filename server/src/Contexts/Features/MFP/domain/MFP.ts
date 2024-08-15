import { Device, type DevicePrimitives } from '../../../Device/Device/domain/Device'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { CategoryDefaultData, CategoryNames, type CategoryValues } from '../../../Category/domain/CategoryDefaultData'
import { BrandId } from '../../../Brand/domain/BrandId'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { DeviceActivo } from '../../../Device/Device/domain/DeviceActivo'
import { DeviceEmployee } from '../../../Device/Device/domain/DeviceEmployee'
import { DeviceId } from '../../../Device/Device/domain/DeviceId'
import { DeviceModelSeries } from '../../../Device/Device/domain/DeviceModelSeries'
import { DeviceObservation } from '../../../Device/Device/domain/DeviceObservation'
import { DeviceSerial } from '../../../Device/Device/domain/DeviceSerial'
import { DeviceStatus } from '../../../Device/Device/domain/DeviceStatus'
import { MFPIPAddress } from './MFPIPAddress'
import { DeviceLocation } from '../../../Device/Device/domain/DeviceLocation'

import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { DeviceStocknumber } from '../../../Device/Device/domain/DeviceStock'


export interface DeviceMFPPrimitives extends DevicePrimitives {
  ipAddress: Primitives<MFPIPAddress>
}

export class MFP extends Device {
  constructor(
    id: DeviceId,
    serial: DeviceSerial,
    activo: DeviceActivo,
    statusId: DeviceStatus,
    categoryId: CategoryId,
    brandId: BrandId,
    modelId: DeviceModelSeries,
    employeeId: DeviceEmployee,
    locationId: DeviceLocation,
    observation: DeviceObservation,
    stockNumber: DeviceStocknumber,
    private ipAddress: MFPIPAddress

  ) {
    super(id, serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, stockNumber)

  }

  static create(params: Omit<DeviceMFPPrimitives, 'id'>): MFP {
    if (!MFP.isMFPCategory({ categoryId: params.categoryId })) {
      throw new InvalidArgumentError('No pertenece a esta categoria')
    }
    const id = DeviceId.random().value
    return new MFP(
      new DeviceId(id),
      new DeviceSerial(params.serial),
      new DeviceActivo(params.activo),
      new DeviceStatus(params.statusId),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new DeviceModelSeries(params.modelId),
      new DeviceEmployee(params.employeeId, params.statusId),
      new DeviceLocation(params.locationId),
      new DeviceObservation(params.observation),
      new DeviceStocknumber(params.stockNumber, params.statusId),
      new MFPIPAddress(params.ipAddress, params.statusId)
    )
  }

  static isMFPCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const acceptedComputerCategories: CategoryValues[] = [CategoryNames.MFP]
    return acceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  toPrimitives(): DeviceMFPPrimitives {
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
      observation: this.observationValue,
      stockNumber: this.stockNumberValue,
      ipAddress: this.ipAddressValue
    }
  }

  static fromPrimitives(primitives: DeviceMFPPrimitives): MFP {
    return new MFP(
      new DeviceId(primitives.id),
      new DeviceSerial(primitives.serial),
      new DeviceActivo(primitives.activo),
      new DeviceStatus(primitives.statusId),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new DeviceModelSeries(primitives.modelId),
      new DeviceEmployee(primitives.employeeId, primitives.statusId),
      new DeviceLocation(primitives.locationId),
      new DeviceObservation(primitives.observation),
      new DeviceStocknumber(primitives.stockNumber, primitives.statusId),
      new MFPIPAddress(primitives.ipAddress, primitives.statusId)
    )
  }

  updateIPAddress(newIPAddress: Primitives<MFPIPAddress>, status: Primitives<DeviceStatus>): void {
    this.ipAddress = new MFPIPAddress(newIPAddress, status)
  }

  get ipAddressValue(): Primitives<MFPIPAddress> {
    return this.ipAddress.value
  }
}
