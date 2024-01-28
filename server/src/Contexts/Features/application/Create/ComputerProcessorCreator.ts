import { type Repository } from '../../../Shared/domain/Repository'
import { ComputerProcessor } from '../../domain/Processor/ComputerProcessor'
import { ComputerProcessorAlreadyExistError } from '../../domain/Processor/ComputerProcessorAlreadyExistError'
import { ComputerProcessorName } from '../../domain/Processor/ComputerProcessorName'

export class ComputerProcessorCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { name: string }): Promise<void> {
    const { name } = params

    const hardDrive = ComputerProcessor.create({ name })
    this.ensureComputerProcessorNameDoesNotExist(name)

    await this.repository.processor.save(hardDrive)
  }

  private ensureComputerProcessorNameDoesNotExist (name: string): void {
    if (this.repository.processor.searchByName(new ComputerProcessorName(name)) !== null) {
      throw new ComputerProcessorAlreadyExistError(name)
    }
  }
}
