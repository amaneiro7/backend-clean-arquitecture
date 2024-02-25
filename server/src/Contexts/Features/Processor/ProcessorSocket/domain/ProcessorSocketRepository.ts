import { type ProcessorSocketPrimitives } from './ProcessorSocket'

export abstract class ProcessorSocketRepository {
  abstract searchAll (): Promise<ProcessorSocketPrimitives[]>

  abstract searchById (id: number): Promise<ProcessorSocketPrimitives | null>
}
