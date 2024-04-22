import { LocationId } from '../../../../location/locations/domain/locationId'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { BrandId } from '../../../brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../category/domain/CategoryDefaultData'
import { CategoryId } from '../../../category/domain/CategoryId'
import { Device, type DevicePrimitives } from '../../../devices/devices/domain/Device'
import { DeviceActivo } from '../../../devices/devices/domain/DeviceActivo'
import { DeviceEmployee } from '../../../devices/devices/domain/DeviceEmployee'
import { DeviceObservation } from '../../../devices/devices/domain/DeviceObservation'
import { DeviceSerial } from '../../../devices/devices/domain/DeviceSerial'
import { StatusId } from '../../../devices/status/domain/StatusId'
import { ModelId } from '../../../model/domain/ModelId'
import { HardDriveCapacityId } from '../../hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../hardDrive/hardDriveType/domain/HardDriveTypeId'
import { MemoryRamCapacity } from '../../memoryRam/memoryRamCapacity/MemoryRamCapacity'
import { OperatingSystemId } from '../../operatingSystem/operatingSystem/domain/OperatingSystemId'
import { OperatingSystemArqId } from '../../operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { ProcessorId } from '../../processor/domain/ProcessorId'
import { ComputerName } from './ComputerName'
import { IPAddress } from './IPAddress'
import { MACAddress } from './MACAddress'

export interface ComputerPrimitives extends DevicePrimitives {
  computerName: Primitives<ComputerName>
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
    categoryId: CategoryId,
    brandId: BrandId,
    employeeId: DeviceEmployee,
    locationId: LocationId,
    observation: DeviceObservation,
    private readonly computerName: ComputerName,
    private readonly processorId: ProcessorId | null,
    private readonly memoryRamCapacity: MemoryRamCapacity,
    private readonly hardDriveCapacityId: HardDriveCapacityId | null,
    private readonly hardDriveTypeId: HardDriveTypeId | null,
    private readonly operatingSystemId: OperatingSystemId | null,
    private readonly operatingSystemArqId: OperatingSystemArqId | null,
    private readonly macAddress: MACAddress | null,
    private readonly ipAddress: IPAddress | null
  ) {
    super(serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation)
  }

  static isComputerCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedComputerCategories: CategoryValues[] = ['Computadoras', 'All in One', 'Laptops', 'Servidores']
    return AcceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create (params: ComputerPrimitives) {
    if (params.hardDriveCapacityId == null) {
      params.hardDriveCapacityId = null
      params.operatingSystemId = null
    }
    if (params.operatingSystemId == null) {
      params.operatingSystemArqId = null
    }

    return new Computer(
      new DeviceSerial(params.serial),
      new DeviceActivo(params.activo),
      new StatusId(params.statusId),
      new ModelId(params.modelId),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new DeviceEmployee(params.employeeId, params.statusId),
      new LocationId(params.locationId),
      new DeviceObservation(params.observation),
      new ComputerName(params.computerName, params.statusId),
      params.processorId != null ? new ProcessorId(params.processorId) : null,
      new MemoryRamCapacity(params.memoryRamCapacity),
      params.hardDriveCapacityId != null ? new HardDriveCapacityId(params.hardDriveCapacityId) : null,
      params.hardDriveTypeId != null ? new HardDriveTypeId(params.hardDriveTypeId) : null,
      params.operatingSystemId != null ? new OperatingSystemId(params.operatingSystemId) : null,
      params.operatingSystemArqId != null ? new OperatingSystemArqId(params.operatingSystemArqId) : null,
      new MACAddress(params.macAddress),
      new IPAddress(params.ipAddress)
    )
  }

  toPrimitives (): ComputerPrimitives {
    return {
      serial: this.serialValue(),
      activo: this.activoValue(),
      statusId: this.statusValue(),
      modelId: this.modelValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue(),
      employeeId: this.employeeValue(),
      locationId: this.locationValue(),
      observation: this.observationValue(),
      computerName: this.computerName.value,
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
