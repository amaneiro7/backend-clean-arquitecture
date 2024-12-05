import { BrandId } from '../../../../Brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../../Category/SubCategory/domain/CategoryDefaultData'
import { CategoryId } from '../../../../Category/SubCategory/domain/CategoryId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { Generic } from '../../../ModelSeries/domain/Generic'
import { ModelSeries, type ModelSeriesPrimitives } from '../../../ModelSeries/domain/ModelSeries'
import { ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { ModelSeriesName } from '../../../ModelSeries/domain/ModelSeriesName'
import { HasFingerPrintReader } from './HasFingerPrintReader'
import { ModelKeyboardInputType } from './ModelKeyboardInputType'

export interface KeyboardModelsPrimitives extends ModelSeriesPrimitives {
  inputTypeId: Primitives<ModelKeyboardInputType>
  hasFingerPrintReader: Primitives<HasFingerPrintReader>
}
export class KeyboardModels extends ModelSeries {
  constructor(
    id: ModelSeriesId,
    name: ModelSeriesName,
    categoryId: CategoryId,
    brandId: BrandId,
    generic: Generic,
    private InputTypeId: ModelKeyboardInputType,
    private hasFingerPrintReader: HasFingerPrintReader
  ) {
    super(id, name, categoryId, brandId, generic)
  }

  static create(params: Omit<KeyboardModelsPrimitives, 'id'>): KeyboardModels {
    const id = String(ModelSeriesId.random())
    return new KeyboardModels(
      new ModelSeriesId(id),
      new ModelSeriesName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new Generic(params.generic),
      new ModelKeyboardInputType(params.inputTypeId),
      new HasFingerPrintReader(params.hasFingerPrintReader)
    )
  }

  public static isKeyboardCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedKeyboardCategories: CategoryValues[] = ['Teclados']
    return AcceptedKeyboardCategories.includes(CategoryDefaultData[categoryId])
  }

  static fromPrimitives(primitives: KeyboardModelsPrimitives): KeyboardModels {
    return new KeyboardModels(
      new ModelSeriesId(primitives.id),
      new ModelSeriesName(primitives.name),
      new CategoryId(primitives.categoryId),
      new BrandId(primitives.brandId),
      new Generic(primitives.generic),
      new ModelKeyboardInputType(primitives.inputTypeId),
      new HasFingerPrintReader(primitives.hasFingerPrintReader),
    )
  }

  toPrimitives(): KeyboardModelsPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      categoryId: this.categoryIdValue,
      brandId: this.brandIdValue,
      generic: this.genericValue,
      inputTypeId: this.inputTypeValue,
      hasFingerPrintReader: this.hasFingerPrintReaderValue
    }
  }

  get inputTypeValue(): Primitives<ModelKeyboardInputType> {
    return this.InputTypeId.value
  }
  get hasFingerPrintReaderValue(): Primitives<HasFingerPrintReader> {
    return this.hasFingerPrintReader.value
  }

  updateHasFingerPrintReader(newValue: Primitives<HasFingerPrintReader>): void {
    this.hasFingerPrintReader = new HasFingerPrintReader(newValue)
  }
  updateInputType(newValue: Primitives<ModelKeyboardInputType>): void {
    this.InputTypeId = new ModelKeyboardInputType(newValue)
  }
}
