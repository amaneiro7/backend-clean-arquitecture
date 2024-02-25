import { type Repository } from '../../../../Shared/domain/Repository'
import { type ProcessorSocketPrimitives } from '../domain/ProcessorSocket'

export class SearchAllProcessorSocket {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<ProcessorSocketPrimitives[]> {
    return await this.repository.processorSocket.searchAll()
  }
}
