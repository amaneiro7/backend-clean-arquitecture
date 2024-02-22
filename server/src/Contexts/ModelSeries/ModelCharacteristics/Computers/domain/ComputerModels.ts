import { type BrandId } from '../../../../Brand/domain/BrandId'
import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { type MemoryRamType } from '../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamType'
import { ModelSeries, type ModelSeriesPrimitives } from '../../../ModelSeries/domain/ModelSeries'
import { type ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { type ModelSeriesName } from '../../../ModelSeries/domain/ModelSeriesName'
import { HasBluetooth } from './HasBluetooth'
import { HasWifiAdapter } from './HasWifiAdapter'

export interface ComputerModelsPrimitives extends ModelSeriesPrimitives {
  processorSocket: string
  memoryRamType: string
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
    private readonly processorSocket: string,
    private readonly memoryRamType: MemoryRamType,
    private readonly memoryRamSlotQuantity: number,
    private readonly hasBluetooth: HasBluetooth,
    private readonly hasWifiAdapter: HasWifiAdapter,
    private readonly hasDVI: boolean,
    private readonly hasHDMI: boolean,
    private readonly hasVGA: boolean
  ) {
    super(id, name, categoryId, brandId)
  }

  static fromPrimitives (primitives: ComputerModelsPrimitives): ComputerModels {
    return new ComputerModels(
      new ModelSeriesId(primitives.id),
      new ModelSeriesName(primitives.name),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new HasBluetooth(primitives.hasBluetooth),
      new HasWifiAdapter(primitives.hasWifiAdapter)

    )
  }

  toPrimitives (): ModelSeriesPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      categoryId: this.categoryIdValue,
      brandId: this.brandIdValue
    }
  }

  get ProcessorSocketValue (): string {
    return this.processorSocket
  }

  get memoryRamTypeValue (): string {
    return this.memoryRamType
  }

  get memoryRamSlotQuantityValue (): number {
    return this.memoryRamSlotQuantity
  }

  get hasBluetoothValue (): boolean {
    return this.hasBluetooth
  }

  get hasWifiAdapterValue (): boolean {
    return this.hasWifiAdapter
  }

  get hasDVIValue (): boolean {
    return this.hasDVI
  }

  get hasHDMIValue (): boolean {
    return this.hasHDMI
  }

  get hasVGAValue (): boolean {
    return this.hasVGA
  }
}
