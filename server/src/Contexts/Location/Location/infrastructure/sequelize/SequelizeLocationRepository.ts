import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type LocationPrimitives } from '../../domain/Location'
import { type LocationId } from '../../domain/LocationId'
import { type LocationRepository } from '../../domain/LocationRepository'
import { LocationModel } from './LocationSchema'

export class SequelizeLocationRepository implements LocationRepository {
  async searchAll (): Promise<LocationPrimitives[]> {
    return await LocationModel.findAll()
  }

  async searchById (id: Primitives<LocationId>): Promise<LocationPrimitives | null> {
    return await LocationModel.findByPk(id) ?? null
  }
}
