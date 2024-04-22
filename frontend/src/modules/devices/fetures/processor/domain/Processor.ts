import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type ProcessorId } from './ProcessorId'
import { ProcessorName } from './ProcessorName'

export interface ProcessorPrimitives {
  id?: Primitives<ProcessorId>
  name: Primitives<ProcessorName>
  productCollection?: string
  numberModel?: string
  cores?: number
  threads?: boolean
  frequency?: string
}

export class Processor {
  constructor (
    private readonly name: ProcessorName
  ) {}

  public static create ({ name }: ProcessorPrimitives): Processor {
    return new Processor(
      new ProcessorName(name)
    )
  }

  nameValue (): Primitives<ProcessorName> {
    return this.name.value
  }

  toPrimitives (): ProcessorPrimitives {
    return {
      name: this.nameValue()
    }
  }
}
