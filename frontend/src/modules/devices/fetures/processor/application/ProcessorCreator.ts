import { type Repository } from '../../../../shared/domain/repository'
import { Processor } from '../domain/Processor'

export class ProcessorCreator {
  constructor (readonly repository: Repository) {}

  async create ({ id, name }: { id: string, name: string }): Promise<void> {
    const processor = Processor.create({ id, name })
    await this.repository.processor.save({ processor })
  }
}
