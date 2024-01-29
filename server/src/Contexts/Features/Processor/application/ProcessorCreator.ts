import { type Repository } from '../../../Shared/domain/Repository'
import { Processor } from '../domain/Processor'
import { ComputerProcessorAlreadyExistError } from '../domain/ProcessorAlreadyExistError'
import { ProcessorName } from '../domain/ProcessorName'

export class ProcessorCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { name: string }): Promise<void> {
    const { name } = params

    const processor = Processor.create({ name })
    this.ensureProcessorNameDoesNotExist(name)

    await this.repository.processor.save(processor.toPrimitive())
  }

  private ensureProcessorNameDoesNotExist (name: string): void {
    if (this.repository.processor.searchByName(new ProcessorName(name).value) !== null) {
      throw new ComputerProcessorAlreadyExistError(name)
    }
  }
}
