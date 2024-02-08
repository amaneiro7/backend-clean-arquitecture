import { type OperatingSystemId } from './OperatingSystemId'
import { type OperatingSystemName } from './OperatingSystemName'

export interface OperatingSystemPrimitives {
  id: number
  name: string
}

export class OperatingSystem {
  constructor (
    private readonly id: OperatingSystemId,
    private readonly name: OperatingSystemName
  ) {}

  idValue (): number {
    return this.id.value
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): OperatingSystemPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
