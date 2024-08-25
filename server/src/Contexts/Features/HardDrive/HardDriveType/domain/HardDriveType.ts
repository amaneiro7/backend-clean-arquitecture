import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { HardDriveTypeId } from './HardDriveTypeId'
import { HardDriveTypeName } from './HardDriveTypeName'

export interface HardDriveTypePrimitives {
  id: Primitives<HardDriveTypeId>
  name: Primitives<HardDriveTypeName>
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

  toPrimitive (): HardDriveTypePrimitives {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): Primitives<HardDriveTypeId> {
    return this.id.value
  }

  get nameValue (): Primitives<HardDriveTypeName> {
    return this.name.value
  }
}
