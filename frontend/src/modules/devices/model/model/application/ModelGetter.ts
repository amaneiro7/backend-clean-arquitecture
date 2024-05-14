import { type Repository } from '../../../../shared/domain/repository'
import { type ModelPrimitives } from '../domain/Model'
import { ModelId } from '../domain/ModelId'

export class ModelGetter {
  constructor (readonly repository: Repository) {}
  async getById ({ id }: { id: string }): Promise<ModelPrimitives | null> {
    return await this.repository.model.getById({ id: new ModelId(id) }) ?? null
  }
}
