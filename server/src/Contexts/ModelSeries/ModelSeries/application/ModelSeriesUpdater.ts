import { BrandDoesNotExistError } from '../../../Brand/domain/BrandDoesNotExistError'
import { BrandId } from '../../../Brand/domain/BrandId'
import { CategoryDoesNotExistError } from '../../../Category/domain/CategoryDoesNotExistError'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { ModelSeriesAlreadyExistError } from '../domain/ModelSeriesAlreadyExistError'
import { ModelSeriesDoesNotExistError } from '../domain/ModelSeriesDoesNotExistError'
import { ModelSeriesId } from '../domain/ModelSeriesId'
import { ModelSeriesName } from '../domain/ModelSeriesName'
import { type Repository } from '../../../Shared/domain/Repository'
import { ModelSeries } from '../domain/ModelSeries'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { ModelParams } from './ModelSeriesCreator'
import { KeyboardModels, KeyboardModelsPrimitives } from '../../ModelCharacteristics/Keyboards/domain/KeyboadModels'
import { ModelApiresponse } from '../../../Device/Device/infrastructure/sequelize/DeviceResponse'
import { ModelSeriesCategory } from '../domain/ModelSeriesCategory'
import { ModelSeriesBrand } from '../domain/ModelSeriesBrand'
import { ModelKeyboardInputType } from '../../ModelCharacteristics/Keyboards/domain/ModelKeyboardInputType'
import { HasFingerPrintReader } from '../../ModelCharacteristics/Keyboards/domain/HasFingerPrintReader'

export class ModelSeriesUpdater {
  constructor(private readonly repository: Repository) { }

  async run({ id, params }: { id: Primitives<ModelSeriesId>, params: ModelParams }): Promise<void> {
    const { categoryId } = params

    const modelSeriesId = new ModelSeriesId(id).value

    const modelSeries = await this.repository.modelSeries.searchById(modelSeriesId)

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(id)
    }

    let modelEntity
    if (KeyboardModels.isKeyboardCategory({ categoryId })) {
      const { modelKeyboard } = modelSeries as unknown as ModelApiresponse
      modelEntity = KeyboardModels.fromPrimitives({
        id: modelSeries.id,
        name: modelSeries.name,
        categoryId: modelSeries.categoryId,
        brandId: modelSeries.brandId,
        inputTypeId: modelKeyboard?.inputTypeId,
        hasFingerPrintReader: modelKeyboard?.hasFingerPrintReader,
      })
      const keyboardParams = params as KeyboardModelsPrimitives
      await ModelKeyboardInputType.updateInputTypeField({ repository: this.repository.inputType, inputTypeId: keyboardParams.inputTypeId, entity: modelEntity })
      await HasFingerPrintReader.updateFingerprintField({ hasFingerPrintReader: keyboardParams.hasFingerPrintReader, entity: modelEntity })
    }
    else {
      modelEntity = ModelSeries.fromPrimitives(modelSeries)
    }
    await this.updateMainModel({ params, entity: modelEntity })
    await this.repository.modelSeries.save(modelEntity.toPrimitives())
  }

  private async updateMainModel({ params, entity }: { params: ModelParams, entity: ModelSeries }): Promise<void> {
    await ModelSeriesCategory.updateCategoryField({ repository: this.repository.category, categoryId: params.categoryId, entity })
    await ModelSeriesBrand.updateBrandField({ repository: this.repository.brand, brandId: params.brandId, entity })
    await ModelSeriesName.updateNameField({ repository: this.repository.modelSeries, name: params.name, entity })

  }
}
