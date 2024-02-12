import { type Repository } from '../../../shared/domain/repository'
import { Model, type ModelPrimitives } from '../domain/Model'

export class ModelCreator {
  constructor (readonly repository: Repository) {}

  async create ({ name, categoryId, brandId }: ModelPrimitives): Promise<void> {
    const model = Model.create({ name, categoryId, brandId })
    await this.repository.model.save({ model })
  }
}
