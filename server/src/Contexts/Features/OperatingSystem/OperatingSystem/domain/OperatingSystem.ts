import { OperatingSystemId } from './OperatingSystemId'
import { OperatingSystemVersion } from './OperatingSystemVersion'

export interface OperatingSystemPrimitives {
  id: number
  version: string
}

export class OperatingSystem {
  constructor (
    private readonly id: OperatingSystemId,
    private readonly version: OperatingSystemVersion
  ) {}

  static fromPrimitives (primitives: OperatingSystemPrimitives): OperatingSystem {
    return new OperatingSystem(
      new OperatingSystemId(primitives.id),
      new OperatingSystemVersion(primitives.version)
    )
  }

  toPrimitive (): any {
    return {
      id: this.id.value,
      version: this.version.value
    }
  }

  get idValue (): number {
    return this.id.value
  }

  get versionValue (): string {
    return this.version.value
  }
}
