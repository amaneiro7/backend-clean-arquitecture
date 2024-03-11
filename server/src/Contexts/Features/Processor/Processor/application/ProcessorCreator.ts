import { type Repository } from '../../../../Shared/domain/Repository'
import { Processor, type ProcessorPrimitives } from '../domain/Processor'
import { ProcessorAlreadyExistError } from '../domain/ProcessorAlreadyExistError'
import { ProcessorNumberModel } from '../domain/ProcessorNumberModel'

export interface ProcessorParams extends Omit<ProcessorPrimitives, 'id' | 'name'> {}
export class ProcessorCreator {
  constructor (private readonly repository: Repository) {}

  async run ({ productCollection, numberModel, cores, threads, frequency }: ProcessorParams): Promise<void> {
    const processor = Processor.create({ productCollection, numberModel, cores, threads, frequency })
    await this.ensureProcessorNameDoesNotExist(numberModel)

    await this.repository.processor.save(processor.toPrimitive())
  }

  private async ensureProcessorNameDoesNotExist (numberModel: string): Promise<void> {
    if (await this.repository.processor.searchByNumberModel(new ProcessorNumberModel(numberModel).value) !== null) {
      throw new ProcessorAlreadyExistError(numberModel)
    }
  }
}
