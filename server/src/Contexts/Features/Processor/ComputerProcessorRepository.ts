import { type GenericRepository } from '../../Shared/domain/GenericRepository'
import { type ComputerProcessorPrimitives } from './ComputerProcessor'

export abstract class ComputerProcessorRepository implements GenericRepository<ComputerProcessorPrimitives> {
  abstract searchAll (): Promise<ComputerProcessorPrimitives[]>

  abstract save (payload: ComputerProcessorPrimitives): Promise<void>

  abstract searchById (id: string): Promise<ComputerProcessorPrimitives | null>

  abstract searchByName (name: string): Promise<ComputerProcessorPrimitives | null>

  abstract remove (id: string): Promise<void>
}
