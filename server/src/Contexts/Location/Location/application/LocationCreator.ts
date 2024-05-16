
import { Repository } from '../../../Shared/domain/Repository'
import { Location, LocationPrimitives } from '../domain/Location'
import { LocationName } from '../domain/LocationName'
import { LocationSite } from '../domain/LocationSite'
import { LocationTypeOfSite } from '../domain/LocationTypeOfSite'

export class LocationCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: Omit<LocationPrimitives, 'id'>): Promise<void> {    

    const location = Location.create(params)

    await LocationName.ensureNameDoesNotExit({repository: this.repository.location, name: params.name})
    await LocationTypeOfSite.ensureTypeOfSiteExit({ repository: this.repository.typeOfSite, typeOfSite: params.typeOfSiteId })
    await LocationSite.ensureSiteExit({ repository: this.repository.site, site: params.siteId })

    await this.repository.location.save(location.toPrimitive())
  }
  
}
