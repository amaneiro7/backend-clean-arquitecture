import { ComputerProcessorId } from './ComputerProcessorId'
import { ComputerProcessorName } from './ComputerProcessorName'

export interface ComputerProcessorPrimitives {
  id: string
  name: string
}

export class ComputerProcessor {
  constructor (
    private readonly id: ComputerProcessorId,
    private name: ComputerProcessorName
  ) {}

  static create ({ name }: { name: string }): ComputerProcessor {
    const id = ComputerProcessorId.random().toString()
    return new ComputerProcessor(
      new ComputerProcessorId(id),
      new ComputerProcessorName(name)
    )
  }

  updateName (newName: string): void {
    this.name = new ComputerProcessorName(newName)
  }

  static fromPrimitives (primitives: ComputerProcessorPrimitives): ComputerProcessor {
    return new ComputerProcessor(
      new ComputerProcessorId(primitives.id),
      new ComputerProcessorName(primitives.name)
    )
  }

  toPrimitive (): ComputerProcessorPrimitives {
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
