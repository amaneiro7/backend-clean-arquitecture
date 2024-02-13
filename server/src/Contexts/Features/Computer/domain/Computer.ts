import { CategoryDefaultData, type CategoryValues } from '../../../Category/domain/CategoryDefaultData'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { DeviceId } from '../../../Device/Device/domain/DeviceId'
import { HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { MemoryRamCapacity } from '../../MemoryRam/MemoryRamCapacity/MemoryRamCapacity'
import { OperatingSystemId } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemId'
import { OperatingSystemArqId } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqID'
import { ProcessorId } from '../../Processor/domain/ProcessorId'
import { ComputerId } from './ComputerId'
import { IPAddress } from './IPAddress'
import { MACAddress } from './MACAddress'

export interface ComputerPrimitives {
  id: string
  categoryId: number
  deviceId: string
  processorId: string | null
  memoryRamCapacity: number
  hardDriveCapacityId: number | null
  hardDriveTypeId: number | null
  operatingSystemId: number | null
  operatingSystemArqId: number | null
  macAddress: string | null
  ipAddress: string | null
}

export class Computer {
  constructor (
    private readonly id: ComputerId,
    private readonly categoryId: CategoryId,
    private readonly deviceId: DeviceId,
    private processorId: ProcessorId | null,
    private memoryRamCapacity: MemoryRamCapacity,
    private hardDriveCapacityId: HardDriveCapacityId | null,
    private hardDriveTypeId: HardDriveTypeId | null,
    private operatingSystemId: OperatingSystemId | null,
    private operatingSystemArqId: OperatingSystemArqId | null,
    private macAddress: MACAddress,
    private ipAddress: IPAddress
  ) {}

  static create (
    {
      categoryId,
      deviceId,
      processorId,
      memoryRamCapacity,
      hardDriveCapacityId,
      hardDriveTypeId,
      operatingSystemId,
      operatingSystemArqId,
      macAddress,
      ipAddress
    }: Omit<ComputerPrimitives, 'id'>): Computer {
    const id = ComputerId.random().value

    if (hardDriveCapacityId === null) {
      hardDriveTypeId = null
      operatingSystemId = null
      operatingSystemArqId = null
    }

    return new Computer(
      new ComputerId(id),
      new CategoryId(categoryId),
      new DeviceId(deviceId),
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

  static isComputerCategory ({ categoryId }: { categoryId: number }): boolean {
    const AcceptedComputerCategories: CategoryValues[] = ['Computadoras', 'All in One', 'Laptops', 'Servidores']
    return AcceptedComputerCategories.includes(CategoryDefaultData[categoryId])
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

  toPrimitive (): ComputerPrimitives {
    return {
      id: this.id.value,
      categoryId: this.categoryIdValue,
      deviceId: this.deviceIdValue,
      processorId: this.processorIdValue,
      memoryRamCapacity: this.memoryRamCapacityValue,
      hardDriveCapacityId: this.hardDriveCapacityIdValue,
      hardDriveTypeId: this.hardDriveTypeIdValue,
      operatingSystemId: this.operatingSystemIdValue,
      operatingSystemArqId: this.operatingSystemArqIdValue,
      macAddress: this.macAddressValue,
      ipAddress: this.ipAddressValue
    }
  }

  static fromPrimitives (primitives: ComputerPrimitives): Computer {
    return new Computer(
      new ComputerId(primitives.id),
      new CategoryId(primitives.categoryId),
      new DeviceId(primitives.deviceId),
      primitives.processorId == null ? null : new ProcessorId(primitives.processorId),
      new MemoryRamCapacity(primitives.memoryRamCapacity),
      primitives.hardDriveCapacityId == null ? null : new HardDriveCapacityId(primitives.hardDriveCapacityId),
      primitives.hardDriveTypeId == null ? null : new HardDriveTypeId(primitives.hardDriveTypeId),
      primitives.operatingSystemId == null ? null : new OperatingSystemId(primitives.operatingSystemId),
      primitives.operatingSystemArqId == null ? null : new OperatingSystemArqId(primitives.operatingSystemArqId),
      new MACAddress(primitives.macAddress),
      new IPAddress(primitives.ipAddress)
    )
  }

  get idValue (): string {
    return this.id.value
  }

  get categoryIdValue (): number {
    return this.categoryId.value
  }

  get deviceIdValue (): string {
    return this.deviceId.value
  }

  get memoryRamCapacityValue (): number {
    return this.memoryRamCapacity.value
  }

  get processorIdValue (): string | null {
    return this.processorId?.value ?? null
  }

  get hardDriveCapacityIdValue (): number | null {
    return this.hardDriveCapacityId?.value ?? null
  }

  get hardDriveTypeIdValue (): number | null {
    return this.hardDriveTypeId?.value ?? null
  }

  get operatingSystemIdValue (): number | null {
    return this.operatingSystemId?.value ?? null
  }

  get operatingSystemArqIdValue (): number | null {
    return this.operatingSystemArqId?.value ?? null
  }

  get macAddressValue (): string | null {
    return this.macAddress.value
  }

  get ipAddressValue (): string | null {
    return this.ipAddress.value
  }
}
