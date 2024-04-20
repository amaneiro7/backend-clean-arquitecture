import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { OperatingSystemId } from './OperatingSystemId'
import { OperatingSystemVersion } from './OperatingSystemVersion'

export interface OperatingSystemPrimitives {
  id: Primitives<OperatingSystemId>
  name: Primitives<OperatingSystemVersion>
}

export class OperatingSystem {
  constructor (
    private readonly id: OperatingSystemId,
    private readonly name: OperatingSystemVersion
  ) {}

  static fromPrimitives (primitives: OperatingSystemPrimitives): OperatingSystem {
    return new OperatingSystem(
      new OperatingSystemId(primitives.id),
      new OperatingSystemVersion(primitives.name)
    )
  }

  toPrimitive (): OperatingSystemPrimitives {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): Primitives<OperatingSystemId> {
    return this.id.value
  }

  get versionValue (): Primitives<OperatingSystemVersion> {
    return this.name.value
  }
}
