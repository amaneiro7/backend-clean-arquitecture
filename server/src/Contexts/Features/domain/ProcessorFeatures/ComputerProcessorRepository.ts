import { type ComputerProcessor } from './ComputerProcessor'
import { type ComputerProcessorId } from './ComputerProcessorId'
import { type ComputerProcessorName } from './ComputerProcessorName'

export abstract class ComputerProcessorRepository {
  abstract searchAll (): Promise<ComputerProcessor[]>

  abstract save (payload: ComputerProcessor): Promise<void>

  abstract searchById (id: ComputerProcessorId): Promise<ComputerProcessor | null>

  abstract searchByName (id: ComputerProcessorName): Promise<ComputerProcessor | null>

  abstract remove (id: ComputerProcessorId): Promise<void>
}
