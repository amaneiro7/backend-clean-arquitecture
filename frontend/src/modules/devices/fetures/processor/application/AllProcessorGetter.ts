import { type Repository } from '../../../../shared/domain/repository'
import { type ProcessorPrimitives } from '../domain/Processor'

export class AllProcessorGetter {
  constructor (private readonly repository: Repository) {}
  async get (): Promise<ProcessorPrimitives[]> {
    return await this.repository.processor.getAll()
  }
}
