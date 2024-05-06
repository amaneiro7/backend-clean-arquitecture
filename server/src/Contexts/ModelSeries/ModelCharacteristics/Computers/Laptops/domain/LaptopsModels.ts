import { BrandId } from '../../../../../Brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../../../Category/domain/CategoryDefaultData'
import { CategoryId } from '../../../../../Category/domain/CategoryId'
import { MemoryRamTypeId } from '../../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamTypeId'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { ModelSeriesId } from '../../../../ModelSeries/domain/ModelSeriesId'
import { ModelSeriesName } from '../../../../ModelSeries/domain/ModelSeriesName'
import { ComputerModels, type ComputerModelsPrimitives } from '../../Computer/domain/ComputerModels'
import { HasBluetooth } from '../../Computer/domain/HasBluetooth'
import { HasDVI } from '../../Computer/domain/HasDVI'
import { HasHDMI } from '../../Computer/domain/HasHDMI'
import { HasVGA } from '../../Computer/domain/HasVGA'
import { HasWifiAdapter } from '../../Computer/domain/HasWifiAdapter'
import { MemoryRamSlotQuantity } from '../../Computer/domain/MemoryRamSlotQuantity'
import { BatterModelName } from './BatteryModelName'

export interface LaptopsModelsPrimitives extends ComputerModelsPrimitives {
  batteryModel: Primitives<BatterModelName>
}

export class LaptopsModels extends ComputerModels {
  constructor (
    id: ModelSeriesId,
    name: ModelSeriesName,
    categoryId: CategoryId,
    brandId: BrandId,
    memoryRamTypeId: MemoryRamTypeId,
    memoryRamSlotQuantity: MemoryRamSlotQuantity,
    hasBluetooth: HasBluetooth,
    hasWifiAdapter: HasWifiAdapter,
    hasDVI: HasDVI,
    hasHDMI: HasHDMI,
    hasVGA: HasVGA,
    readonly batteryModel: BatterModelName

  ) {
    super(id, name, categoryId, brandId,  memoryRamTypeId, memoryRamSlotQuantity, hasBluetooth, hasWifiAdapter, hasDVI, hasHDMI, hasVGA)
  }

  static create ({
    name,
    categoryId,
    brandId,
    memoryRamTypeId,
    memoryRamSlotQuantity,
    hasBluetooth,
    hasWifiAdapter,
    hasDVI,
    hasHDMI,
    hasVGA,
    batteryModel
  }: Omit<LaptopsModelsPrimitives, 'id'>): LaptopsModels {
    const id = String(ModelSeriesId.random())
    return new LaptopsModels(
      new ModelSeriesId(id),
      new ModelSeriesName(name),
      new CategoryId(categoryId),
      new BrandId(brandId),
      new MemoryRamTypeId(memoryRamTypeId),
      new MemoryRamSlotQuantity(memoryRamSlotQuantity),
      new HasBluetooth(hasBluetooth),
      new HasWifiAdapter(hasWifiAdapter),
      new HasDVI(hasDVI),
      new HasHDMI(hasHDMI),
      new HasVGA(hasVGA),
      new BatterModelName(batteryModel)
    )
  }

  public static isLaptopCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedComputerCategories: CategoryValues[] = ['Laptops']
    return AcceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  static fromPrimitives (primitives: LaptopsModelsPrimitives): LaptopsModels {
    return new LaptopsModels(
      new ModelSeriesId(primitives.id),
      new ModelSeriesName(primitives.name),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new MemoryRamTypeId(primitives.memoryRamTypeId),
      new MemoryRamSlotQuantity(primitives.memoryRamSlotQuantity),
      new HasBluetooth(primitives.hasBluetooth),
      new HasWifiAdapter(primitives.hasWifiAdapter),
      new HasDVI(primitives.hasDVI),
      new HasHDMI(primitives.hasHDMI),
      new HasVGA(primitives.hasVGA),
      new BatterModelName(primitives.batteryModel)
    )
  }

  toPrimitives (): LaptopsModelsPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      categoryId: this.categoryIdValue,
      brandId: this.brandIdValue,
      memoryRamTypeId: this.memoryRamTypeValue,
      memoryRamSlotQuantity: this.memoryRamSlotQuantityValue,
      hasBluetooth: this.hasBluetoothValue,
      hasWifiAdapter: this.hasWifiAdapterValue,
      hasDVI: this.hasDVIValue,
      hasHDMI: this.hasHDMIValue,
      hasVGA: this.hasVGAValue,
      batteryModel: this.BatteryModelValue
    }
  }

  get BatteryModelValue (): Primitives<BatterModelName> {
    return this.batteryModel.value
  }
}
