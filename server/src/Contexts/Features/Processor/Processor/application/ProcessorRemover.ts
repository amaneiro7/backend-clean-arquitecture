import { type Repository } from '../../../../Shared/domain/Repository'
import { ProcessorCannotDeleteIsNotEmptyError } from '../domain/ProcessorCannotDeleteIsNotEmptyError'
import { ProcessorDoesNotExistError } from '../domain/ProcessorDoesNotExistError'
import { ProcessorId } from '../domain/ProcessorId'

export class ProcessorRemover {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string }): Promise<void> {
    const { id } = params
    const processorId = new ProcessorId(id)

    const processors = await this.repository.processor.searchAll()
    if (processors.length > 0) {
      throw new ProcessorCannotDeleteIsNotEmptyError()
    }
    const processor = await this.repository.processor.searchById(processorId.value)
    if (processor === null) {
      throw new ProcessorDoesNotExistError(id)
    }

    await this.repository.processor.remove(processorId.value)
  }
}
