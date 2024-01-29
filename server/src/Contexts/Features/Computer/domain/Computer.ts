import { CategoryId } from '../../../Category/domain/CategoryId'
import { DeviceId } from '../../../Device/Device/domain/DeviceId'
import { type HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { type HardDriveTypeId } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { type MemoryRamCapacityId } from '../../MemoryRam/MemoryRamCapacity/domain/MemoryRamCapacityId'
import { type OperatingSystemId } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemId'
import { type OperatingSystemArqId } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqID'
import { type ProcessorId } from '../../Processor/domain/ProcessorId'
import { type ComputerId } from './ComputerId'
import { IPAddress } from './IPAddress'
import { MACAddress } from './MACAddress'

export interface ComputerPrimitives {
   string
   number
   string
   string
   number[]
   number
   number
   number
   number
   number
   string
   string
}

export class Computer {
  constructor (
    private readonly id: ComputerId,
    private readonly categoryId: CategoryId,
    private readonly deviceId: DeviceId,
    private readonly processorId: ProcessorId,
    private readonly memoryRam: MemoryRamCapacityId[],
    private readonly totalMemory: number,
    private readonly hardDriveCapacityId: HardDriveCapacityId,
    private readonly hardDriveTypeId: HardDriveTypeId,
    private readonly operatingSystemId: OperatingSystemId,
    private readonly operatingSystemArqId: OperatingSystemArqId,
    private readonly MACAdress: MACAddress,
    private readonly IPAdress: IPAddress
  ) {}

  static create (
    {
      id,
      categoryId,
      deviceId,
      processorId,
      memoryRam,
      totalMemory,
      hardDriveCapacityId,
      hardDriveTypeId,
      operatingSystemId,
      operatingSystemArqId,
      MACAdress,
      IPAdress,
    }: {
      categoryId: string
      deviceId: string
      computerType: ComputerTypes
      processorId: string
      memoryRam: MemoryRamSizeValues
      operatingSystem: ComputerOSTypes
      hardDriveCapacity: HardDriveCapacityType
    }): ComputerFeatures {
    const id = ComputerFeaturesId.random().toString()
    return new ComputerFeatures(
      new ComputerFeaturesId(id),
      new CategoryId(deviceId),
      new DeviceId(categoryId),
      new ComputerType(computerType),
      new ComputerProcessorId(processorId),
      new MemoryRamSize(memoryRam),
      new ComputerOSType(operatingSystem),
      new HardDriveCapacity(hardDriveCapacity)
    )
  }

  updateProcessor (newProcessorId: string): void {
    this.processorId = new ComputerProcessorId(newProcessorId)
  }

  updateMemoryRamSize (newValue: MemoryRamSizeValues): void {
    this.memoryRam = new MemoryRamSize(newValue)
  }

  updateOperatingSystem (newOperatingSystem: ComputerOSTypes): void {
    this.operatingSystem = new ComputerOSType(newOperatingSystem)
  }

  updateHardDriveCapaciyu (newHDDCapacity: HardDriveCapacityType): void {
    this.hardDriveCapacity = new HardDriveCapacity(newHDDCapacity)
  }

  toPrimitive (): ComputerPrimitives {
    return {
      id: this.id.value,
      computerType: this.computerType.value,
      processorId: this.processorId.value,
      memoryRam: this.memoryRam.value,
      operatingSystem: this.operatingSystem.value,
      hardDriveCapacity: this.hardDriveCapacity.value
    }
  }

  get idValue (): string {
    return this.id.value
  }

  get categoryIdValue (): string {
    return this.categoryId.value
  }

  get deviceIdValue (): string {
    return this.deviceId.value
  }

  get computerTypeValue (): string {
    return this.computerType.value
  }

  get processorIdValue (): string {
    return this.processorId.value
  }

  get memoryRamValue (): string {
    return this.memoryRam.value
  }

  get OperatingSystemValue (): string {
    return this.operatingSystem.value
  }

  get hardDriveCapacityValue (): string {
    return this.hardDriveCapacity.value
  }
}
