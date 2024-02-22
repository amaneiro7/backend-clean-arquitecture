import { ProcessorId } from './ProcessorId'
import { ProcessorName } from './ProcessorName'

export interface ProcessorPrimitives {
  id: string
  name: string
}

export class Processor {
  constructor (
    private readonly id: ProcessorId,
    private name: ProcessorName
  ) {}

  static create ({ name }: { name: string }): Processor {
    const id = ProcessorId.random().toString()
    return new Processor(
      new ProcessorId(id),
      new ProcessorName(name)
    )
  }

  updateName (newName: string): void {
    this.name = new ProcessorName(newName)
  }

  static fromPrimitives (primitives: ProcessorPrimitives): Processor {
    return new Processor(
      new ProcessorId(primitives.id),
      new ProcessorName(primitives.name)
    )
  }

  toPrimitive (): ProcessorPrimitives {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): string {
    return this.id.value
  }

  get nameValue (): string {
    return this.name.value
  }
}
