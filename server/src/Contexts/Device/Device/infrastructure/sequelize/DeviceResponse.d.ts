import { type BrandPrimitives } from '../../../../Brand/domain/Brand'
import { type BrandId } from '../../../../Brand/domain/BrandId'
import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { type DeviceComputerPrimitives } from '../../../../Features/Computer/domain/Computer'
import { type ComputerHardDriveCapacity } from '../../../../Features/Computer/domain/ComputerHardDriveCapacity'
import { type ComputerHardDriveType } from '../../../../Features/Computer/domain/ComputerHardDriveType'
import { type ComputerMemoryRamCapacity } from '../../../../Features/Computer/domain/ComputerMemoryRamCapacity'
import { type ComputerName } from '../../../../Features/Computer/domain/ComputerName'
import { type ComputerOperatingSystem } from '../../../../Features/Computer/domain/ComputerOperatingSystem'
import { type ComputerOperatingSystemArq } from '../../../../Features/Computer/domain/ComputerOperatingSystemArq'
import { type ComputerProcessor } from '../../../../Features/Computer/domain/ComputerProcessor'
import { type IPAddress } from '../../../../Features/Computer/domain/IPAddress'
import { type MACAddress } from '../../../../Features/Computer/domain/MACAddress'
import { type HardDriveCapacityPrimitives } from '../../../../Features/HardDrive/HardDriveCapacity/domain/HardDriveCapacity'
import { type HardDriveTypePrimitives } from '../../../../Features/HardDrive/HardDriveType/domain/HardDriveType'
import { type MemoryRamTypePrimitives } from '../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamType'
import { type OperatingSystemPrimitives } from '../../../../Features/OperatingSystem/OperatingSystem/domain/OperatingSystem'
import { type OperatingSystemArqPrimitives } from '../../../../Features/OperatingSystem/OperatingSystemArq/domain/OperatingSystemArq'
import { type ProcessorPrimitives } from '../../../../Features/Processor/Processor/domain/Processor'
import { type CityPrimitives } from '../../../../Location/City/domain/City'
import { type LocationPrimitives } from '../../../../Location/Location/domain/Location'
import { type SitePrimitives } from '../../../../Location/Site/domain/Site'
import { type TypeOfSitePrimitives } from '../../../../Location/TypeOfSite/domain/TypeOfSite'
import { type InputTypePrimitives } from '../../../../ModelSeries/InputType/domain/InputType'
import { type ComputerModelsPrimitives } from '../../../../ModelSeries/ModelCharacteristics/Computers/Computer/domain/ComputerModels'
import { type LaptopsModelsPrimitives } from '../../../../ModelSeries/ModelCharacteristics/Computers/Laptops/domain/LaptopsModels'
import { type KeyboardModelsPrimitives } from '../../../../ModelSeries/ModelCharacteristics/Keyboards/domain/KeyboadModels'
import { type MonitorModelsPrimitives } from '../../../../ModelSeries/ModelCharacteristics/Monitors/domain/MonitorModels'
import { type MouseModelsPrimitives } from '../../../../ModelSeries/ModelCharacteristics/Mouses/domain/MouseModels'
import { type ModelPrintersPrimitives } from '../../../../ModelSeries/ModelCharacteristics/Printers/domain/ModelPrinters'
import { type ModelSeriesPrimitives } from '../../../../ModelSeries/ModelSeries/domain/ModelSeries'
import { type ModelSeriesId } from '../../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type StatusPrimitives } from '../../../Status/domain/Status'
import { type DevicePrimitives } from '../../domain/Device'
import { type DeviceActivo } from '../../domain/DeviceActivo'
import { type DeviceEmployee } from '../../domain/DeviceEmployee'
import { type DeviceId } from '../../domain/DeviceId'
import { type DeviceLocation } from '../../domain/DeviceLocation'
import { type DeviceObservation } from '../../domain/DeviceObservation'
import { type DeviceSerial } from '../../domain/DeviceSerial'
import { type DeviceStatus } from '../../domain/DeviceStatus'

export interface DevicesApiResponse extends DevicePrimitives {
  location: LocationApiResponse
  createdAt: Date
  updatedAt: Date
  model: ModelApiresponse
  status: StatusPrimitives
  computer: Computer | null
  hardDrive: HardDrive | null
}

export interface LocationApiResponse extends LocationPrimitives {
  typeOfSite: TypeOfSitePrimitives
  site: SiteApiResponse
}

export interface SiteApiResponse extends SitePrimitives {
  city: CityPrimitives
}

export interface Computer extends DeviceComputerPrimitives {
  id: Primitives<DeviceId>
  categoryId: Primitives<CategoryId>
  deviceId: Primitives<DeviceId>
  createdAt: Date
  updatedAt: Date
  processor: ProcessorPrimitives
  hardDriveCapacity: HardDriveCapacityPrimitives
  hardDriveType: HardDriveTypePrimitives
  operatingSystem: OperatingSystemPrimitives
  operatingSystemArq: OperatingSystemArqPrimitives
}

export interface ModelApiresponse extends ModelSeriesPrimitives {
  createdAt: Date
  updatedAt: Date
  category: Status
  brand: BrandPrimitives
  modelComputer: ModelComputer
  modelLaptop: ModelLaptop
  modelKeyboard: ModelKeyboard
  modelMouse: ModelKeyboard
  modelMonitor: ModelMonitor
  modelPrinter: ModelPrinter
}

export interface ModelComputer extends ComputerModelsPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}
export interface ModelLaptop extends LaptopsModelsPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}

export interface ModelKeyboard extends KeyboardModelsPrimitives {
  inputType: InputTypePrimitives
}
export interface ModelMouse extends MouseModelsPrimitives {
  inputType: InputTypePrimitives
}

export interface ModelMonitor extends MonitorModelsPrimitives { }

export interface ModelPrinter extends ModelPrintersPrimitives { }
