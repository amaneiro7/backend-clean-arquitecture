import { type Repository } from '../../../../shared/domain/repository'
import { ModelComputer, ModelComputerPrimitives } from '../../ModelCharacteristics/modelComputer/ModelComputer'
import { ModelLaptop, ModelLaptopPrimitives } from '../../ModelCharacteristics/modelLaptop/modelLaptop'
import { Model, type ModelPrimitives } from '../domain/Model'
import { ModelId } from '../domain/ModelId'

export class ModelCreator {
  constructor (readonly repository: Repository) {}

  async create (params: ModelPrimitives): Promise<void> {
    let model: Model | ModelComputer | ModelLaptop
    if (ModelComputer.isComputerCategory({ categoryId: params.categoryId })) {
      model = ModelComputer.create(params as ModelComputerPrimitives)
    } else if (ModelLaptop.isLaptopCategory({ categoryId: params.categoryId })) {
      model = ModelLaptop.create(params as ModelLaptopPrimitives)
    } else {
      model = Model.create(params)
    }

    if (params.id === undefined) {
      await this.repository.model.save({ model })
    } else {
      const modelId = new ModelId(params.id)
      await this.repository.model.update({ id: modelId, model })
    }
  }
}
