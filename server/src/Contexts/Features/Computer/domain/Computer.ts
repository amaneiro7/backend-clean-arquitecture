import { Device, type DevicePrimitives } from '../../../Device/Device/domain/Device'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { CategoryDefaultData, type CategoryValues } from '../../../Category/domain/CategoryDefaultData'
import { BrandId } from '../../../Brand/domain/BrandId'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { DeviceActivo } from '../../../Device/Device/domain/DeviceActivo'
import { DeviceEmployee } from '../../../Device/Device/domain/DeviceEmployee'
import { DeviceId } from '../../../Device/Device/domain/DeviceId'
import { DeviceModelSeries } from '../../../Device/Device/domain/DeviceModelSeries'
import { DeviceObservation } from '../../../Device/Device/domain/DeviceObservation'
import { DeviceSerial } from '../../../Device/Device/domain/DeviceSerial'
import { DeviceStatus } from '../../../Device/Device/domain/DeviceStatus'
import { ComputerMemoryRamCapacity } from './ComputerMemoryRamCapacity'
import { ComputerName } from './ComputerName'
import { ComputerProcessor } from './ComputerProcessor'
import { IPAddress } from './IPAddress'
import { MACAddress } from './MACAddress'
import { ComputerHardDriveCapacity } from './ComputerHardDriveCapacity'
import { ComputerHardDriveType } from './ComputerHardDriveType'
import { ComputerOperatingSystem } from './ComputerOperatingSystem'
import { ComputerOperatingSystemArq } from './ComputerOperatingSystemArq'
import { DeviceLocation } from '../../../Device/Device/domain/DeviceLocation'
import { ComputerMemoryRam } from './ComputerMemoryRam'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { MemoryRamValues } from '../../MemoryRam/MemoryRamCapacity/MemoryRamValues'
import { DeviceStocknumber } from '../../../Device/Device/domain/DeviceStock'
import { param } from 'express-validator'

export interface DeviceComputerPrimitives extends DevicePrimitives {
  computerName: Primitives<ComputerName>
  processorId: Primitives<ComputerProcessor>
  memoryRam: Primitives<MemoryRamValues>[]
  memoryRamCapacity: Primitives<ComputerMemoryRamCapacity>
  hardDriveCapacityId: Primitives<ComputerHardDriveCapacity>
  hardDriveTypeId: Primitives<ComputerHardDriveType>
  operatingSystemId: Primitives<ComputerOperatingSystem>
  operatingSystemArqId: Primitives<ComputerOperatingSystemArq>
  macAddress: Primitives<MACAddress>
  ipAddress: Primitives<IPAddress>
}

export class DeviceComputer extends Device {
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
    private computerName: ComputerName,
    private processorId: ComputerProcessor,
    private memoryRam: ComputerMemoryRam,
    private memoryRamCapacity: ComputerMemoryRamCapacity,
    private hardDriveCapacityId: ComputerHardDriveCapacity,
    private hardDriveTypeId: ComputerHardDriveType,
    private operatingSystemId: ComputerOperatingSystem,
    private operatingSystemArqId: ComputerOperatingSystemArq,
    private macAddress: MACAddress,
    private ipAddress: IPAddress

  ) {
    super(id, serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, stockNumber)

    if (!DeviceComputer.isComputerCategory({ categoryId: categoryId.value })) {
      throw new InvalidArgumentError('No pertenece a esta categoria')
    }
  }

  static create(params: Omit<DeviceComputerPrimitives, 'id' | 'memoryRamCapacity'>): DeviceComputer {
    const id = DeviceId.random().value
    return new DeviceComputer(
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
      new ComputerName(params.computerName, params.statusId),
      new ComputerProcessor(params.processorId),
      ComputerMemoryRam.fromPrimitives(params.memoryRam),
      new ComputerMemoryRamCapacity(ComputerMemoryRam.totalAmount(params.memoryRam), params.statusId),
      new ComputerHardDriveCapacity(params.hardDriveCapacityId),
      new ComputerHardDriveType(params.hardDriveTypeId, params.hardDriveCapacityId),
      new ComputerOperatingSystem(params.operatingSystemId, params.hardDriveCapacityId, params.statusId),
      new ComputerOperatingSystemArq(params.operatingSystemArqId, params.operatingSystemId),
      new MACAddress(params.macAddress),
      new IPAddress(params.ipAddress, params.statusId)
    )
  }

  static isComputerCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const acceptedComputerCategories: CategoryValues[] = ['Computadoras', 'All in One', 'Laptops', 'Servidores']
    return acceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  toPrimitives(): DeviceComputerPrimitives {
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
      computerName: this.computerNameValue,
      processorId: this.processorValue,
      memoryRam: this.memoryRamValue,
      memoryRamCapacity: this.memoryRamCapacityValue,
      hardDriveCapacityId: this.hardDriveCapacityValue,
      hardDriveTypeId: this.hardDriveTypeValue,
      operatingSystemId: this.operatingSystemValue,
      operatingSystemArqId: this.operatingSystemArqValue,
      macAddress: this.macAddressValue,
      ipAddress: this.ipAddressValue
    }
  }

  static fromPrimitives(primitives: DeviceComputerPrimitives): DeviceComputer {
    return new DeviceComputer(
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
      new ComputerName(primitives.computerName, primitives.statusId),
      new ComputerProcessor(primitives.processorId),
      ComputerMemoryRam.fromPrimitives(primitives.memoryRam),
      new ComputerMemoryRamCapacity(primitives.memoryRamCapacity, primitives.statusId),
      new ComputerHardDriveCapacity(primitives.hardDriveCapacityId),
      new ComputerHardDriveType(primitives.hardDriveTypeId, primitives.hardDriveCapacityId),
      new ComputerOperatingSystem(primitives.operatingSystemId, primitives.hardDriveCapacityId, primitives.statusId),
      new ComputerOperatingSystemArq(primitives.operatingSystemArqId, primitives.operatingSystemId),
      new MACAddress(primitives.macAddress),
      new IPAddress(primitives.ipAddress, primitives.statusId)
    )
  }

  updateComputerName(newComputerName: Primitives<ComputerName>, statusId: Primitives<DeviceStatus>): void {
    this.computerName = new ComputerName(newComputerName, statusId)
  }

  updateProcessor(newProcessorId: Primitives<ComputerProcessor>): void {
    this.processorId = new ComputerProcessor(newProcessorId)
  }

  updateMemoryRam(newMemoryRam: Primitives<MemoryRamValues>[]): void {
    this.memoryRam = ComputerMemoryRam.fromPrimitives(newMemoryRam)
  }
  updateMemoryRamCapacity(newMemoryRamCapacity: Primitives<ComputerMemoryRamCapacity>, status: Primitives<DeviceStatus>): void {
    this.memoryRamCapacity = new ComputerMemoryRamCapacity(newMemoryRamCapacity, status)
  }

  updateOperatingSystem(newOperatingSystem: Primitives<ComputerOperatingSystem>, hardDriveCapacity: Primitives<ComputerHardDriveCapacity>, status: Primitives<DeviceStatus>): void {
    this.operatingSystemId = new ComputerOperatingSystem(newOperatingSystem, hardDriveCapacity, status)
  }

  updateOperatingSystemArq(newOperatingSystemArq: Primitives<ComputerOperatingSystemArq>, opertaingSystem: Primitives<ComputerOperatingSystem>): void {
    this.operatingSystemArqId = new ComputerOperatingSystemArq(newOperatingSystemArq, opertaingSystem)
  }

  updateHardDriveCapacity(newHDDCapacity: Primitives<ComputerHardDriveCapacity>): void {
    this.hardDriveCapacityId = new ComputerHardDriveCapacity(newHDDCapacity)
  }

  updateHardDriveType(newHDDType: Primitives<ComputerHardDriveType>, hardDriveCapacity: Primitives<ComputerHardDriveCapacity>): void {
    this.hardDriveTypeId = new ComputerHardDriveType(newHDDType, hardDriveCapacity)
  }

  updateIPAddress(newIPAddress: Primitives<IPAddress>, status: Primitives<DeviceStatus>): void {
    this.ipAddress = new IPAddress(newIPAddress, status)
  }

  updateMACAddress(newMACAddress: Primitives<MACAddress>): void {
    this.macAddress = new MACAddress(newMACAddress)
  }

  get computerNameValue(): Primitives<ComputerName> {
    return this.computerName.value
  }

  get memoryRamCapacityValue(): Primitives<ComputerMemoryRamCapacity> {
    return this.memoryRamCapacity.value
  }
  get memoryRamValue(): Primitives<MemoryRamValues>[] {
    return this.memoryRam.toPrimitives()
  }

  get processorValue(): Primitives<ComputerProcessor> {
    return this.processorId.value
  }

  get hardDriveCapacityValue(): Primitives<ComputerHardDriveCapacity> {
    return this.hardDriveCapacityId.value
  }

  get hardDriveTypeValue(): Primitives<ComputerHardDriveType> {
    return this.hardDriveTypeId.value
  }

  get operatingSystemValue(): Primitives<ComputerOperatingSystem> {
    return this.operatingSystemId.value
  }

  get operatingSystemArqValue(): Primitives<ComputerOperatingSystemArq> {
    return this.operatingSystemArqId.value ?? null
  }

  get macAddressValue(): Primitives<MACAddress> {
    return this.macAddress.value
  }

  get ipAddressValue(): Primitives<IPAddress> {
    return this.ipAddress.value
  }
}
