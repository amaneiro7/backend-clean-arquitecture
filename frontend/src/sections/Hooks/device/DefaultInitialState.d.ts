import { type HistoryApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type ProcessorId } from '../../../modules/devices/fetures/processor/domain/ProcessorId'
import { type MemoryRamCapacity } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamCapacity'
import { type HardDriveCapacityId } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type HardDriveTypeId } from '../../../modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeId'
import { type OperatingSystemArqId } from '../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { type OperatingSystemId } from '../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystemId'
import { type MACAddress } from '../../../modules/devices/fetures/computer/domain/MACAddress'
import { type IPAddress } from '../../../modules/devices/fetures/computer/domain/IPAddress'
import { type HardDriveHealth } from '../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'
import { type EmployeeId } from '../../../modules/employee/employee/domain/EmployeeId'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { type DeviceObservation } from '../../../modules/devices/devices/devices/domain/DeviceObservation'
import { type ComputerName } from '../../../modules/devices/fetures/computer/domain/ComputerName'
import { type DeviceId } from '../../../modules/devices/devices/devices/domain/DeviceId'
import { type MemoryRamValues } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'
import { type MemoryRamSlotQuantity } from '../../../modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity'
import { type MemoryRamTypeName } from '../../../modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamTypeName'
import { type DeviceStockNumber } from '../../../modules/devices/devices/devices/domain/DeviceStockNumber'

export interface DefaultProps {
    id?: Primitives<DeviceId>
    serial: Primitives<DeviceSerial>
    activo: Primitives<DeviceActivo>
    statusId: Primitives<StatusId>
    modelId: Primitives<ModelId>
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    employeeId: Primitives<EmployeeId>
    locationId: Primitives<LocationId>
    observation: Primitives<DeviceObservation>
    stockNumber: Primitives<DeviceStockNumber>
    computerName?: Primitives<ComputerName>
    processorId?: Primitives<ProcessorId>
    memoryRamCapacity?: Primitives<MemoryRamCapacity>
    hardDriveCapacityId?: Primitives<HardDriveCapacityId>
    hardDriveTypeId?: Primitives<HardDriveTypeId>
    operatingSystemArqId?: Primitives<OperatingSystemArqId>
    operatingSystemId?: Primitives<OperatingSystemId>
    macAddress?: Primitives<MACAddress>
    ipAddress?: Primitives<IPAddress>
    health?: Primitives<HardDriveHealth>
    memoryRam?: Primitives<MemoryRamValues>[]
    memoryRamSlotQuantity?: Primitives<MemoryRamSlotQuantity>
    memoryRamType?: Primitives<MemoryRamTypeName>
    history: HistoryApiResponse[]
    updatedAt?: string
}