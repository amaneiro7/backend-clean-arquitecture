import { CategoryId } from '../../../Category/domain/CategoryId'
import { DeviceId } from '../../../Device/domain/DeviceId'
import { ComputerFeaturesId } from './ComputerFeatureId'
import { ComputerProcessorId } from './ComputerProcessorId'
import { type MemoryRamSizeValues, MemoryRamSize } from '../MemoryRam/MemoryRamSize'
import { ComputerOSType, type ComputerOSTypes } from './ComputerOperatingSystem'
import { HardDriveCapacity, type HardDriveCapacityType } from '../HardDriveFeatures.ts/HardDriveCapacity'
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
    private readonly _id: ComputerFeaturesId,
    private readonly _categoryId: CategoryId,
    private readonly _deviceId: DeviceId,
    private readonly _computerType: ComputerType,
    private _processorId: ComputerProcessorId,
    private _memoryRam: MemoryRamSize,
    private _operatingSystem: ComputerOSType,
    private _hardDriveCapacity: HardDriveCapacity
  ) {}

  static create (
    {
      categoryId,
      deviceId,
      computerType,
      processorId,
      memoryRam,
      OperatingSystem,
      hardDriveCapacity
    }: {
      categoryId: string
      deviceId: string
      computerType: ComputerTypes
      processorId: string
      memoryRam: MemoryRamSizeValues
      OperatingSystem: ComputerOSTypes
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
      new ComputerOSType(OperatingSystem),
      new HardDriveCapacity(hardDriveCapacity)
    )
  }

  updateProcessor (newProcessorId: string): void {
    this._processorId = new ComputerProcessorId(newProcessorId)
  }

  updateMemoryRamSize (newValue: MemoryRamSizeValues): void {
    this._memoryRam = new MemoryRamSize(newValue)
  }

  updateOperatingSystem (newOperatingSystem: ComputerOSTypes): void {
    this._operatingSystem = new ComputerOSType(newOperatingSystem)
  }

  updateHardDriveCapaciyu (newHDDCapacity: HardDriveCapacityType): void {
    this._hardDriveCapacity = new HardDriveCapacity(newHDDCapacity)
  }

  toPrimitive (): ComputerPrimitives {
    return {
      id: this._id.value,
      computerType: this._computerType.value,
      processorId: this._processorId.value,
      memoryRam: this._memoryRam.value,
      operatingSystem: this._operatingSystem.value,
      hardDriveCapacity: this._hardDriveCapacity.value
    }
  }

  get id (): string {
    return this._id.value
  }

  get categoryId (): string {
    return this._categoryId.value
  }

  get deviceId (): string {
    return this._deviceId.value
  }

  get computerType (): string {
    return this._computerType.value
  }

  get processorId (): string {
    return this._processorId.value
  }

  get memoryRam (): string {
    return this._memoryRam.value
  }

  get OperatingSystem (): string {
    return this._operatingSystem.value
  }

  get hardDriveCapacity (): string {
    return this._hardDriveCapacity.value
  }
}
