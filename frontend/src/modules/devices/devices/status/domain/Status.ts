import { type StatusId } from './StatusId'
import { type StatusName } from './StatusName'

export interface StatusPrimitives {
  id: number
  name: string
}
export class Status {
  constructor (
    private readonly id: StatusId,
    private readonly name: StatusName
  ) {}

  idValue (): number {
    return this.id.value
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): StatusPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
