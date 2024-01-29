import { type Repository } from '../../../Shared/domain/Repository'
import { type ProcessorPrimitives } from '../domain/Processor'

export class SearchAllProcessors {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<ProcessorPrimitives[]> {
    return await this.repository.processor.searchAll()
  }
}
