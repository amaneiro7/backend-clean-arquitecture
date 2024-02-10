import { CategoryId } from '../../../category/domain/CategoryId'
import { DeviceId } from '../../../devices/devices/domain/DeviceId'
import { HardDriveCapacityId } from '../../hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../hardDrive/hardDriveType/domain/HardDriveTypeId'
import { MemoryRamCapacity } from '../../memoryRam/memoryRamCapacity/MemoryRamCapacity'
import { OperatingSystemId } from '../../operatingSystem/operatingSystem/domain/OperatingSystemId'
import { OperatingSystemArqId } from '../../operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { ProcessorId } from '../../processor/domain/ProcessorId'
import { ComputerId } from './ComputerId'
import { IPAddress } from './IPAddress'
import { MACAddress } from './MACAddress'

export interface ComputerPrimitives {
  id: string
  categoryId: number
  deviceId: string
  processorId: string
  memoryRamCapacity: number
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
    private readonly processorId: ProcessorId,
    private readonly memoryRamCapacity: MemoryRamCapacity,
    private readonly hardDriveCapacityId: HardDriveCapacityId,
    private readonly hardDriveTypeId: HardDriveTypeId,
    private readonly operatingSystemId: OperatingSystemId,
    private readonly operatingSystemArqId: OperatingSystemArqId,
    private readonly macAddress: MACAddress,
    private readonly ipAddress: IPAddress
  ) {}

  public static create ({
    id,
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
  }: ComputerPrimitives) {
    return new Computer(
      new ComputerId(id),
      new CategoryId(categoryId),
      new DeviceId(deviceId),
      new ProcessorId(processorId),
      new MemoryRamCapacity(memoryRamCapacity),
      new HardDriveCapacityId(hardDriveCapacityId),
      new HardDriveTypeId(hardDriveTypeId),
      new OperatingSystemId(operatingSystemId),
      new OperatingSystemArqId(operatingSystemArqId),
      new MACAddress(macAddress),
      new IPAddress(ipAddress)
    )
  }

  idValue (): string {
    return this.id.value
  }

  categoryIdValue (): number {
    return this.categoryId.value
  }

  deviceIdValue (): string {
    return this.deviceId.value
  }

  processorIdValue (): string {
    return this.processorId.value
  }

  memoryRamCapacityValue (): number {
    return this.memoryRamCapacity.value
  }

  operatingSystemIdValue (): number {
    return this.operatingSystemId.value
  }

  operatingSystemArqIdValue (): number {
    return this.operatingSystemArqId.value
  }

  macAddressValue (): string {
    return this.macAddress.value
  }

  ipAddressValue (): string {
    return this.ipAddress.value
  }

  hardDriveCapacityIdValue (): number {
    return this.hardDriveCapacityId.value
  }

  hardDriveTypeIdValue (): number {
    return this.hardDriveTypeId.value
  }

  toPrimitives (): ComputerPrimitives {
    return {
      id: this.idValue(),
      categoryId: this.categoryIdValue(),
      deviceId: this.deviceIdValue(),
      processorId: this.processorIdValue(),
      hardDriveCapacityId: this.hardDriveCapacityIdValue(),
      hardDriveTypeId: this.hardDriveTypeIdValue(),
      memoryRamCapacity: this.memoryRamCapacityValue(),
      operatingSystemId: this.operatingSystemIdValue(),
      operatingSystemArqId: this.operatingSystemArqIdValue(),
      macAddress: this.macAddressValue(),
      ipAddress: this.ipAddressValue()
    }
  }
}
