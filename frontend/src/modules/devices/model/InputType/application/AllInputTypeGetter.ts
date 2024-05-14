import { Repository } from '../../../../shared/domain/repository'
import { type InputTypePrimitives } from '../domain/InputType'

export class AllInputTypeGetter {
  constructor (readonly repository: Repository) {}

  async get (): Promise<InputTypePrimitives[]> {
    return await this.repository.inputType.getAll()
  }
}
