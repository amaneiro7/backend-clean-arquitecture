import { HardDriveTypeId } from './HardDriveTypeId'
import { HardDriveTypeName } from './HardDriveTypeName'

export interface HardDriveTypePrimitives {
  id: number
  name: string
}

export class HardDriveType {
  constructor (
    private readonly id: HardDriveTypeId,
    private readonly name: HardDriveTypeName
  ) {}

  static fromPrimitives (primitives: HardDriveTypePrimitives): HardDriveType {
    return new HardDriveType(
      new HardDriveTypeId(primitives.id),
      new HardDriveTypeName(primitives.name)
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
