import { type Repository } from '../../../../shared/domain/repository'
import { Processor, type ProcessorPrimitives } from '../domain/Processor'
import { ProcessorId } from '../domain/ProcessorId'

export class ProcessorCreator {
  constructor (readonly repository: Repository) {}

  async create ({ id, productCollection, numberModel, cores, threads, frequency }: ProcessorPrimitives): Promise<void> {
    const processor = Processor.create({ productCollection, numberModel, cores, threads, frequency })

    if (id === undefined) {
      await this.repository.processor.save({ processor })
    } else {
      const processorId = new ProcessorId(id)
      await this.repository.processor.update({ id: processorId, processor })
    }
  }
}
