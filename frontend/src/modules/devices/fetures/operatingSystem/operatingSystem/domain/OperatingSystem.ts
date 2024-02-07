import { type ProcessorId } from './ProcessorId'
import { type ProcessorName } from './ProcessorName'

export interface ProcessorPrimitives {
  id: string
  name: string
}

export class Processor {
  constructor (
    private readonly id: ProcessorId,
    private readonly name: ProcessorName
  ) {}

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
