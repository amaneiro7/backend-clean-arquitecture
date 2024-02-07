import { API_URL } from '../../../../shared/infraestructure/config'
import { type ProcessorPrimitives, type Processor } from '../domain/Processor'
import { type ProcessorId } from '../domain/ProcessorId'
import { type ProcessorName } from '../domain/ProcessorName'
import { type ProcessorRepository } from '../domain/ProcessorRepository'

export class ApiProcessorRepository implements ProcessorRepository {
  async save ({ processor }: { processor: Processor }): Promise<void> {
    const processorPrimitives = processor.toPrimitives()
    await fetch(`${API_URL}/processors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: processorPrimitives.id,
        name: processorPrimitives.name
      })
    })
  }

  async update ({ id, processor }: { id: ProcessorId, processor: Processor }): Promise<void> {
    const processorPrimitives = processor.toPrimitives()
    await fetch(`${API_URL}/processors/${id.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: processorPrimitives.name
      })
    })
  }

  async getAll (): Promise<ProcessorPrimitives[]> {
    return await fetch(`${API_URL}/processors`).then(async res => await (res.json() as Promise<ProcessorPrimitives[]>))
  }

  async getById ({ id }: { id: ProcessorId }): Promise<ProcessorPrimitives | null> {
    return await fetch(`${API_URL}/processors/${id.value}`).then(
      async res => await (res.json() as Promise<ProcessorPrimitives | null>)
    )
  }

  async getByName ({ name }: { name: ProcessorName }): Promise<ProcessorPrimitives | null> {
    return await fetch(`${API_URL}/processors/name/${name.value}`).then(
      async res => await (res.json() as Promise<ProcessorPrimitives | null>)
    )
  }
}
