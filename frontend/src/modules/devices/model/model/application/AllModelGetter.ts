import { type Repository } from '../../../../shared/domain/repository'
import { type ModelPrimitives } from '../domain/Model'

export class AllModelGetter {
  constructor (private readonly repository: Repository) {}
  async get (): Promise<ModelPrimitives[]> {
    return await this.repository.model.getAll()
  }
}
