import { type Repository } from '../../../Shared/domain/Repository'
import { type InputTypePrimitives } from '../domain/InputType'

export class SearchAllInputType {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<InputTypePrimitives[]> {
    return await this.repository.inputType.searchAll()
  }
}
