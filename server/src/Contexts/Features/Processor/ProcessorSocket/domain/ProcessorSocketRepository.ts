import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type ProcessorId } from '../../Processor/domain/ProcessorId'
import { type ProcessorSocketPrimitives } from './ProcessorSocket'

export abstract class ProcessorSocketRepository {
  abstract searchAll (): Promise<ProcessorSocketPrimitives[]>

  abstract searchById (id: Primitives<ProcessorId>): Promise<ProcessorSocketPrimitives | null>
}
