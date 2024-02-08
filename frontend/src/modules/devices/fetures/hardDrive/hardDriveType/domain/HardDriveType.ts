import { type HardDriveTypeId } from './HardDriveTypeId'
import { type HardDriveTypeName } from './HardDriveTypeName'

export interface HardDriveTypePrimitives {
  id: number
  name: string
}

export class HardDriveType {
  constructor (
    private readonly id: HardDriveTypeId,
    private readonly name: HardDriveTypeName
  ) {}

  idValue (): number {
    return this.id.value
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): HardDriveTypePrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
