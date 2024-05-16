import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { SiteId } from '../../Site/domain/SiteId'
import { TypeOfSiteId } from '../../TypeOfSite/domain/TypeOfSiteId'
import { LocationId } from './LocationId'
import { LocationName } from './LocationName'
import { LocationSite } from './LocationSite'
import { LocationSubnet } from './LocationSubnet'
import { LocationTypeOfSite } from './LocationTypeOfSite'

export interface LocationPrimitives {
  id: Primitives<LocationId>
  typeOfSiteId: Primitives<LocationTypeOfSite>
  siteId: Primitives<LocationSite>
  name: Primitives<LocationName>
  subnet: Primitives<LocationSubnet>
}

export class Location {
  constructor(
    private readonly id: LocationId,
    private typeOfSiteId: TypeOfSiteId,
    private siteId: SiteId,
    private name: LocationName,
    private subnet: LocationSubnet
  ) { }

  static create (params: Omit<LocationPrimitives, 'id'>): Location {
    const id = LocationId.random().value
    return new Location(
      new LocationId(id),
      new LocationTypeOfSite(params.typeOfSiteId),
      new LocationSite(params.siteId),
      new LocationName(params.name),
      new LocationSubnet(params.subnet)
    )
  }

  static fromPrimitives(primitives: LocationPrimitives): Location {
    return new Location(
      new LocationId(primitives.id),
      new LocationTypeOfSite(primitives.typeOfSiteId),
      new SiteId(primitives.siteId),
      new LocationName(primitives.name),
      new LocationSubnet(primitives.subnet)
    )
  }

  toPrimitive(): LocationPrimitives {
    return {
      id: this.idValue,
      typeOfSiteId: this.typeOfSiteValue,
      siteId: this.siteValue,
      name: this.nameValue,
      subnet: this.subnetValue
    }
  }

  get idValue(): Primitives<LocationId> {
    return this.id.value
  }

  get typeOfSiteValue(): Primitives<LocationTypeOfSite> {
    return this.typeOfSiteId.value
  }

  get siteValue(): Primitives<SiteId> {
    return this.siteId.value
  }

  get nameValue(): Primitives<LocationName> {
    return this.name.value
  }

  get subnetValue(): Primitives<LocationSubnet> {
    return this.subnet.value
  }

  updateSubnet(subnet: Primitives<LocationSubnet>): void {
    this.subnet = new LocationSubnet(subnet)
  }
  updateTypeOfSite(typeOfSite: Primitives<LocationTypeOfSite>): void {
    this.typeOfSiteId = new LocationTypeOfSite(typeOfSite)
  }
  updateSite(site: Primitives<SiteId>): void {
    this.siteId = new SiteId(site)
  }
  updateLocationName(name: Primitives<LocationName>): void {
    this.name = new LocationName(name)
  }
}
