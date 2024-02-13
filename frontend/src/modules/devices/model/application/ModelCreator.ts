import { type Repository } from '../../../shared/domain/repository'
import { Model, type ModelPrimitives } from '../domain/Model'
import { ModelId } from '../domain/ModelId'

export class ModelCreator {
  constructor (readonly repository: Repository) {}

  async create ({ id, name, categoryId, brandId }: ModelPrimitives): Promise<void> {
    const model = Model.create({ name, categoryId, brandId })
    if (id === undefined) {
      await this.repository.model.save({ model })
    } else {
      const modelId = new ModelId(id)
      await this.repository.model.update({ id: modelId, model })
    }
  }
}
