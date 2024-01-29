import { type GenericRepository } from '../../../Shared/domain/GenericRepository'
import { type ProcessorPrimitives } from './Processor'

export abstract class ProcessorRepository implements GenericRepository<ProcessorPrimitives> {
  abstract searchAll (): Promise<ProcessorPrimitives[]>

  abstract save (payload: ProcessorPrimitives): Promise<void>

  abstract searchById (id: string): Promise<ProcessorPrimitives | null>

  abstract searchByName (name: string): Promise<ProcessorPrimitives | null>

  abstract remove (id: string): Promise<void>
}
