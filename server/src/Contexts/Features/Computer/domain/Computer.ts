import { CategoryId } from '../../../Category/domain/CategoryId'
import { DeviceId } from '../../../Device/Device/domain/DeviceId'
import { HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { type MemoryRamCapacityId } from '../../MemoryRam/MemoryRamCapacity/domain/MemoryRamCapacityId'
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
  processorId: string
  memoryRam: MemoryRamCapacityId[]
  totalMemory: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
  operatingSystemId: number
  operatingSystemArqId: number
  macAddress: string
  ipAddress: string
}

export class Computer {
  constructor (
    private readonly id: ComputerId,
    private readonly categoryId: CategoryId,
    private readonly deviceId: DeviceId,
    private processorId: ProcessorId,
    private memoryRam: MemoryRamCapacityId[],
    private hardDriveCapacityId: HardDriveCapacityId,
    private hardDriveTypeId: HardDriveTypeId,
    private operatingSystemId: OperatingSystemId,
    private operatingSystemArqId: OperatingSystemArqId,
    private readonly macAdress: MACAddress,
    private ipAddress: IPAddress
  ) {}

  static create (
    {
      categoryId,
      deviceId,
      processorId,
      memoryRam = [],
      hardDriveCapacityId,
      hardDriveTypeId,
      operatingSystemId,
      operatingSystemArqId,
      macAddress,
      ipAddress
    }: {
      categoryId: number
      deviceId: string
      processorId: string
      memoryRam: MemoryRamCapacityId[]
      hardDriveCapacityId: number
      hardDriveTypeId: number
      operatingSystemId: number
      operatingSystemArqId: number
      macAddress: string
      ipAddress: string
    }): Computer {
    const id = ComputerId.random().value
    return new Computer(
      new ComputerId(id),
      new CategoryId(categoryId),
      new DeviceId(deviceId),
      new ProcessorId(processorId),
      memoryRam,
      new HardDriveCapacityId(hardDriveCapacityId),
      new HardDriveTypeId(hardDriveTypeId),
      new OperatingSystemId(operatingSystemId),
      new OperatingSystemArqId(operatingSystemArqId),
      new MACAddress(macAddress),
      new IPAddress(ipAddress)
    )
  }

  updateProcessor (newProcessorId: string): void {
    this.processorId = new ProcessorId(newProcessorId)
  }

  updateMemoryRam (newMemoryRamIds: MemoryRamCapacityId[]): void {
    this.memoryRam = newMemoryRamIds
  }

  updateOperatingSystem (newOperatingSystem: number): void {
    this.operatingSystemId = new OperatingSystemId(newOperatingSystem)
  }

  updateOperatingSystemArq (newOperatingSystemArq: number): void {
    this.operatingSystemArqId = new OperatingSystemArqId(newOperatingSystemArq)
  }

  updateHardDriveCapacity (newHDDCapacity: number): void {
    this.hardDriveCapacityId = new HardDriveCapacityId(newHDDCapacity)
  }

  updateHardDriveType (newHDDType: number): void {
    this.hardDriveTypeId = new HardDriveTypeId(newHDDType)
  }

  updateIPAddress (newIPAddress: string): void {
    this.ipAddress = new IPAddress(newIPAddress)
  }

  totalMemory (memoryRamValues: number[]): number {
    return memoryRamValues.reduce((a, b) => a + b, 0)
  }

  toPrimitive (memoryRamValues: number[]): ComputerPrimitives {
    return {
      id: this.id.value,
      categoryId: this.categoryId.value,
      deviceId: this.deviceId.value,
      processorId: this.processorId.value,
      memoryRam: this.memoryRam,
      totalMemory: this.totalMemory(memoryRamValues),
      hardDriveCapacityId: this.hardDriveCapacityId.value,
      hardDriveTypeId: this.hardDriveTypeId.value,
      operatingSystemId: this.operatingSystemId.value,
      operatingSystemArqId: this.operatingSystemArqId.value,
      macAddress: this.macAdress.value,
      ipAddress: this.ipAddress.value
    }
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

  get processorIdValue (): string {
    return this.processorId.value
  }

  get memoryRamValues (): MemoryRamCapacityId[] {
    return this.memoryRam
  }

  get hardDriveCapacityIdValue (): number {
    return this.hardDriveCapacityId.value
  }

  get hardDriveTypeIdValue (): number {
    return this.hardDriveTypeId.value
  }

  get operatingSystemIdValue (): number {
    return this.operatingSystemId.value
  }

  get operatingSystemArqIdValue (): number {
    return this.operatingSystemArqId.value
  }

  get macAddressValue (): string {
    return this.macAdress.value
  }

  get ipAddressValue (): string {
    return this.ipAddress.value
  }
}
