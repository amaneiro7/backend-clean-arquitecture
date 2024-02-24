import { type GenericRepository } from '../../../../Shared/domain/GenericRepository'
import { type ComputerModelsPrimitives } from './ComputerModels'

export abstract class ComputerModelsRepository implements GenericRepository<ComputerModelsPrimitives> {
  abstract searchAll (): Promise<ComputerModelsPrimitives[]>

  abstract searchById (id: string): Promise<ComputerModelsPrimitives | null>

  abstract searchByName (name: string): Promise<ComputerModelsPrimitives | null>

  abstract save (payload: ComputerModelsPrimitives): void

  abstract remove (id: string): Promise<void>
}
