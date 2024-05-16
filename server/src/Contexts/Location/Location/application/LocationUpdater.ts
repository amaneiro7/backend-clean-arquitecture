import { Repository } from "../../../Shared/domain/Repository"
import { Primitives } from "../../../Shared/domain/value-object/Primitives"


export class LocationUpdater {
  constructor (private readonly repository: Repository) {}

  async run ({id, params}: { id: Primitives<LocationId>, params: Partial<Omit<LocationPrimitives, 'id'>> }): Promise<void> {
    const locationId = new LocationId(id).value
    const location = await this.repository.Location.searchById(LocationId)
    if (location === null) {
      throw new LocationDoesNotExistError(id)
    }

    const LocationEntity = Location.fromPrimitives(Location)

    await LocationUserName.updateUserNameField({repository: this.repository.Location, userName: params.userName, entity: LocationEntity})

    await this.repository.Location.save(LocationEntity.toPrimitive())
    
  }
}
