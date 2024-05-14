import { BrandId } from '../../../../Brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../../Category/domain/CategoryDefaultData'
import { CategoryId } from '../../../../Category/domain/CategoryId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { InputTypeId } from '../../../InputType/domain/InputTypeId'
import { ModelSeries, type ModelSeriesPrimitives } from '../../../ModelSeries/domain/ModelSeries'
import { ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { ModelSeriesName } from '../../../ModelSeries/domain/ModelSeriesName'
import { HasFingerPrintReader } from './HasFingerPrintReader'

export interface KeyboardModelsPrimitives extends ModelSeriesPrimitives {
  inputTypeId: Primitives<InputTypeId>
  hasFingerPrintReader: Primitives<HasFingerPrintReader>
}
export class KeyboardModels extends ModelSeries {
  constructor (
    id: ModelSeriesId,
    name: ModelSeriesName,
    categoryId: CategoryId,
    brandId: BrandId,
    private readonly InputTypeId: InputTypeId,
    private readonly hasFingerPrintReader: HasFingerPrintReader
  ) {
    super(id, name, categoryId, brandId)
  }

  static create (params: Omit<KeyboardModelsPrimitives, 'id'>): KeyboardModels {
    const id = String(ModelSeriesId.random())
    return new KeyboardModels(
      new ModelSeriesId(id),
      new ModelSeriesName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new InputTypeId(params.inputTypeId),
      new HasFingerPrintReader(params.hasFingerPrintReader)
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
      new InputTypeId(primitives.inputTypeId),
      new HasFingerPrintReader(primitives.hasFingerPrintReader),
    )
  }

  toPrimitives (): KeyboardModelsPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      categoryId: this.categoryIdValue,
      brandId: this.brandIdValue,
      inputTypeId: this.inputTypeValue,
      hasFingerPrintReader: this.hasFingerPrintReaderValue
    }
  }

  get inputTypeValue (): Primitives<InputTypeId> {
    return this.InputTypeId.value
  }
  get hasFingerPrintReaderValue (): Primitives<HasFingerPrintReader> {
    return this.hasFingerPrintReader.value
  }
}
