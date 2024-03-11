import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type ProcessorPrimitives } from './Processor'
import { type ProcessorId } from './ProcessorId'
import { type ProcessorNumberModel } from './ProcessorNumberModel'

export abstract class ProcessorRepository {
  abstract searchAll (): Promise<ProcessorPrimitives[]>

  abstract save (payload: ProcessorPrimitives): Promise<void>

  abstract searchById (id: Primitives<ProcessorId>): Promise<ProcessorPrimitives | null>

  abstract searchByNumberModel (numberModel: Primitives<ProcessorNumberModel>): Promise<ProcessorPrimitives | null>

  abstract remove (id: Primitives<ProcessorId>): Promise<void>
}
