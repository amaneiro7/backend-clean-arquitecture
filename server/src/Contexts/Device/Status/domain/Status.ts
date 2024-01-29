import { StatusId } from './StatusId'
import { StatusName } from './StatusName'

export interface StatusPrimitives {
  id: number
  name: string
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

  get idValue (): number {
    return this.id.value
  }

  get nameValue (): string {
    return this.name.value
  }
}
