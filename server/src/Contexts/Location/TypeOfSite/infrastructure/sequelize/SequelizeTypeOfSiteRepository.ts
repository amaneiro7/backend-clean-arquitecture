import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type TypeOfSitePrimitives } from '../../domain/TypeOfSite'
import { type TypeOfSiteId } from '../../domain/TypeOfSiteId'
import { TypeOfSiteRepository } from '../../domain/TypeOfSiteRepository'
import { TypeOfSiteModel } from './TypeOfSiteSchema'

export class SequelizeTypeOfSiteRepository extends TypeOfSiteRepository {
  async searchAll (): Promise<TypeOfSitePrimitives[]> {
    return await TypeOfSiteModel.findAll()
  }

  async searchById (id: Primitives<TypeOfSiteId>): Promise<TypeOfSitePrimitives | null> {
    return await TypeOfSiteModel.findByPk(id) ?? null
  }
}
