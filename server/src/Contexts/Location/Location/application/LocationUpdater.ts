import { Repository } from "../../../Shared/domain/Repository"
import { Primitives } from "../../../Shared/domain/value-object/Primitives"
import { Location, LocationPrimitives } from "../domain/Location"
import { LocationDoesNotExistError } from "../domain/LocationDoesNotExistError"
import { LocationId } from "../domain/LocationId"
import { LocationName } from "../domain/LocationName"
import { LocationSite } from "../domain/LocationSite"
import { LocationSubnet } from "../domain/LocationSubnet"
import { LocationTypeOfSite } from "../domain/LocationTypeOfSite"


export class LocationUpdater {
  constructor(private readonly repository: Repository) { }

  async run({ id, params }: { id: Primitives<LocationId>, params: Partial<Omit<LocationPrimitives, 'id'>> }): Promise<void> {
    const locationId = new LocationId(id).value
    const location = await this.repository.location.searchById(locationId)
    if (location === null) {
      throw new LocationDoesNotExistError(id)
    }

    const locationEntity = Location.fromPrimitives(location)

    await LocationName.updateNameField({ repository: this.repository.location, name: params.name, entity: locationEntity })
    await LocationSite.updateSiteField({ repository: this.repository.site, entity: locationEntity, site: params.siteId })
    await LocationTypeOfSite.updateTypeOfSiteField({ repository: this.repository.typeOfSite, entity: locationEntity, typeOfSite: params.typeOfSiteId  })
    await LocationSubnet.updateSubnetField({ subnet: params.subnet, entity: locationEntity })

    await this.repository.location.save(locationEntity.toPrimitive())

  }
}
