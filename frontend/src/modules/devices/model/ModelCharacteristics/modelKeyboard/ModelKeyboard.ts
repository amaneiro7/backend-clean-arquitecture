import { Primitives } from "../../../../shared/domain/value-object/Primitives"
import { BrandId } from "../../../brand/domain/BrandId"
import { CategoryDefaultData, CategoryValues } from "../../../category/domain/CategoryDefaultData"
import { CategoryId } from "../../../category/domain/CategoryId"
import { InputTypeId } from "../../InputType/domain/InputTypeId"
import { Model, ModelPrimitives } from "../../model/domain/Model"
import { ModelName } from "../../model/domain/ModelName"
import { HasFingerPrinteReader } from "./HasFingerPrintReader"


export interface ModelKeyboardPrimitives extends ModelPrimitives {    
    inputType: Primitives<InputTypeId>
    hasFingerPrinteReader: Primitives<HasFingerPrinteReader>
}
export class ModelKeyboard extends Model {
    constructor(
        name: ModelName,
        categoryId: CategoryId,
        brandId: BrandId,
        private readonly inputTypeId: InputTypeId,
        private readonly hasFingerPrinteReader: HasFingerPrinteReader
    ) {
        super(name, categoryId, brandId)
      }
      
      static isKeyboardCategory ({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
        const AcceptedCategories: CategoryValues[] = ['Teclados']
        return AcceptedCategories.includes(CategoryDefaultData[categoryId])
      }
      
      public static create(params: ModelKeyboardPrimitives) {
        if (!ModelKeyboard.isKeyboardCategory({ categoryId: params.categoryId })) {
          throw new Error('No Pertenece a esta categoria, solo se permite Impresoras Laser e Impresoras de Tinta')
      }
        return new ModelKeyboard(
          new ModelName(params.name),
          new CategoryId(params.categoryId),
          new BrandId(params.brandId),
          new InputTypeId(params.inputType),
          new HasFingerPrinteReader(params.hasFingerPrinteReader)
        )
      }

      inputTypeIdValue (): Primitives<InputTypeId> {
        return this.inputTypeId.value
      }

      fingerPrinteReaderValue (): Primitives<HasFingerPrinteReader> {
        return this.hasFingerPrinteReader.value
      }

      toPrimitives(): ModelKeyboardPrimitives {
        return {
          name: this.nameValue(),
          categoryId: this.categoryValue(),
          brandId: this.brandValue(),
          inputType: this.inputTypeIdValue(),
          hasFingerPrinteReader: this.fingerPrinteReaderValue()
        }
      }
}