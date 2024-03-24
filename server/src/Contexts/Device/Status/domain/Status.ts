import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StatusId } from './StatusId'
import { StatusName } from './StatusName'

export interface StatusPrimitives {
  id: Primitives<StatusId>
  name: Primitives<StatusName>
}

export class Status {
  constructor (
    private readonly id: StatusId,
    private readonly name: StatusName
  ) {}

  static fromPrimitives (primitives: StatusPrimitives): Status {
    return new Status(
      new StatusId(primitives.id),
      new StatusName(primitives.name)
    )
  }

  toPrimitive (): any {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): Primitives<StatusId> {
    return this.id.value
  }

  get nameValue (): Primitives<StatusName> {
    return this.name.value
  }
}
