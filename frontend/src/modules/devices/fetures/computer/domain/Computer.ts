import { CategoryDefaultData, type CategoryValues } from '../../../category/domain/CategoryDefaultData'
import { Device } from '../../../devices/devices/domain/Device'
import { DeviceActivo } from '../../../devices/devices/domain/DeviceActivo'
import { DeviceSerial } from '../../../devices/devices/domain/DeviceSeria'
import { StatusId } from '../../../devices/status/domain/StatusId'
import { ModelId } from '../../../model/domain/ModelId'
import { HardDriveCapacityId } from '../../hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../hardDrive/hardDriveType/domain/HardDriveTypeId'
import { MemoryRamCapacity } from '../../memoryRam/memoryRamCapacity/MemoryRamCapacity'
import { OperatingSystemId } from '../../operatingSystem/operatingSystem/domain/OperatingSystemId'
import { OperatingSystemArqId } from '../../operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { ProcessorId } from '../../processor/domain/ProcessorId'
import { IPAddress } from './IPAddress'
import { MACAddress } from './MACAddress'

export interface ComputerPrimitives {
  serial: string
  activo: string | null
  statusId: number
  modelId: string
  processorId: string
  memoryRamCapacity: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
  operatingSystemId: number
  operatingSystemArqId: number
  macAddress: string
  ipAddress: string
}

export class Computer extends Device {
  constructor (
    serial: DeviceSerial,
    activo: DeviceActivo,
    statusId: StatusId,
    modelId: ModelId,
    private readonly processorId: ProcessorId,
    private readonly memoryRamCapacity: MemoryRamCapacity,
    private readonly hardDriveCapacityId: HardDriveCapacityId,
    private readonly hardDriveTypeId: HardDriveTypeId,
    private readonly operatingSystemId: OperatingSystemId,
    private readonly operatingSystemArqId: OperatingSystemArqId,
    private readonly macAddress: MACAddress,
    private readonly ipAddress: IPAddress
  ) {
    super(serial, activo, statusId, modelId)
  }

  static isComputerCategory ({ categoryId }: { categoryId: number }): boolean {
    const AcceptedComputerCategories: CategoryValues[] = ['Computadoras', 'All in One', 'Laptops', 'Servidores']
    return AcceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create ({
    activo,
    serial,
    statusId,
    modelId,
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
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new ModelId(modelId),
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

  toPrimitives (): ComputerPrimitives {
    return {
      serial: this.serialValue(),
      activo: this.activoValue(),
      statusId: this.statusIdValue(),
      modelId: this.modelIdValue(),
      processorId: this.processorId.value,
      hardDriveCapacityId: this.hardDriveCapacityId.value,
      hardDriveTypeId: this.hardDriveTypeId.value,
      memoryRamCapacity: this.memoryRamCapacity.value,
      operatingSystemId: this.operatingSystemId.value,
      operatingSystemArqId: this.operatingSystemArqId.value,
      macAddress: this.macAddress.value,
      ipAddress: this.ipAddress.value
    }
  }
}
