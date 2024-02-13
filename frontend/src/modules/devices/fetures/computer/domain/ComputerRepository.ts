import { type ComputerPrimitives } from './Computer'

export abstract class ComputerRepository {
  abstract getAll (): Promise<ComputerPrimitives[]>
}
