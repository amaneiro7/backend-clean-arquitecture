import { type Repository } from '../../../shared/domain/repository'
import { Model } from '../domain/Model'

export class ModelCreator {
  constructor (readonly repository: Repository) {}

  async create ({ id, name, categoryId, brandId }: { id: string, name: string, categoryId: number, brandId: string }): Promise<void> {
    const model = Model.create({ id, name, categoryId, brandId })
    await this.repository.model.save({ model })
  }
}
