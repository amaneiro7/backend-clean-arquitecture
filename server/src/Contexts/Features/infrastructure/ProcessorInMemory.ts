import { ComputerProcessor } from '../domain/Processor/ComputerProcessor'
import { ComputerProcessorId } from '../domain/Processor/ComputerProcessorId'
import { ComputerProcessorName } from '../domain/Processor/ComputerProcessorName'
import { type ComputerProcessorRepository } from '../domain/Processor/ComputerProcessorRepository'

const processors: ComputerProcessor[] = [
  new ComputerProcessor(
    new ComputerProcessorId('f1e188f8-d686-4d59-8077-ff6defe4e050'),
    new ComputerProcessorName('Intel(R) Core(TM) i3 3220 CPU @ 3.30GHz')
  )
]

export class InMemoryComputerProcessorRepository implements ComputerProcessorRepository {
  async searchAll (): Promise<ComputerProcessor[]> {
    return processors
  }

  async searchById (id: ComputerProcessorId): Promise<ComputerProcessor | null> {
    return processors.find(processor => processor.id === id.toString()) ?? null
  }

  async searchByName (name: ComputerProcessorName): Promise<ComputerProcessor | null> {
    return processors.find(processor => processor.name === name.toString()) ?? null
  }

  async save (payload: ComputerProcessor): Promise<void> {
    const index = processors.findIndex(device => device.id === payload.id)
    if (index === -1) {
      processors.push(payload)
    } else {
      processors[index] = payload
    }
  }

  async remove (id: ComputerProcessorId): Promise<void> {
    processors.filter(processor => processor.id !== id.toString())
  }
}
