import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { OperatingSystemArqId } from './OperatingSystemArqID'
import { OperatingSystemArqName } from './OperatingSystemArqName'

export interface OperatingSystemArqPrimitives {
  id: Primitives<OperatingSystemArqId>
  name: Primitives<OperatingSystemArqName>
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

  get idValue (): Primitives<OperatingSystemArqId> {
    return this.id.value
  }

  get nameValue (): Primitives<OperatingSystemArqName> {
    return this.name.value
  }
}
