import { API_URL } from '../../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../../shared/infraestructure/errorMessage'
import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type ProcessorPrimitives, type Processor } from '../domain/Processor'
import { type ProcessorId } from '../domain/ProcessorId'
import { type ProcessorName } from '../domain/ProcessorName'
import { type ProcessorRepository } from '../domain/ProcessorRepository'

export class ApiProcessorRepository implements ProcessorRepository {
  private readonly endpoint: string = 'processors'
  async save ({ processor }: { processor: Processor }): Promise<void> {
    await makeRequest({ method: 'POST', endpoint: this.endpoint, data: processor.toPrimitives() })
    
  }

  async update ({ id, processor }: { id: ProcessorId, processor: Processor }): Promise<void> {
    try {
      const processorPrimitives = processor.toPrimitives()
      const res = await fetch(`${API_URL}/processors/${id.value}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: processorPrimitives.name
        })
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
    } catch (error) {
      throw new Error(errorApiMessage)
    }
  }

  async getAll (): Promise<ProcessorPrimitives[]> {
    return await fetch(`${API_URL}/processors`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<ProcessorPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }

  async getById ({ id }: { id: ProcessorId }): Promise<ProcessorPrimitives | null> {
    return await fetch(`${API_URL}/processors/${id.value}`).then(
      async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<ProcessorPrimitives | null>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }

  async getByName ({ name }: { name: ProcessorName }): Promise<ProcessorPrimitives | null> {
    return await fetch(`${API_URL}/processors/name/${name.value}`).then(
      async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<ProcessorPrimitives | null>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
