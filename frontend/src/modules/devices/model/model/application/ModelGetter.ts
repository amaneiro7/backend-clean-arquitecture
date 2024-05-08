import { type Repository } from '../../../../shared/domain/repository'
import { type ModelPrimitives } from '../domain/Model'
import { ModelId } from '../domain/ModelId'
import { ModelName } from '../domain/ModelName'

export class ModelGetter {
  constructor (readonly repository: Repository) {}
  async getById ({ id }: { id: string }): Promise<ModelPrimitives | null> {
    return await this.repository.model.getById({ id: new ModelId(id) }) ?? null
  }

  async getByName ({ name }: { name: string }): Promise<ModelPrimitives | null> {
    return await this.repository.model.getByName({ name: new ModelName(name) }) ?? null
  }
}
