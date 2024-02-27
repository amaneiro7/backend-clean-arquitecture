import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { SiteId } from '../../Site/domain/SiteId'
import { TypeOfSiteId } from '../../TypeOfSite/domain/TypeOfSiteId'
import { LocationId } from './LocationId'
import { LocationName } from './LocationName'
import { LocationSubnet } from './LocationSubnet'

export interface LocationPrimitives {
  id: Primitives<LocationId>
  typeOfSiteId: Primitives<TypeOfSiteId>
  siteId: Primitives<SiteId>
  name: Primitives<LocationName>
  subnet: Primitives<LocationSubnet>
}

export class Location {
  constructor (
    private readonly id: LocationId,
    private readonly typeOfSiteId: TypeOfSiteId,
    private readonly siteId: SiteId,
    private readonly name: LocationName,
    private readonly subnet: LocationSubnet
  ) {}

  static fromPrimitives (primitives: LocationPrimitives): Location {
    return new Location(
      new LocationId(primitives.id),
      new TypeOfSiteId(primitives.typeOfSiteId),
      new SiteId(primitives.siteId),
      new LocationName(primitives.name),
      new LocationSubnet(primitives.subnet)
    )
  }

  toPrimitive (): LocationPrimitives {
    return {
      id: this.idValue,
      typeOfSiteId: this.typeOfSiteValue,
      siteId: this.siteValue,
      name: this.nameValue,
      subnet: this.subnetValue
    }
  }

  get idValue (): Primitives<LocationId> {
    return this.id.value
  }

  get typeOfSiteValue (): Primitives<TypeOfSiteId> {
    return this.typeOfSiteId.value
  }

  get siteValue (): Primitives<SiteId> {
    return this.siteId.value
  }

  get nameValue (): Primitives<LocationName> {
    return this.name.value
  }

  get subnetValue (): Primitives<LocationSubnet> {
    return this.subnet.value
  }
}
