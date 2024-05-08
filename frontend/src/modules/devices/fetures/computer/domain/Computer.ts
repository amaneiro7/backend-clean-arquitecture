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
import { ModelId } from '../../../model/model/domain/ModelId'
import { MemoryRamCapacity } from '../../memoryRam/memoryRamCapacity/domain/MemoryRamCapacity'
import { ComputerHDDType } from './ComputerHDDtype'
import { ComputerHDDCapacity } from './ComputerHHDCapacity'
import { ComputerName } from './ComputerName'
import { ComputerOs } from './ComputerOS'
import { ComputerOsArq } from './ComputerOSArq'
import { ComputerProcessor } from './ComputerProcessor'
import { IPAddress } from './IPAddress'
import { MACAddress } from './MACAddress'

export interface ComputerPrimitives extends DevicePrimitives {
  computerName: Primitives<ComputerName>
  processorId: Primitives<ComputerProcessor>
  memoryRamCapacity: Primitives<MemoryRamCapacity>
  hardDriveCapacityId: Primitives<ComputerHDDCapacity>
  hardDriveTypeId: Primitives<ComputerHDDType>
  operatingSystemId: Primitives<ComputerOs>
  operatingSystemArqId: Primitives<ComputerOsArq>
  macAddress: Primitives<MACAddress> | null
  ipAddress: Primitives<IPAddress>
}

export class Computer extends Device {
  constructor (
    serial: DeviceSerial,
    activo: DeviceActivo,
    statusId: StatusId,
    categoryId: CategoryId,
    brandId: BrandId,
    modelId: ModelId,
    employeeId: DeviceEmployee,
    locationId: LocationId,
    observation: DeviceObservation,
    private readonly computerName: ComputerName,
    private readonly processorId: ComputerProcessor,
    private readonly memoryRamCapacity: MemoryRamCapacity,
    private readonly hardDriveCapacityId: ComputerHDDCapacity,
    private readonly hardDriveTypeId: ComputerHDDType,
    private readonly operatingSystemId: ComputerOs,
    private readonly operatingSystemArqId: ComputerOsArq,
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
    return new Computer(
      new DeviceSerial(params.serial),
      new DeviceActivo(params.activo),
      new StatusId(params.statusId),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new ModelId(params.modelId),
      new DeviceEmployee(params.employeeId, params.statusId),
      new LocationId(params.locationId),
      new DeviceObservation(params.observation),
      new ComputerName(params.computerName, params.statusId),
      new ComputerProcessor(params.processorId, params.statusId),
      new MemoryRamCapacity(params.memoryRamCapacity, params.statusId),
      new ComputerHDDCapacity(params.hardDriveCapacityId, params.statusId),
      new ComputerHDDType(params.hardDriveTypeId, params.hardDriveCapacityId),
      new ComputerOs(params.operatingSystemId, params.statusId, params.hardDriveCapacityId),
      new ComputerOsArq(params.operatingSystemArqId, params.operatingSystemId),
      new MACAddress(params.macAddress),
      new IPAddress(params.ipAddress, params.statusId)
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
