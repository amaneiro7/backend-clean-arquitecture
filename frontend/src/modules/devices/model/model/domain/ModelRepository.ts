import { type ModelPrimitives, type Model } from './Model'
import { type ModelId } from './ModelId'
import { type ModelName } from './ModelName'

export abstract class ModelRepository {
  abstract save ({ model }: { model: Model }): Promise<void>

  abstract update ({ id, model }: { id: ModelId, model: Model }): Promise<void>

  abstract getAll (): Promise<ModelPrimitives[]>

  abstract getById ({ id }: { id: ModelId }): Promise<ModelPrimitives | null>

  abstract getByName ({ name }: { name: ModelName }): Promise<ModelPrimitives | null>
}
