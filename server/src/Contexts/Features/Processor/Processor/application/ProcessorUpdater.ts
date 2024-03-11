import { type Repository } from '../../../../Shared/domain/Repository'
import { Processor } from '../domain/Processor'
import { ProcessorAlreadyExistError } from '../domain/ProcessorAlreadyExistError'
import { ProcessorDoesNotExistError } from '../domain/ProcessorDoesNotExistError'
import { ProcessorId } from '../domain/ProcessorId'
import { ProcessorNumberModel } from '../domain/ProcessorNumberModel'
import { type ProcessorParams } from './ProcessorCreator'

export interface PartialProcessorParams extends Partial<ProcessorParams> {}

export class ProcessorUpdater {
  constructor (private readonly repository: Repository) {}

  async run ({ id, params }: { id: string, params: PartialProcessorParams }): Promise<void> {
    const { productCollection, numberModel, cores, frequency, threads } = params
    const processorId = new ProcessorId(id)
    const processor = await this.repository.processor.searchById(processorId.value)
    if (processor === null) {
      throw new ProcessorDoesNotExistError(processorId.value)
    }
    const processorEntity = Processor.fromPrimitives(processor)

    if (productCollection !== undefined) {
      processorEntity.updateProductCollection(productCollection)
    }

    if (numberModel !== undefined) {
      await this.ensureprocessorNumberValueDoesNotExist(numberModel)
      processorEntity.updateNumberModel(numberModel)
    }

    if (cores !== undefined) {
      processorEntity.updateCores(cores)
    }

    if (threads !== undefined) {
      processorEntity.updateThreads(threads)
    }

    if (frequency !== undefined) {
      processorEntity.updateFrequency(frequency)
    }

    await this.repository.processor.save(processorEntity.toPrimitive())
  }

  private async ensureprocessorNumberValueDoesNotExist (numberModel: string): Promise<void> {
    if (await this.repository.processor.searchByNumberModel(new ProcessorNumberModel(numberModel).value) !== null) {
      throw new ProcessorAlreadyExistError(numberModel)
    }
  }
}
