import { OperatingSystemArqId } from './OperatingSystemArqID'
import { OperatingSystemArqName } from './OperatingSystemArqName'

export interface OperatingSystemArqPrimitives {
  id: number
  name: string
}

export class OperatingSystemArq {
  constructor (
    private readonly id: OperatingSystemArqId,
    private readonly name: OperatingSystemArqName
  ) {}

  static fromPrimitives (primitives: OperatingSystemArqPrimitives): OperatingSystemArq {
    return new OperatingSystemArq(
      new OperatingSystemArqId(primitives.id),
      new OperatingSystemArqName(primitives.name)
    )
  }

  toPrimitive (): any {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): number {
    return this.id.value
  }

  get nameValue (): string {
    return this.name.value
  }
}
