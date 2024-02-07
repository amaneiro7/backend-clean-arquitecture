import { ProcessorId } from './ProcessorId'
import { ProcessorName } from './ProcessorName'

export interface ProcessorPrimitives {
  id: string
  name: string
}

export class Processor {
  constructor (
    private readonly id: ProcessorId,
    private readonly name: ProcessorName
  ) {}

  public static create ({ id, name }: ProcessorPrimitives): Processor {
    return new Processor(
      new ProcessorId(id),
      new ProcessorName(name)
    )
  }

  idValue (): string {
    return this.id.value
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): ProcessorPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
