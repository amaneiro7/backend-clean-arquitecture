import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { CategoryDefaultData, type CategoryValues } from '../../../category/domain/CategoryDefaultData'
import { type CategoryId } from '../../../category/domain/CategoryId'
import { Device } from '../../../devices/devices/domain/Device'
import { DeviceActivo } from '../../../devices/devices/domain/DeviceActivo'
import { DeviceSerial } from '../../../devices/devices/domain/DeviceSerial'
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
  serial: Primitives<DeviceSerial>
  activo: Primitives<DeviceActivo>
  statusId: Primitives<StatusId>
  modelId: Primitives<ModelId>
  processorId: Primitives<ProcessorId> | null
  memoryRamCapacity: Primitives<MemoryRamCapacity>
  hardDriveCapacityId: Primitives<HardDriveCapacityId> | null
  hardDriveTypeId: Primitives<HardDriveTypeId> | null
  operatingSystemId: Primitives<OperatingSystemId> | null
  operatingSystemArqId: Primitives<OperatingSystemArqId> | null
  macAddress: Primitives<MACAddress> | null
  ipAddress: Primitives<IPAddress> | null
}

export class Computer extends Device {
  constructor (
    serial: DeviceSerial,
    activo: DeviceActivo,
    statusId: StatusId,
    modelId: ModelId,
    private readonly processorId: ProcessorId | null,
    private readonly memoryRamCapacity: MemoryRamCapacity,
    private readonly hardDriveCapacityId: HardDriveCapacityId | null,
    private readonly hardDriveTypeId: HardDriveTypeId | null,
    private readonly operatingSystemId: OperatingSystemId | null,
    private readonly operatingSystemArqId: OperatingSystemArqId | null,
    private readonly macAddress: MACAddress | null,
    private readonly ipAddress: IPAddress | null
  ) {
    super(serial, activo, statusId, modelId)
  }

  static isComputerCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
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
    if (hardDriveCapacityId == null) {
      hardDriveCapacityId = null
      operatingSystemId = null
    }
    if (operatingSystemId == null) {
      operatingSystemArqId = null
    }

    return new Computer(
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new ModelId(modelId),
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

  toPrimitives (): ComputerPrimitives {
    return {
      serial: this.serialValue(),
      activo: this.activoValue(),
      statusId: this.statusIdValue(),
      modelId: this.modelIdValue(),
      memoryRamCapacity: this.memoryRamCapacity.value,
      processorId: this.processorId?.value ?? null,
      hardDriveCapacityId: this.hardDriveCapacityId?.value ?? null,
      hardDriveTypeId: this.hardDriveTypeId?.value ?? null,
      operatingSystemId: this.operatingSystemId?.value ?? null,
      operatingSystemArqId: this.operatingSystemArqId?.value ?? null,
      macAddress: this.macAddress?.value ?? null,
      ipAddress: this.ipAddress?.value ?? null
    }
  }
}
