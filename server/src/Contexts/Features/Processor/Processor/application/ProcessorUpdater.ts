import { type Repository } from '../../../../Shared/domain/Repository'
import { Processor } from '../domain/Processor'
import { ProcessorAlreadyExistError } from '../domain/ProcessorAlreadyExistError'
import { ProcessorDoesNotExistError } from '../domain/ProcessorDoesNotExistError'
import { ProcessorId } from '../domain/ProcessorId'
import { ProcessorName } from '../domain/ProcessorName'

export class ProcessorUpdater {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string, newName: string }): Promise<void> {
    const { id, newName } = params

    const processor = await this.repository.processor.searchById(new ProcessorId(id).value)
    if (processor === null) {
      throw new ProcessorDoesNotExistError(newName)
    }
    await this.ensureprocessorDoesNotExist(newName)

    const processorEntity = Processor.fromPrimitives(processor)
    processorEntity.updateName(newName)

    await this.repository.processor.save(processorEntity.toPrimitive())
  }

  private async ensureprocessorDoesNotExist (name: string): Promise<void> {
    if (await this.repository.processor.searchByName(new ProcessorName(name).value) !== null) {
      throw new ProcessorAlreadyExistError(name)
    }
  }
}
