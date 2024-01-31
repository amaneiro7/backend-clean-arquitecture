import { type Repository } from '../../../Shared/domain/Repository'
import { type ProcessorPrimitives } from '../domain/Processor'
import { ProcessorDoesNotExistError } from '../domain/ProcessorDoesNotExistError'
import { type ProcessorId } from '../domain/ProcessorId'
import { type ProcessorName } from '../domain/ProcessorName'
export class ProcessorsFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (processorId: ProcessorId): Promise<ProcessorPrimitives> {
    const processor = await this.repository.processor.searchById(processorId.value)

    if (processor === null) {
      throw new ProcessorDoesNotExistError(processorId.value)
    }

    return processor
  }

  async searchByName (processorName: ProcessorName): Promise<ProcessorPrimitives> {
    const processor = await this.repository.processor.searchByName(processorName.value)

    if (processor === null) {
      throw new ProcessorDoesNotExistError(processorName.value)
    }

    return processor
  }
}
