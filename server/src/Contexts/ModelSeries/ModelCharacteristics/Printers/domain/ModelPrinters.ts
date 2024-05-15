import { BrandId } from '../../../../Brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../../Category/domain/CategoryDefaultData'
import { CategoryId } from '../../../../Category/domain/CategoryId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { ModelSeries, type ModelSeriesPrimitives } from '../../../ModelSeries/domain/ModelSeries'
import { ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { ModelSeriesName } from '../../../ModelSeries/domain/ModelSeriesName'
import { CartridgeModel } from './CartridgeModel'

export interface ModelPrintersPrimitives extends ModelSeriesPrimitives {
  cartridgeModel: Primitives<CartridgeModel>
}
export class ModelPrinters extends ModelSeries {
  constructor (
    id: ModelSeriesId,
    name: ModelSeriesName,
    categoryId: CategoryId,
    brandId: BrandId,
    private cartridgeModel: CartridgeModel
  ) {
    super(id, name, categoryId, brandId)
  }

  static create (params: Omit<ModelPrintersPrimitives, 'id'>): ModelPrinters {
    if (!this.isPrinterCategory({categoryId: params.categoryId})) {
      throw new Error('Invalid category for printer model The category must be "printer"')
    }
    const id = ModelSeriesId.random().value
    return new ModelPrinters(
      new ModelSeriesId(id),
      new ModelSeriesName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new CartridgeModel(params.cartridgeModel)
    )
  }

  public static isPrinterCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedComputerCategories: CategoryValues[] = ['Impresoras Laser', 'Impresoras Tinta']
    return AcceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  static fromPrimitives (primitives: ModelPrintersPrimitives): ModelPrinters {
    return new ModelPrinters(
      new ModelSeriesId(primitives.id),
      new ModelSeriesName(primitives.name),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new CartridgeModel(primitives.cartridgeModel)
    )
  }

  toPrimitives (): ModelPrintersPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      categoryId: this.categoryIdValue,
      brandId: this.brandIdValue,
      cartridgeModel: this.cartridgeModelValue
    }
  }

  get cartridgeModelValue (): Primitives<CartridgeModel> {
    return this.cartridgeModel.value
  }

  updateCartridgeModel (newValue: Primitives<CartridgeModel>): void {
    this.cartridgeModel = new CartridgeModel(newValue)
  }
}
