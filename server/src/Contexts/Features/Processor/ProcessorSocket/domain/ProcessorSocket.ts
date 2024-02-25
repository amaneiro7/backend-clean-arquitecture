import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { ProcessorSocketId } from './ProcessorSocketId'
import { ProcessorSocketName } from './ProcessorSocketName'

export interface ProcessorSocketPrimitives {
  id: Primitives<ProcessorSocketId>
  name: Primitives<ProcessorSocketName>
}

export class ProcessorSocket {
  constructor (
    private readonly id: ProcessorSocketId,
    private readonly version: ProcessorSocketName
  ) {}

  static fromPrimitives (primitives: ProcessorSocketPrimitives): ProcessorSocket {
    return new ProcessorSocket(
      new ProcessorSocketId(primitives.id),
      new ProcessorSocketName(primitives.name)
    )
  }

  toPrimitive (): ProcessorSocketPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<ProcessorSocketId> {
    return this.id.value
  }

  get nameValue (): Primitives<ProcessorSocketName> {
    return this.version.value
  }
}
