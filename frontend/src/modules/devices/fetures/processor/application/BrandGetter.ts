import { type Repository } from '../../../../shared/domain/repository'
import { type ProcessorPrimitives } from '../domain/Processor'
import { ProcessorId } from '../domain/ProcessorId'

export class ProcessorGetter {
  constructor (readonly repository: Repository) {}
  async getById ({ id }: { id: string }): Promise<ProcessorPrimitives | null> {
    return await this.repository.processor.getById({ id: new ProcessorId(id) }) ?? null
  }
}
