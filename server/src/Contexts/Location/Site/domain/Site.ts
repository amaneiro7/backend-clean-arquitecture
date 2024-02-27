import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { CityId } from '../../City/domain/CityId'
import { SiteAddress } from './SiteAddress'
import { SiteId } from './SiteId'
import { SiteName } from './SiteName'

export interface SitePrimitives {
  id: Primitives<SiteId>
  cityId: Primitives<CityId>
  address: Primitives<SiteAddress>
  name: Primitives<SiteName>
}

export class Site {
  constructor (
    private readonly id: SiteId,
    private readonly cityId: CityId,
    private readonly address: SiteAddress,
    private readonly name: SiteName
  ) {}

  static fromPrimitives (primitives: SitePrimitives): Site {
    return new Site(
      new SiteId(primitives.id),
      new CityId(primitives.cityId),
      new SiteAddress(primitives.address),
      new SiteName(primitives.name)
    )
  }

  toPrimitive (): SitePrimitives {
    return {
      id: this.idValue,
      cityId: this.cityIdValue,
      address: this.addressValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<SiteId> {
    return this.id.value
  }

  get nameValue (): Primitives<SiteName> {
    return this.name.value
  }

  get addressValue (): Primitives<SiteAddress> {
    return this.address.value
  }

  get cityIdValue (): Primitives<CityId> {
    return this.cityId.value
  }
}
