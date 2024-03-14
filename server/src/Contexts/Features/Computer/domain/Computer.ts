import { BrandId } from '../../../Brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../Category/domain/CategoryDefaultData'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { Device, type DevicePrimitives } from '../../../Device/Device/domain/Device'
import { DeviceActivo } from '../../../Device/Device/domain/DeviceActivo'
import { DeviceEmployee } from '../../../Device/Device/domain/DeviceEmployee'
import { DeviceId } from '../../../Device/Device/domain/DeviceId'
import { DeviceObservation } from '../../../Device/Device/domain/DeviceObservation'
import { DeviceSerial } from '../../../Device/Device/domain/DeviceSerial'
import { StatusId } from '../../../Device/Status/domain/StatusId'
import { LocationId } from '../../../Location/Location/domain/LocationId'
import { ModelSeriesId } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { MemoryRamCapacity } from '../../MemoryRam/MemoryRamCapacity/MemoryRamCapacity'
import { OperatingSystemId } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemId'
import { OperatingSystemArqId } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqID'
import { ProcessorId } from '../../Processor/Processor/domain/ProcessorId'
import { IPAddress } from './IPAddress'
import { MACAddress } from './MACAddress'

export interface DeviceComputerPrimitives extends DevicePrimitives {
  processorId: Primitives<ProcessorId> | null
  memoryRamCapacity: Primitives<MemoryRamCapacity>
  hardDriveCapacityId: Primitives<HardDriveCapacityId> | null
  hardDriveTypeId: Primitives<HardDriveTypeId> | null
  operatingSystemId: Primitives<OperatingSystemId> | null
  operatingSystemArqId: Primitives<OperatingSystemArqId> | null
  macAddress: Primitives<MACAddress> | null
  ipAddress: Primitives<IPAddress> | null
}

export class DeviceComputer extends Device {
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
    private processorId: ProcessorId | null,
    private memoryRamCapacity: MemoryRamCapacity,
    private hardDriveCapacityId: HardDriveCapacityId | null,
    private hardDriveTypeId: HardDriveTypeId | null,
    private operatingSystemId: OperatingSystemId | null,
    private operatingSystemArqId: OperatingSystemArqId | null,
    private macAddress: MACAddress,
    private ipAddress: IPAddress

  ) {
    super(id, serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation)
  }

  static create ({
    serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation,
    processorId, memoryRamCapacity, hardDriveCapacityId, hardDriveTypeId,
    operatingSystemId, operatingSystemArqId, macAddress, ipAddress
  }: Omit<DeviceComputerPrimitives, 'id'>): DeviceComputer {
    const id = DeviceId.random().value
    return new DeviceComputer(
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
      processorId != null ? new ProcessorId(processorId) : null,
      new MemoryRamCapacity(memoryRamCapacity),
      hardDriveCapacityId != null ? new HardDriveCapacityId(hardDriveCapacityId) : null,
      hardDriveTypeId != null ? new HardDriveTypeId(hardDriveTypeId) : null,
      operatingSystemId != null ? new OperatingSystemId(operatingSystemId) : null,
      operatingSystemArqId != null ? new OperatingSystemArqId(operatingSystemArqId) : null,
      new MACAddress(macAddress),
      new IPAddress(ipAddress)
    )
  }

  static isComputerCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const acceptedComputerCategories: CategoryValues[] = ['Computadoras', 'All in One', 'Laptops', 'Servidores']
    return acceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  toPrimitives (): DeviceComputerPrimitives {
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
      processorId: this.processorId != null ? this.processorValue : null,
      memoryRamCapacity: this.memoryRamCapacityValue,
      hardDriveCapacityId: this.hardDriveCapacityId != null ? this.hardDriveCapacityValue : null,
      hardDriveTypeId: this.hardDriveTypeId != null ? this.hardDriveTypeValue : null,
      operatingSystemId: this.operatingSystemId != null ? this.operatingSystemValue : null,
      operatingSystemArqId: this.operatingSystemArqId != null ? this.operatingSystemArqValue : null,
      macAddress: this.macAddressValue,
      ipAddress: this.ipAddressValue
    }
  }

  static fromPrimitives (primitives: DeviceComputerPrimitives): DeviceComputer {
    return new DeviceComputer(
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
      primitives.processorId != null ? new ProcessorId(primitives.processorId) : null,
      new MemoryRamCapacity(primitives.memoryRamCapacity),
      primitives.hardDriveCapacityId != null ? new HardDriveCapacityId(primitives.hardDriveCapacityId) : null,
      primitives.hardDriveTypeId != null ? new HardDriveTypeId(primitives.hardDriveTypeId) : null,
      primitives.operatingSystemId != null ? new OperatingSystemId(primitives.operatingSystemId) : null,
      primitives.operatingSystemArqId != null ? new OperatingSystemArqId(primitives.operatingSystemArqId) : null,
      new MACAddress(primitives.macAddress),
      new IPAddress(primitives.ipAddress
      )
    )
  }

  updateProcessor (newProcessorId: string | null): void {
    this.processorId = newProcessorId != null ? new ProcessorId(newProcessorId) : null
  }

  updateMemoryRam (newMemoryRamCapacity: number): void {
    this.memoryRamCapacity = new MemoryRamCapacity(newMemoryRamCapacity)
  }

  updateOperatingSystem (newOperatingSystem: number): void {
    this.operatingSystemId = newOperatingSystem != null ? new OperatingSystemId(newOperatingSystem) : null
  }

  updateOperatingSystemArq (newOperatingSystemArq: number): void {
    this.operatingSystemArqId = newOperatingSystemArq != null ? new OperatingSystemArqId(newOperatingSystemArq) : null
  }

  updateHardDriveCapacity (newHDDCapacity: number): void {
    this.hardDriveCapacityId = newHDDCapacity != null ? new HardDriveCapacityId(newHDDCapacity) : null
  }

  updateHardDriveType (newHDDType: number): void {
    this.hardDriveTypeId = newHDDType != null ? new HardDriveTypeId(newHDDType) : null
  }

  updateIPAddress (newIPAddress: string | null): void {
    this.ipAddress = new IPAddress(newIPAddress)
  }

  updateMACAddress (newMACAddress: string | null): void {
    this.macAddress = new MACAddress(newMACAddress)
  }

  get memoryRamCapacityValue (): number {
    return this.memoryRamCapacity.value
  }

  get processorValue (): string | null {
    return this.processorId?.value ?? null
  }

  get hardDriveCapacityValue (): number | null {
    return this.hardDriveCapacityId?.value ?? null
  }

  get hardDriveTypeValue (): number | null {
    return this.hardDriveTypeId?.value ?? null
  }

  get operatingSystemValue (): number | null {
    return this.operatingSystemId?.value ?? null
  }

  get operatingSystemArqValue (): number | null {
    return this.operatingSystemArqId?.value ?? null
  }

  get macAddressValue (): string | null {
    return this.macAddress.value
  }

  get ipAddressValue (): string | null {
    return this.ipAddress.value
  }
}
