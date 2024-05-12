import { Primitives } from "../../../../shared/domain/value-object/Primitives";
import { BrandId } from "../../../brand/domain/BrandId";
import { CategoryDefaultData, CategoryValues } from "../../../category/domain/CategoryDefaultData";
import { CategoryId } from "../../../category/domain/CategoryId";
import { MemoryRamTypeId } from "../../../fetures/memoryRam/memoryRamType/domain/MemoryRamTypeId";
import { Model, ModelPrimitives } from "../../model/domain/Model";
import { ModelName } from "../../model/domain/ModelName";
import { MemoryRamSlotQuantity } from "./MemoryRamQuantity";


export interface ModelComputerPrimitives extends ModelPrimitives {
    memoryRamTypeId: Primitives<MemoryRamTypeId>
    memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>
    hasBluetooth: boolean
    hasWifiAdapter: boolean
    hasDVI: boolean
    hasHDMI: boolean
    hasVGA: boolean
}
export class ModelComputer extends Model {
    constructor(
        name: ModelName,
        categoryId: CategoryId,
        brandId: BrandId,
        private readonly memoryRamTypeId: MemoryRamTypeId,
        private readonly memoryRamSlotQuantity: MemoryRamSlotQuantity,
        private readonly hasBluetooth: boolean,
        private readonly hasWifiAdapter: boolean,
        private readonly hasDVI: boolean,
        private readonly hasHDMI: boolean,
        private readonly hasVGA: boolean
    ) {
        super(name, categoryId, brandId)
        if (!ModelComputer.isComputerCategory({ categoryId: categoryId.value })) {
          throw new Error('No Pertenece a esta categoria')
      }
    }

    static isComputerCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
        const AcceptedComputerCategories: CategoryValues[] = ['Computadoras', 'All in One', 'Servidores']
        return AcceptedComputerCategories.includes(CategoryDefaultData[categoryId])
      }

      public static create(params: ModelComputerPrimitives) {
        return new ModelComputer(
          new ModelName(params.name),
          new CategoryId(params.categoryId),
          new BrandId(params.brandId),
          new MemoryRamTypeId(params.memoryRamTypeId),
          new MemoryRamSlotQuantity(params.memoryRamSlotQuantity),
          params.hasBluetooth,
          params.hasWifiAdapter,
          params.hasDVI,
          params.hasHDMI,
          params.hasVGA
        )
      }

      memoryRamTypeValue (): Primitives<MemoryRamTypeId> {
        return this.memoryRamTypeId.value
      }
      memoryRamQuantityValue (): Primitives<MemoryRamSlotQuantity> {
        return this.memoryRamSlotQuantity.value
      }
      hasBluetoothValue (): boolean {
        return this.hasBluetooth
      }
      hasWifiAdapterValue (): boolean {
        return this.hasWifiAdapter
      }
      hasDVIValue (): boolean {
        return this.hasDVI
      }
      hasHDMIValue (): boolean {
        return this.hasHDMI
      }
      hasVGAValue (): boolean {
        return this.hasVGA
      }

      toPrimitives(): ModelComputerPrimitives {
        return {
          name: this.nameValue(),
          categoryId: this.categoryValue(),
          brandId: this.brandValue(),
          memoryRamTypeId: this.memoryRamTypeValue(),
          memoryRamSlotQuantity: this.memoryRamQuantityValue(),
          hasBluetooth: this.hasBluetoothValue(),
          hasWifiAdapter: this.hasWifiAdapterValue(),
          hasDVI: this.hasDVIValue(),
          hasHDMI: this.hasHDMIValue(),
          hasVGA: this.hasVGAValue()
        }
      }
}