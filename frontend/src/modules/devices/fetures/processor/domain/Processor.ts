import { ProcessorName } from './ProcessorName'

export interface ProcessorPrimitives {
  id?: string
  name: string
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

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): ProcessorPrimitives {
    return {
      name: this.nameValue()
    }
  }
}
