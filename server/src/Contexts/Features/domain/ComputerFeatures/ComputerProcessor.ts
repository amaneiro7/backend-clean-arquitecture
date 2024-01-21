import { ComputerProcessorId } from './ComputerProcessorId'
import { ComputerProcessorName } from './ComputerProcessorName'

export interface ComputerProcessorPrimitives {
  id: string
  name: string
}

export class ComputerProcessor {
  constructor (
    private readonly _id: ComputerProcessorId,
    private _name: ComputerProcessorName
  ) {}

  static create ({ name }: { name: string }): ComputerProcessor {
    const id = ComputerProcessorId.random().toString()
    return new ComputerProcessor(
      new ComputerProcessorId(id),
      new ComputerProcessorName(name)
    )
  }

  updateName (newName: string): void {
    this._name = new ComputerProcessorName(newName)
  }

  static fromPrimitives (primitives: ComputerProcessorPrimitives): ComputerProcessor {
    return new ComputerProcessor(
      new ComputerProcessorId(primitives.id),
      new ComputerProcessorName(primitives.name)
    )
  }

  toPrimitive (): ComputerProcessorPrimitives {
    return {
      id: this._id.value,
      name: this._name.value
    }
  }

  get id (): string {
    return this._id.value
  }

  get name (): string {
    return this._name.value
  }
}
