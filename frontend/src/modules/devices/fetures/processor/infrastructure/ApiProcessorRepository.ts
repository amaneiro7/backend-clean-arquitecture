import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type ProcessorPrimitives, type Processor } from '../domain/Processor'
import { type ProcessorId } from '../domain/ProcessorId'
import { type ProcessorRepository } from '../domain/ProcessorRepository'

export class ApiProcessorRepository implements ProcessorRepository {
  private readonly endpoint: string = 'processors'
  async save({ processor }: { processor: Processor }): Promise<void> {
    await makeRequest({ method: 'POST', endpoint: this.endpoint, data: processor.toPrimitives() })

  }

  async update({ id, processor }: { id: ProcessorId, processor: Processor }): Promise<void> {
    await makeRequest({ method: 'PATCH', endpoint: `${this.endpoint}/${id.value}`, data: processor.toPrimitives() })
  }

  async getAll(): Promise<ProcessorPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })
  }

  async getById({ id }: { id: ProcessorId }): Promise<ProcessorPrimitives | null> {
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })
  }
}
