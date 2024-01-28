import { CategoryId } from '../../../Category/domain/CategoryId'
import { DeviceId } from '../../../Device/domain/DeviceId'
import { ComputerFeaturesId } from './ComputerFeatureId'
import { ComputerProcessorId } from '../Processor/ComputerProcessorId'
import { type MemoryRamSizeValues, MemoryRamSize } from '../MemoryRam/MemoryRamSize'
import { ComputerOSType, type ComputerOSTypes } from './ComputerOperatingSystem'
import { HardDriveCapacity, type HardDriveCapacityType } from '../HardDrive.ts/HardDriveCapacity'
import { type ComputerTypes, ComputerType } from './ComputerType'

export interface ComputerPrimitives {
  id: string
  computerType: string
  processorId: string
  memoryRam: string
  operatingSystem: string
  hardDriveCapacity: string
}

export class ComputerFeatures {
  constructor (
    private readonly id: ComputerFeaturesId,
    private readonly categoryId: CategoryId,
    private readonly deviceId: DeviceId,
    private readonly computerType: ComputerType,
    private processorId: ComputerProcessorId,
    private memoryRam: MemoryRamSize,
    private operatingSystem: ComputerOSType,
    private hardDriveCapacity: HardDriveCapacity
  ) {}

  static create (
    {
      categoryId,
      deviceId,
      computerType,
      processorId,
      memoryRam,
      operatingSystem,
      hardDriveCapacity
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
