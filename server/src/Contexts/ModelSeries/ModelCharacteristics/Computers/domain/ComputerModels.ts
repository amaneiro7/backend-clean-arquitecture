import { BrandId } from '../../../../Brand/domain/BrandId'
import { CategoryId } from '../../../../Category/domain/CategoryId'
import { MemoryRamTypeId } from '../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamTypeId'
import { ProcessorSocketId } from '../../../../Features/Processor/ProcessorSocket/domain/ProcessorSocketId'
import { ModelSeries, type ModelSeriesPrimitives } from '../../../ModelSeries/domain/ModelSeries'
import { ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { ModelSeriesName } from '../../../ModelSeries/domain/ModelSeriesName'
import { HasBluetooth } from './HasBluetooth'
import { HasDVI } from './HasDVI'
import { HasHDMI } from './HasHDMI'
import { HasVGA } from './HasVGA'
import { HasWifiAdapter } from './HasWifiAdapter'
import { MemoryRamSlotQuantity } from './MemoryRamSlotQuantity'

export interface ComputerModelsPrimitives extends ModelSeriesPrimitives {
  processorSocketId: number
  memoryRamTypeId: number
  memoryRamSlotQuantity: number
  hasBluetooth: boolean
  hasWifiAdapter: boolean
  hasDVI: boolean
  hasHDMI: boolean
  hasVGA: boolean
}

export class ComputerModels extends ModelSeries {
  constructor (
    id: ModelSeriesId,
    name: ModelSeriesName,
    categoryId: CategoryId,
    brandId: BrandId,
    private readonly processorSocketId: ProcessorSocketId,
    private readonly memoryRamTypeId: MemoryRamTypeId,
    private readonly memoryRamSlotQuantity: MemoryRamSlotQuantity,
    private readonly hasBluetooth: HasBluetooth,
    private readonly hasWifiAdapter: HasWifiAdapter,
    private readonly hasDVI: HasDVI,
    private readonly hasHDMI: HasHDMI,
    private readonly hasVGA: HasVGA
  ) {
    super(id, name, categoryId, brandId)
  }

  static create ({
    name,
    categoryId,
    brandId,
    processorSocketId,
    memoryRamTypeId,
    memoryRamSlotQuantity,
    hasBluetooth,
    hasWifiAdapter,
    hasDVI,
    hasHDMI,
    hasVGA
  }: Omit<ComputerModelsPrimitives, 'id'>): ComputerModels {
    const id = String(ModelSeriesId.random())
    return new ComputerModels(
      new ModelSeriesId(id),
      new ModelSeriesName(name),
      new CategoryId(categoryId),
      new BrandId(brandId),
      new ProcessorSocketId(processorSocketId),
      new MemoryRamTypeId(memoryRamTypeId),
      new MemoryRamSlotQuantity(memoryRamSlotQuantity),
      new HasBluetooth(hasBluetooth),
      new HasWifiAdapter(hasWifiAdapter),
      new HasDVI(hasDVI),
      new HasHDMI(hasHDMI),
      new HasVGA(hasVGA)
    )
  }

  static fromPrimitives (primitives: ComputerModelsPrimitives): ComputerModels {
    return new ComputerModels(
      new ModelSeriesId(primitives.id),
      new ModelSeriesName(primitives.name),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new ProcessorSocketId(primitives.processorSocketId),
      new MemoryRamTypeId(primitives.memoryRamTypeId),
      new MemoryRamSlotQuantity(primitives.memoryRamSlotQuantity),
      new HasBluetooth(primitives.hasBluetooth),
      new HasWifiAdapter(primitives.hasWifiAdapter),
      new HasDVI(primitives.hasDVI),
      new HasHDMI(primitives.hasHDMI),
      new HasVGA(primitives.hasVGA)
    )
  }

  toPrimitives (): ComputerModelsPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      categoryId: this.categoryIdValue,
      brandId: this.brandIdValue,
      processorSocketId: this.ProcessorSocketValue,
      memoryRamTypeId: this.memoryRamTypeValue,
      memoryRamSlotQuantity: this.memoryRamSlotQuantityValue,
      hasBluetooth: this.hasBluetoothValue,
      hasWifiAdapter: this.hasWifiAdapterValue,
      hasDVI: this.hasDVIValue,
      hasHDMI: this.hasHDMIValue,
      hasVGA: this.hasVGAValue
    }
  }

  get ProcessorSocketValue (): number {
    return this.processorSocketId.value
  }

  get memoryRamTypeValue (): number {
    return this.memoryRamTypeId.value
  }

  get memoryRamSlotQuantityValue (): number {
    return this.memoryRamSlotQuantity.value
  }

  get hasBluetoothValue (): boolean {
    return this.hasBluetooth.value
  }

  get hasWifiAdapterValue (): boolean {
    return this.hasWifiAdapter.value
  }

  get hasDVIValue (): boolean {
    return this.hasDVI.value
  }

  get hasHDMIValue (): boolean {
    return this.hasHDMI.value
  }

  get hasVGAValue (): boolean {
    return this.hasVGA.value
  }
}
