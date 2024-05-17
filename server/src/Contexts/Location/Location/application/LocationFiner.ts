import { Repository } from "../../../Shared/domain/Repository"
import { Primitives } from "../../../Shared/domain/value-object/Primitives"
import { LocationPrimitives } from "../domain/Location"
import { LocationDoesNotExistError } from "../domain/LocationDoesNotExistError"
import { LocationId } from "../domain/LocationId"

export class LocationFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (id: Primitives<LocationId>): Promise<LocationPrimitives> {
    const locationId = new LocationId(id).value
    const location = await this.repository.location.searchById(locationId)

    if (location === null) {
      throw new LocationDoesNotExistError(locationId)
    }

    return location
  }
}
