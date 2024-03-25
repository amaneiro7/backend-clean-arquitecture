import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type LocationId } from './locationId'

export interface LocationPrimitives {
  id: Primitives<LocationId>
  name: string
  typeOfSiteId: number
  siteId: number
  subnet: string | null
}

export class Location {
  constructor (
    private readonly id: LocationId,
    private readonly name: string,
    private readonly typeOfSiteId: number,
    private readonly siteId: number,
    private readonly subnet: string | null
  ) {}

  idValue (): Primitives<LocationId> {
    return this.id.value
  }

  nameValue (): string {
    return this.name
  }

  typeOfSiteValue (): number {
    return this.typeOfSiteId
  }

  siteValue (): number {
    return this.siteId
  }

  subnetValue (): string | null {
    return this.subnet
  }

  toPrimitives (): LocationPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue(),
      typeOfSiteId: this.typeOfSiteValue(),
      siteId: this.siteValue(),
      subnet: this.subnetValue()
    }
  }
}
