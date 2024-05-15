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
import { BatteryModelName } from './BatteryModelName'

export interface LaptopsModelsPrimitives extends ComputerModelsPrimitives {
  batteryModel: Primitives<BatteryModelName>
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
    private batteryModel: BatteryModelName

  ) {
    super(id, name, categoryId, brandId,  memoryRamTypeId, memoryRamSlotQuantity, hasBluetooth, hasWifiAdapter, hasDVI, hasHDMI, hasVGA)
  }

  static create (params: Omit<LaptopsModelsPrimitives, 'id'>): LaptopsModels {
    const id = String(ModelSeriesId.random())
    return new LaptopsModels(
      new ModelSeriesId(id),
      new ModelSeriesName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new MemoryRamTypeId(params.memoryRamTypeId),
      new MemoryRamSlotQuantity(params.memoryRamSlotQuantity),
      new HasBluetooth(params.hasBluetooth),
      new HasWifiAdapter(params.hasWifiAdapter),
      new HasDVI(params.hasDVI),
      new HasHDMI(params.hasHDMI),
      new HasVGA(params.hasVGA),
      new BatteryModelName(params.batteryModel)
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
      new BatteryModelName(primitives.batteryModel)
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
      batteryModel: this.batteryModelValue
    }
  }

  get batteryModelValue (): Primitives<BatteryModelName> {
    return this.batteryModel.value
  }

  updateBatterModel (newValue: Primitives<BatteryModelName>): void {
    this.batteryModel = new BatteryModelName(newValue)
  }
}
