import { type OperatingSystemArqId } from './OperatingSystemArqId'
import { type OperatingSystemArqName } from './OperatingSystemArqName'

export interface OperatingSystemArqPrimitives {
  id: number
  name: string
}

export class OperatingSystemArq {
  constructor (
    private readonly id: OperatingSystemArqId,
    private readonly name: OperatingSystemArqName
  ) {}

  idValue (): number {
    return this.id.value
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): OperatingSystemArqPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
