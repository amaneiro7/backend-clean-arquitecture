import { type Repository } from '../../../Shared/domain/Repository'
import { Processor } from '../domain/Processor'
import { ProcessorAlreadyExistError } from '../domain/ProcessorAlreadyExistError'
import { ProcessorName } from '../domain/ProcessorName'

export class ProcessorCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { name: string }): Promise<void> {
    const { name } = params

    const processor = Processor.create({ name })
    await this.ensureProcessorNameDoesNotExist(name)

    await this.repository.processor.save(processor.toPrimitive())
  }

  private async ensureProcessorNameDoesNotExist (name: string): Promise<void> {
    if (await this.repository.processor.searchByName(new ProcessorName(name).value) !== null) {
      throw new ProcessorAlreadyExistError(name)
    }
  }
}
