import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CityPrimitives } from '../../domain/City'
import { type CityId } from '../../domain/CityId'
import { CityRepository } from '../../domain/CityRepository'
import { CityModel } from './CitySchema'

export class SequelizeCityRepository extends CityRepository {
  async searchAll (): Promise<CityPrimitives[]> {
    return await CityModel.findAll()
  }

  async searchById (id: Primitives<CityId>): Promise<CityPrimitives | null> {
    return await CityModel.findByPk(id) ?? null
  }
}
