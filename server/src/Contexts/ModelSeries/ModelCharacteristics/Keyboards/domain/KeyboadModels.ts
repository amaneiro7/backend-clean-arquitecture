import { BrandId } from '../../../../Brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../../Category/domain/CategoryDefaultData'
import { CategoryId } from '../../../../Category/domain/CategoryId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { InputTypeId } from '../../../InputType/domain/InputTypeId'
import { ModelSeries, type ModelSeriesPrimitives } from '../../../ModelSeries/domain/ModelSeries'
import { ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { ModelSeriesName } from '../../../ModelSeries/domain/ModelSeriesName'

export interface KeyboardModelsPrimitives extends ModelSeriesPrimitives {
  inputTypeId: Primitives<InputTypeId>
}
export class KeyboardModels extends ModelSeries {
  constructor (
    id: ModelSeriesId,
    name: ModelSeriesName,
    categoryId: CategoryId,
    brandId: BrandId,
    private readonly InputTypeId: InputTypeId
  ) {
    super(id, name, categoryId, brandId)
  }

  static create ({
    name,
    categoryId,
    brandId,
    inputTypeId
  }: Omit<KeyboardModelsPrimitives, 'id'>): KeyboardModels {
    const id = String(ModelSeriesId.random())
    return new KeyboardModels(
      new ModelSeriesId(id),
      new ModelSeriesName(name),
      new CategoryId(categoryId),
      new BrandId(brandId),
      new InputTypeId(inputTypeId)
    )
  }

  public static isMonitorCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedMonitorCategories: CategoryValues[] = ['Monitores']
    return AcceptedMonitorCategories.includes(CategoryDefaultData[categoryId])
  }

  static fromPrimitives (primitives: KeyboardModelsPrimitives): KeyboardModels {
    return new KeyboardModels(
      new ModelSeriesId(primitives.id),
      new ModelSeriesName(primitives.name),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new InputTypeId(primitives.inputTypeId)
    )
  }

  toPrimitives (): KeyboardModelsPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      categoryId: this.categoryIdValue,
      brandId: this.brandIdValue,
      inputTypeId: this.inputTypeValue
    }
  }

  get inputTypeValue (): Primitives<InputTypeId> {
    return this.InputTypeId.value
  }
}
